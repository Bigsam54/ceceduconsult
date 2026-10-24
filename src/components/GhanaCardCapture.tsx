import React, { useEffect, useRef, useState } from 'react';
import {
  Camera,
  Upload,
  X,
  RotateCcw,
  Check,
  CheckCircle2,
  Loader2,
  AlertCircle,
  FileText,
  Trash2,
  ShieldCheck,
  Sun,
  ScanLine,
  IdCard
} from 'lucide-react';
import { uploadToCloudinary, CLOUDINARY_FOLDERS } from '../lib/cloudinary';

export type CardSideKey = 'front' | 'back';

export interface CardSideState {
  id: string;
  previewUrl: string; // object URL for images, empty for PDFs
  fileName: string;
  isPdf: boolean;
  status: 'uploading' | 'done' | 'error';
  url?: string;
  error?: string;
}

export type GhanaCardState = Record<CardSideKey, CardSideState | null>;

export const emptyGhanaCard: GhanaCardState = { front: null, back: null };

export const isGhanaCardComplete = (card: GhanaCardState) =>
  card.front?.status === 'done' && card.back?.status === 'done';

// ID-1 card format (85.6mm x 54mm) used by the Ghana Card
const CARD_ASPECT = 85.6 / 54;
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_IMAGE_DIMENSION = 2400;

const SIDE_COPY: Record<CardSideKey, { title: string; hint: string; cameraLabel: string }> = {
  front: {
    title: 'Front of Card',
    hint: 'Side with your photo, name and Ghana Card number',
    cameraLabel: 'FRONT of your Ghana Card'
  },
  back: {
    title: 'Back of Card',
    hint: 'Side with the barcode and machine-readable lines',
    cameraLabel: 'BACK of your Ghana Card'
  }
};

// Large phone photos are downscaled to keep uploads quick; anything the browser can't decode is sent as-is
const prepareImage = (file: File): Promise<Blob> =>
  new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(img.naturalWidth, img.naturalHeight));
      if (scale === 1 && file.size <= 3 * 1024 * 1024) {
        resolve(file);
        return;
      }
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);
      canvas.getContext('2d')?.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => resolve(blob ?? file), 'image/jpeg', 0.92);
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file);
    };
    img.src = objectUrl;
  });

const FrameCorners: React.FC<{ className?: string }> = ({ className = 'border-[#2ac0db]' }) => (
  <>
    <span className={`absolute -top-px -left-px w-6 h-6 border-t-[3px] border-l-[3px] rounded-tl-xl ${className}`} />
    <span className={`absolute -top-px -right-px w-6 h-6 border-t-[3px] border-r-[3px] rounded-tr-xl ${className}`} />
    <span className={`absolute -bottom-px -left-px w-6 h-6 border-b-[3px] border-l-[3px] rounded-bl-xl ${className}`} />
    <span className={`absolute -bottom-px -right-px w-6 h-6 border-b-[3px] border-r-[3px] rounded-br-xl ${className}`} />
  </>
);

// Faint card silhouettes so teachers know which side goes where
const CardSilhouette: React.FC<{ side: CardSideKey }> = ({ side }) =>
  side === 'front' ? (
    <div className="absolute inset-0 p-[7%] flex gap-[6%] opacity-40">
      <div className="w-[28%] h-full rounded-lg bg-slate-300" />
      <div className="flex-1 flex flex-col justify-center gap-[9%]">
        <div className="h-[9%] w-[70%] rounded bg-slate-300" />
        <div className="h-[9%] w-[90%] rounded bg-slate-300" />
        <div className="h-[9%] w-[55%] rounded bg-slate-300" />
        <div className="h-[9%] w-[80%] rounded bg-slate-300" />
      </div>
    </div>
  ) : (
    <div className="absolute inset-0 p-[7%] flex flex-col justify-between opacity-40">
      <div className="flex gap-[3px] h-[32%] items-stretch">
        {Array.from({ length: 22 }).map((_, i) => (
          <div key={i} className="bg-slate-300 rounded-[1px]" style={{ width: i % 3 === 0 ? 4 : 2 }} />
        ))}
      </div>
      <div className="space-y-[5%]">
        <div className="h-[8%] min-h-[5px] w-full rounded bg-slate-300" />
        <div className="h-[8%] min-h-[5px] w-full rounded bg-slate-300" />
        <div className="h-[8%] min-h-[5px] w-[85%] rounded bg-slate-300" />
      </div>
    </div>
  );

interface CameraCaptureModalProps {
  side: CardSideKey;
  onClose: () => void;
  onCapture: (blob: Blob) => void;
  onUseFallback: () => void;
}

const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({ side, onClose, onCapture, onUseFallback }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [captured, setCaptured] = useState<{ blob: Blob; url: string } | null>(null);

  useEffect(() => {
    let cancelled = false;

    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false
      })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => undefined);
        }
      })
      .catch((err: DOMException) => {
        if (cancelled) return;
        setCameraError(
          err?.name === 'NotAllowedError'
            ? 'Camera access was blocked. Allow camera access in your browser settings, or take the photo with your phone camera instead.'
            : 'We could not open your camera on this device. You can take the photo with your phone camera instead.'
        );
      });

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => () => {
    if (captured) URL.revokeObjectURL(captured.url);
  }, [captured]);

  const handleCapture = () => {
    const video = videoRef.current;
    const stage = stageRef.current;
    const frame = frameRef.current;
    if (!video || !stage || !frame || !video.videoWidth) return;

    // Map the on-screen frame back onto the (object-cover scaled) video pixels
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    const stageBox = stage.getBoundingClientRect();
    const frameBox = frame.getBoundingClientRect();
    const scale = Math.max(stageBox.width / vw, stageBox.height / vh);
    const offsetX = (stageBox.width - vw * scale) / 2;
    const offsetY = (stageBox.height - vh * scale) / 2;

    // Keep a small margin around the frame so card edges are never clipped
    const margin = 0.03;
    let sx = (frameBox.left - stageBox.left - offsetX) / scale - (frameBox.width / scale) * margin;
    let sy = (frameBox.top - stageBox.top - offsetY) / scale - (frameBox.height / scale) * margin;
    let sw = (frameBox.width / scale) * (1 + margin * 2);
    let sh = (frameBox.height / scale) * (1 + margin * 2);
    sx = Math.max(0, sx);
    sy = Math.max(0, sy);
    sw = Math.min(vw - sx, sw);
    sh = Math.min(vh - sy, sh);

    const canvas = document.createElement('canvas');
    canvas.width = Math.round(sw);
    canvas.height = Math.round(sh);
    canvas.getContext('2d')?.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(
      (blob) => {
        if (blob) setCaptured({ blob, url: URL.createObjectURL(blob) });
      },
      'image/jpeg',
      0.92
    );
  };

  const copy = SIDE_COPY[side];

  return (
    <div className="fixed inset-0 z-[70] bg-slate-950 flex flex-col animate-in fade-in duration-200" role="dialog" aria-modal="true">
      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-950/90 border-b border-white/10">
        <div className="flex items-center gap-2.5 text-white">
          <div className="w-9 h-9 rounded-xl bg-[#2ac0db]/15 text-[#2ac0db] flex items-center justify-center">
            <IdCard className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#2ac0db]">
              Ghana Card · Step {side === 'front' ? '1' : '2'} of 2
            </p>
            <p className="text-sm font-heading font-bold">{copy.title}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close camera"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Camera stage */}
      <div ref={stageRef} className="relative flex-1 overflow-hidden">
        {!cameraError && (
          <video
            ref={videoRef}
            playsInline
            muted
            autoPlay
            onLoadedMetadata={() => setReady(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${captured ? 'opacity-0' : 'opacity-100'}`}
          />
        )}

        {cameraError ? (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="max-w-sm text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#fa7b2d]/15 text-[#fa7b2d] flex items-center justify-center mx-auto">
                <AlertCircle className="w-7 h-7" />
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">{cameraError}</p>
              <button
                type="button"
                onClick={onUseFallback}
                className="px-5 py-3 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold rounded-xl text-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>Use Phone Camera</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-5 gap-5">
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white text-[11px] sm:text-xs font-bold tracking-wide">
              Place the {copy.cameraLabel} inside the frame
            </span>

            {/* Card-shaped window; the huge shadow darkens everything outside it */}
            <div
              ref={frameRef}
              className="relative w-full max-w-[560px] rounded-2xl border-2 border-white/70 shadow-[0_0_0_9999px_rgba(2,6,23,0.72)]"
              style={{ aspectRatio: CARD_ASPECT }}
            >
              <FrameCorners className="border-[#2ac0db]" />
              {captured ? (
                <img src={captured.url} alt={`Captured ${copy.title}`} className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
              ) : (
                ready && (
                  <div className="absolute inset-x-3 top-0 h-full overflow-hidden rounded-2xl pointer-events-none">
                    <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#2ac0db] to-transparent animate-[cardscan_2.4s_ease-in-out_infinite]" />
                  </div>
                )
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-slate-300 font-medium">
              <span className="flex items-center gap-1.5"><Sun className="w-3.5 h-3.5 text-[#fa7b2d]" /> Good lighting, no glare</span>
              <span className="flex items-center gap-1.5"><ScanLine className="w-3.5 h-3.5 text-[#2ac0db]" /> All four corners visible</span>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      {!cameraError && (
        <div className="relative z-10 px-6 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] bg-slate-950/90 border-t border-white/10">
          {captured ? (
            <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
              <button
                type="button"
                onClick={() => setCaptured(null)}
                className="flex-1 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake</span>
              </button>
              <button
                type="button"
                onClick={() => onCapture(captured.blob)}
                className="flex-1 py-3.5 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-extrabold rounded-2xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#2ac0db]/30"
              >
                <Check className="w-4 h-4" />
                <span>Use This Photo</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={handleCapture}
                disabled={!ready}
                className="w-[72px] h-[72px] rounded-full bg-white ring-4 ring-white/30 ring-offset-4 ring-offset-slate-950 disabled:opacity-40 hover:scale-105 active:scale-95 transition-transform cursor-pointer flex items-center justify-center"
                aria-label="Capture photo"
              >
                <span className="w-14 h-14 rounded-full border-2 border-slate-900/15" />
              </button>
              <span className="text-[11px] text-slate-400 font-medium">{ready ? 'Tap to capture' : 'Starting camera...'}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface GhanaCardCaptureProps {
  value: GhanaCardState;
  onChange: React.Dispatch<React.SetStateAction<GhanaCardState>>;
}

export const GhanaCardCapture: React.FC<GhanaCardCaptureProps> = ({ value, onChange }) => {
  const [cameraSide, setCameraSide] = useState<CardSideKey | null>(null);
  const [fileError, setFileError] = useState<Partial<Record<CardSideKey, string>>>({});
  const uploadInputs = useRef<Partial<Record<CardSideKey, HTMLInputElement | null>>>({});
  const phoneCameraInputs = useRef<Partial<Record<CardSideKey, HTMLInputElement | null>>>({});
  const lastFiles = useRef<Partial<Record<CardSideKey, { blob: Blob; fileName: string; isPdf: boolean }>>>({});

  const startUpload = async (side: CardSideKey, blob: Blob, fileName: string, isPdf: boolean) => {
    const id = `${side}-${Date.now()}`;
    const previous = value[side];
    if (previous?.previewUrl) URL.revokeObjectURL(previous.previewUrl);

    lastFiles.current[side] = { blob, fileName, isPdf };
    setFileError((prev) => ({ ...prev, [side]: undefined }));
    onChange((prev) => ({
      ...prev,
      [side]: { id, previewUrl: isPdf ? '' : URL.createObjectURL(blob), fileName, isPdf, status: 'uploading' }
    }));

    // Only apply the result if this side hasn't been replaced in the meantime
    const settle = (patch: Partial<CardSideState>) =>
      onChange((prev) => (prev[side]?.id === id ? { ...prev, [side]: { ...prev[side]!, ...patch } } : prev));

    try {
      const url = await uploadToCloudinary(blob, { folder: CLOUDINARY_FOLDERS.ghanaCards, fileName });
      settle({ status: 'done', url });
    } catch (err) {
      settle({ status: 'error', error: err instanceof Error ? err.message : 'Upload failed. Please try again.' });
    }
  };

  const handleFile = async (side: CardSideKey, file: File | undefined) => {
    if (!file) return;
    const isPdf = file.type === 'application/pdf';
    if (!isPdf && !file.type.startsWith('image/')) {
      setFileError((prev) => ({ ...prev, [side]: 'Please choose a photo (JPG, PNG) or a PDF file.' }));
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setFileError((prev) => ({ ...prev, [side]: 'This file is larger than 10MB. Please choose a smaller one.' }));
      return;
    }
    const blob = isPdf ? file : await prepareImage(file);
    const baseName = file.name.replace(/\.[^.]+$/, '') || 'ghana-card';
    startUpload(side, blob, isPdf ? file.name : `${baseName}.jpg`, isPdf);
  };

  const openCamera = (side: CardSideKey) => {
    if (navigator.mediaDevices?.getUserMedia) {
      setCameraSide(side);
    } else {
      phoneCameraInputs.current[side]?.click();
    }
  };

  const removeSide = (side: CardSideKey) => {
    const current = value[side];
    if (current?.previewUrl) URL.revokeObjectURL(current.previewUrl);
    delete lastFiles.current[side];
    onChange((prev) => ({ ...prev, [side]: null }));
  };

  const retryUpload = (side: CardSideKey) => {
    const last = lastFiles.current[side];
    if (last) startUpload(side, last.blob, last.fileName, last.isPdf);
  };

  const completedCount = (['front', 'back'] as CardSideKey[]).filter((s) => value[s]?.status === 'done').length;

  return (
    <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-5 py-4 border-b border-slate-200/80 flex items-start sm:items-center justify-between gap-3 bg-white">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#126373] to-[#2ac0db] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#2ac0db]/25">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="font-heading font-bold text-slate-900 text-sm">Ghana Card Verification *</p>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Capture the front and back of your Ghana Card. Make sure every detail is clear and readable.
            </p>
          </div>
        </div>
        <span
          className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
            completedCount === 2
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-[#fa7b2d]/10 text-[#b45309] border-[#fa7b2d]/25'
          }`}
        >
          {completedCount}/2 Done
        </span>
      </div>

      {/* Sides */}
      <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(['front', 'back'] as CardSideKey[]).map((side) => {
          const state = value[side];
          const copy = SIDE_COPY[side];
          const error = fileError[side];

          return (
            <div key={side} className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-extrabold flex items-center justify-center">
                      {side === 'front' ? '1' : '2'}
                    </span>
                    {copy.title}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{copy.hint}</p>
                </div>
                {state && state.status !== 'uploading' && (
                  <button
                    type="button"
                    onClick={() => removeSide(side)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    aria-label={`Remove ${copy.title}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Card frame */}
              <div
                className={`relative w-full rounded-2xl overflow-hidden ${
                  state
                    ? 'bg-slate-900 shadow-md'
                    : 'bg-white border-2 border-dashed border-slate-300'
                }`}
                style={{ aspectRatio: CARD_ASPECT }}
              >
                {!state && (
                  <button
                    type="button"
                    onClick={() => openCamera(side)}
                    className="absolute inset-0 group cursor-pointer"
                    aria-label={`Take photo of ${copy.title}`}
                  >
                    <CardSilhouette side={side} />
                    <div className="absolute inset-2.5">
                      <FrameCorners className="border-[#2ac0db]/70 group-hover:border-[#2ac0db] transition-colors" />
                    </div>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-white/95 border border-slate-200 shadow-sm text-[11px] font-bold text-[#126373] flex items-center gap-1.5 group-hover:scale-105 transition-transform">
                        <Camera className="w-3.5 h-3.5" /> Tap to capture
                      </span>
                    </span>
                  </button>
                )}

                {state && !state.isPdf && (
                  <img src={state.previewUrl} alt={copy.title} className="absolute inset-0 w-full h-full object-cover" />
                )}

                {state?.isPdf && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
                    <FileText className="w-9 h-9 text-[#2ac0db]" />
                    <p className="text-[11px] font-semibold text-slate-200 text-center break-all line-clamp-2">{state.fileName}</p>
                  </div>
                )}

                {state?.status === 'uploading' && (
                  <div className="absolute inset-0 bg-slate-950/55 backdrop-blur-[1px] flex flex-col items-center justify-center gap-2 text-white">
                    <Loader2 className="w-7 h-7 animate-spin text-[#2ac0db]" />
                    <span className="text-[11px] font-bold">Uploading securely...</span>
                  </div>
                )}

                {state?.status === 'done' && (
                  <span className="absolute top-2.5 right-2.5 px-2 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold flex items-center gap-1 shadow-md">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded
                  </span>
                )}

                {state?.status === 'error' && (
                  <div className="absolute inset-0 bg-slate-950/75 flex flex-col items-center justify-center gap-2 p-4 text-center">
                    <AlertCircle className="w-6 h-6 text-rose-400" />
                    <p className="text-[11px] text-slate-100 font-medium leading-snug">{state.error}</p>
                    <button
                      type="button"
                      onClick={() => retryUpload(side)}
                      className="px-3 py-1.5 bg-white text-slate-900 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" /> Try Again
                    </button>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => openCamera(side)}
                  disabled={state?.status === 'uploading'}
                  className="py-2.5 bg-[#126373] hover:bg-[#0e4f5c] disabled:opacity-50 text-white font-bold rounded-xl text-[11px] flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{state ? 'Retake' : 'Take Photo'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => uploadInputs.current[side]?.click()}
                  disabled={state?.status === 'uploading'}
                  className="py-2.5 bg-white hover:bg-slate-50 disabled:opacity-50 text-slate-800 font-bold rounded-xl text-[11px] border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{state ? 'Replace' : 'Upload File'}</span>
                </button>
              </div>

              {error && <p className="text-[11px] font-semibold text-rose-600">{error}</p>}

              <input
                ref={(el) => { uploadInputs.current[side] = el; }}
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={(e) => {
                  handleFile(side, e.target.files?.[0]);
                  e.target.value = '';
                }}
              />
              <input
                ref={(el) => { phoneCameraInputs.current[side] = el; }}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => {
                  handleFile(side, e.target.files?.[0]);
                  e.target.value = '';
                }}
              />
            </div>
          );
        })}
      </div>

      <p className="px-4 sm:px-5 pb-4 text-[10px] text-slate-400 flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-[#126373] shrink-0" />
        Your Ghana Card is used only for identity verification by the CEC team and is never shown to schools.
      </p>

      {cameraSide && (
        <CameraCaptureModal
          side={cameraSide}
          onClose={() => setCameraSide(null)}
          onCapture={(blob) => {
            const side = cameraSide;
            setCameraSide(null);
            startUpload(side, blob, `ghana-card-${side}.jpg`, false);
          }}
          onUseFallback={() => {
            const side = cameraSide;
            setCameraSide(null);
            phoneCameraInputs.current[side]?.click();
          }}
        />
      )}
    </div>
  );
};
