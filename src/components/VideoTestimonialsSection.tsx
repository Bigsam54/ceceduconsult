import React, { useState, useEffect } from 'react';
import { VideoTestimonial } from '../types';
import { MOCK_VIDEO_TESTIMONIALS } from '../data/mockData';
import { 
  Play, 
  Pause, 
  X, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  CheckCircle2, 
  Building2, 
  GraduationCap, 
  Clock,
  Sparkles,
  Maximize2
} from 'lucide-react';

export const VideoTestimonialsSection: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);

  // Playback timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeVideo && isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1.2;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [activeVideo, isPlaying]);

  const handleOpenVideo = (video: VideoTestimonial) => {
    setActiveVideo(video);
    setIsPlaying(true);
    setProgress(15);
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
    setIsPlaying(false);
    setProgress(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    setProgress(newProgress);
  };

  return (
    <section className="bg-slate-900 text-white py-12 sm:py-16 border-y border-slate-800 relative overflow-hidden">
      
      {/* Background accents */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#2ac0db]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#fa7b2d]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-1.5 sm:space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">
            What School Owners & Teachers Say
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Watch real feedback from preschool directors, headteachers, and educators partnered with CEC.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {MOCK_VIDEO_TESTIMONIALS.map((video) => (
            <div
              key={video.id}
              onClick={() => handleOpenVideo(video)}
              className="bg-slate-800/90 rounded-2xl border border-slate-700 overflow-hidden shadow-lg hover:border-[#2ac0db] transition-all cursor-pointer group flex flex-col justify-between"
            >
              {/* Video Thumbnail with Play Button Overlay */}
              <div className="relative aspect-video bg-slate-950 overflow-hidden">
                <img
                  src={video.coverImage}
                  alt={video.author}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                  referrerPolicy="no-referrer"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Duration Badge */}
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[10px] font-mono font-bold text-white flex items-center gap-1 border border-white/10">
                  <Clock className="w-3 h-3 text-[#2ac0db]" />
                  <span>{video.duration}</span>
                </div>

                {/* Topic Badge */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#2ac0db]/90 text-slate-950 text-[10px] font-bold">
                  {video.author.split(' ')[0]}
                </div>

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#fa7b2d] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#e66b1d] transition-all">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-2 left-3 right-3 text-left">
                  <p className="text-[11px] font-bold text-white truncate">{video.videoTopic}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-slate-200 line-clamp-2 leading-relaxed">
                    {video.headline}
                  </h4>
                </div>

                <div className="pt-2.5 border-t border-slate-700/80 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white text-xs">{video.author}</p>
                    <p className="text-[11px] text-slate-400 truncate max-w-[170px]">
                      {video.role}, {video.school}
                    </p>
                  </div>
                  <span className="text-[#2ac0db] text-xs font-bold group-hover:translate-x-0.5 transition-transform flex items-center">
                    Play ▶
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 rounded-3xl max-w-3xl w-full border border-slate-700 shadow-2xl overflow-hidden relative">
            
            {/* Modal Header */}
            <div className="p-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#2ac0db]/20 text-[#2ac0db] flex items-center justify-center font-bold text-xs">
                  CEC
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{activeVideo.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db]" />
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {activeVideo.role} • {activeVideo.school} ({activeVideo.location})
                  </p>
                </div>
              </div>

              <button
                onClick={handleCloseVideo}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
                aria-label="Close Video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Stage / Playback Area */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              
              {/* Realistic Visual Stage */}
              <img
                src={activeVideo.coverImage}
                alt={activeVideo.author}
                className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-90 brightness-95' : 'opacity-60'}`}
                referrerPolicy="no-referrer"
              />

              {/* Watermark & Live indicator */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-[10px] font-bold text-[#2ac0db] border border-white/10">
                  CEC VERIFIED REVIEW
                </span>
                {isPlaying && (
                  <span className="px-2 py-0.5 rounded-md bg-red-600/90 text-[10px] font-bold text-white flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" /> PLAYING
                  </span>
                )}
              </div>

              {/* Simulated Audio Waveform when playing */}
              {isPlaying && (
                <div className="absolute top-4 right-4 flex items-end gap-1 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-[#2ac0db] rounded-full"
                      style={{
                        height: `${8 + Math.sin((progress + i * 20) * 0.2) * 12}px`,
                        transition: 'height 0.15s ease'
                      }}
                    />
                  ))}
                  <span className="text-[10px] font-mono text-slate-300 ml-1.5">
                    {Math.floor((progress / 100) * 105)}s / {activeVideo.duration}
                  </span>
                </div>
              )}

              {/* Large Pause / Play Center Click trigger */}
              <div 
                onClick={() => setIsPlaying(!isPlaying)} 
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
              >
                {!isPlaying && (
                  <div className="w-16 h-16 rounded-full bg-[#fa7b2d] text-white flex items-center justify-center shadow-2xl scale-110">
                    <Play className="w-7 h-7 fill-white ml-1" />
                  </div>
                )}
              </div>

              {/* Subtitles / Live Captions Overlay */}
              {showCaptions && (
                <div className="absolute bottom-16 left-6 right-6 text-center pointer-events-none">
                  <span className="inline-block px-4 py-2 rounded-xl bg-black/85 text-white text-xs sm:text-sm font-medium shadow-lg border border-white/10 max-w-xl">
                    "{activeVideo.quote}"
                  </span>
                </div>
              )}

              {/* Bottom Video Controls Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 space-y-2">
                
                {/* Scrubber / Progress Bar */}
                <div 
                  onClick={handleSeek}
                  className="w-full h-2 bg-slate-700/80 hover:h-2.5 rounded-full cursor-pointer relative overflow-hidden transition-all"
                >
                  <div 
                    className="h-full bg-gradient-to-r from-[#2ac0db] to-[#fa7b2d] rounded-full relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md" />
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between text-xs text-white pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    </button>

                    <button
                      onClick={() => {
                        setProgress(0);
                        setIsPlaying(true);
                      }}
                      className="p-1.5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Restart"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1.5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    <span className="text-[11px] text-slate-300 font-mono">
                      {Math.floor((progress / 100) * 105)}s / {activeVideo.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowCaptions(!showCaptions)}
                      className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                        showCaptions 
                          ? 'bg-[#2ac0db] text-slate-950 border-[#2ac0db]' 
                          : 'bg-transparent text-slate-400 border-slate-600'
                      }`}
                    >
                      CC
                    </button>
                    <span className="text-[10px] text-slate-400 hidden sm:inline font-semibold">
                      HD 1080p
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Key takeaway summary box */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-[#2ac0db] uppercase tracking-wider">
                  Key Verification Focus
                </span>
                <p className="text-slate-300 font-medium">{activeVideo.videoTopic}</p>
              </div>

              <button
                onClick={handleCloseVideo}
                className="px-4 py-2 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Close Video
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
