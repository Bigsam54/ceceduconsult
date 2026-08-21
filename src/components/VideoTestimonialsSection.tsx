import React, { useState, useRef, useEffect } from 'react';
import { MOCK_VIDEO_TESTIMONIALS } from '../data/mockData';
import { VideoTestimonial } from '../types';
import { Play, Loader2, RefreshCw } from 'lucide-react';

interface VideoCardItemProps {
  video: VideoTestimonial;
  isPlaying: boolean;
  onPlay: () => void;
}

const VideoCardItem: React.FC<VideoCardItemProps> = ({ video, isPlaying, onPlay }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      setIsLoading(true);
      setHasError(false);
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsLoading(false);
          })
          .catch((_err) => {
            // Autoplay with sound might be restricted by browser policy; user can tap controls to play
            setIsLoading(false);
          });
      }
    }
  }, [isPlaying]);

  return (
    <div className="bg-slate-800/90 rounded-2xl sm:rounded-3xl border border-slate-700/80 hover:border-[#2ac0db] overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between">
      {/* On-the-spot Video Player Container - 4:5 on mobile, 16:9 on desktop */}
      <div className="relative aspect-[4/5] sm:aspect-video bg-black overflow-hidden flex items-center justify-center">
        {isPlaying ? (
          <div className="relative w-full h-full bg-black flex items-center justify-center">
            {hasError && video.embedFallbackUrl ? (
              <iframe
                src={video.embedFallbackUrl}
                title={video.headline}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; encrypted-media"
                allowFullScreen
              />
            ) : (
              <>
                <video
                  ref={videoRef}
                  controls
                  playsInline
                  autoPlay
                  preload="auto"
                  onWaiting={() => setIsLoading(true)}
                  onPlaying={() => setIsLoading(false)}
                  onLoadedData={() => setIsLoading(false)}
                  onCanPlay={() => setIsLoading(false)}
                  onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                  }}
                  className="w-full h-full object-contain bg-black"
                >
                  <source src={video.videoUrl} type="video/mp4" />
                  <source src="https://res.cloudinary.com/qg0w6ewi/video/upload/vc_h264/v1787301607/455D148D-7D3E-4CF2-B954-03014580E217.mp4" type="video/mp4" />
                  <source src="https://res.cloudinary.com/qg0w6ewi/video/upload/v1787301607/455D148D-7D3E-4CF2-B954-03014580E217.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Loading indicator while video buffers */}
                {isLoading && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center gap-2 pointer-events-none z-10">
                    <Loader2 className="w-8 h-8 text-[#2ac0db] animate-spin" />
                    <span className="text-xs font-bold text-slate-200">Loading video...</span>
                  </div>
                )}

                {/* Error fallback option */}
                {hasError && (
                  <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center p-4 text-center space-y-3 z-10">
                    <p className="text-xs text-slate-300">Could not stream in default format on this device.</p>
                    {video.embedFallbackUrl && (
                      <button
                        onClick={() => setHasError(true)}
                        className="px-3.5 py-1.5 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Switch to Web Stream
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div
            onClick={onPlay}
            className="relative w-full h-full cursor-pointer group"
          >
            <img
              src={video.coverImage}
              alt={video.headline}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
              referrerPolicy="no-referrer"
            />
            
            {/* Smooth gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/25" />

            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 sm:w-12 sm:h-12 rounded-full bg-[#fa7b2d] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-[#e66b1d] transition-all">
                <Play className="w-6 h-6 sm:w-5 sm:h-5 fill-white ml-0.5" />
              </div>
            </div>

            {/* Mobile Tap Hint */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between sm:hidden">
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-[11px] font-bold text-[#2ac0db]">
                Tap to Play
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Card Body - Heading Only */}
      <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between">
        <h4 className="text-sm font-semibold text-slate-100 leading-snug">
          {video.headline}
        </h4>

        {!isPlaying && (
          <button
            type="button"
            onClick={onPlay}
            className="pt-3 mt-2 border-t border-slate-700/60 flex items-center justify-between text-xs text-[#2ac0db] font-bold w-full text-left cursor-pointer hover:text-[#52d4ec] transition-colors py-1"
          >
            <span>Play Video</span>
            <span>▶</span>
          </button>
        )}
      </div>
    </div>
  );
};

export const VideoTestimonialsSection: React.FC = () => {
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  return (
    <section className="bg-slate-900 text-white py-12 sm:py-16 border-y border-slate-800 relative overflow-hidden">
      
      {/* Subtle background accents */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#2ac0db]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#fa7b2d]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-1.5 sm:space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">
            What Educators Are Saying
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Real experiences and feedback from school owners and early childhood teachers partnered with CEC.
          </p>
        </div>

        {/* Video Cards Grid - Mobile Optimized & On-the-spot Playback */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {MOCK_VIDEO_TESTIMONIALS.map((video) => (
            <VideoCardItem
              key={video.id}
              video={video}
              isPlaying={playingVideoId === video.id}
              onPlay={() => setPlayingVideoId(video.id)}
            />
          ))}
        </div>

      </div>

    </section>
  );
};

