import React, { useEffect, useRef, useState } from 'react';
import { UserCircle2, Camera, Loader2, Save, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { useTeacherProfile } from '../../context/TeacherProfileContext';
import { useToast } from '../../context/ToastContext';
import { uploadToCloudinary, CLOUDINARY_FOLDERS } from '../../lib/cloudinary';
import { prepareImage } from '../../utils/prepareImage';
import { PanelHeader, inputClass, primaryButton, secondaryButton } from './adminUi';

/**
 * Admins have no teacher profile row, so their name and photo live on the login
 * itself (Supabase auth user metadata). The navbar and dashboard header read the
 * same values, so changes show everywhere immediately.
 */
export const AdminProfilePanel: React.FC = () => {
  const toast = useToast();
  const { session } = useAuth();
  const { displayName, avatarUrl, initials } = useTeacherProfile();
  const [fullName, setFullName] = useState(displayName);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setFullName(displayName);
  }, [displayName]);

  const updateMetadata = async (data: Record<string, string>) => {
    if (!supabase) return 'Backend not connected yet.';
    const { error } = await supabase.auth.updateUser({ data });
    return error?.message ?? null;
  };

  const handlePhoto = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file.', 'Upload Failed');
      return;
    }
    setUploading(true);
    try {
      const blob = await prepareImage(file);
      const url = await uploadToCloudinary(blob, { folder: CLOUDINARY_FOLDERS.avatars, fileName: file.name });
      const error = await updateMetadata({ avatar_url: url });
      if (error) throw new Error(error);
      toast.success('Your profile photo has been updated.', 'Photo Updated');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not upload your photo.', 'Upload Failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removePhoto = async () => {
    const error = await updateMetadata({ avatar_url: '' });
    if (error) toast.error(error, 'Could Not Remove Photo');
    else toast.info('Profile photo removed.');
  };

  const saveName = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const error = await updateMetadata({ full_name: fullName.trim() });
    setSaving(false);
    if (error) toast.error(error, 'Save Failed');
    else toast.success('Your name has been updated.', 'Profile Saved');
  };

  return (
    <div className="space-y-5">
      <PanelHeader icon={UserCircle2} title="My Admin Profile" description="Your photo and name appear in the top navigation and on this dashboard." />

      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-4 flex flex-col items-center text-center gap-3">
          <div className="relative">
            {avatarUrl ? (
              <img src={avatarUrl} alt={displayName || 'Admin'} className="w-32 h-32 rounded-3xl object-cover border border-slate-200" />
            ) : (
              <div className="w-32 h-32 rounded-3xl bg-[#126373] text-white flex items-center justify-center font-heading font-extrabold text-4xl">{initials}</div>
            )}
            {uploading && (
              <div className="absolute inset-0 rounded-3xl bg-slate-950/50 flex items-center justify-center">
                <Loader2 className="w-7 h-7 animate-spin text-white" />
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className={primaryButton}>
              <Camera className="w-3.5 h-3.5" /> {avatarUrl ? 'Change Photo' : 'Upload Photo'}
            </button>
            {avatarUrl && (
              <button onClick={removePhoto} disabled={uploading} className={secondaryButton} title="Remove photo">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <p className="text-[11px] text-slate-400">PNG or JPG. A logo or a clear headshot both work.</p>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handlePhoto(e.target.files?.[0])} />
        </div>

        <form onSubmit={saveName} className="md:col-span-8 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Display name</label>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Nancie Asante" className={inputClass} />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Login email</label>
            <input value={session?.user?.email ?? ''} disabled className={`${inputClass} opacity-70`} />
            <p className="text-[11px] text-slate-400 mt-1">To change the login email or password, use Supabase → Authentication → Users.</p>
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={saving || fullName.trim() === displayName} className={primaryButton}>
              <Save className="w-3.5 h-3.5" /> {saving ? 'Saving...' : 'Save Name'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
