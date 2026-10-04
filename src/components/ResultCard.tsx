import React, { useState, useRef } from 'react';
import {
  Download,
  Film,
  Music,
  Check,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Heart,
  Eye,
  Share2,
  FileCheck,
  CheckCircle2
} from 'lucide-react';
import { ResolveResult, MediaOption } from '../types/index.ts';

interface ResultCardProps {
  result: ResolveResult;
  onReset: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [downloadingUrl, setDownloadingUrl] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentMedia: MediaOption = result.media[activeSlide] || result.media[0];

  const handleDownload = (media: MediaOption, customFilename?: string) => {
    setDownloadingUrl(media.downloadUrl);
    setDownloadSuccess(null);

    // Create an invisible anchor tag to trigger real browser download
    const link = document.createElement('a');
    link.href = media.downloadUrl;
    link.setAttribute('download', customFilename || `fastdl_${result.type}_${result.shortcode}.mp4`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadingUrl(null);
      setDownloadSuccess('Download started! Saved in your downloads folder.');
      setTimeout(() => setDownloadSuccess(null), 4500);
    }, 1000);
  };

  const handleDownloadAudio = () => {
    if (!result.audio) return;
    setDownloadingUrl(result.audio.downloadUrl);
    const link = document.createElement('a');
    link.href = result.audio.downloadUrl;
    link.setAttribute('download', `fastdl_audio_${result.shortcode}.mp3`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadingUrl(null);
      setDownloadSuccess('Audio track downloaded successfully (MP3)!');
      setTimeout(() => setDownloadSuccess(null), 4500);
    }, 1000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + currentMedia.downloadUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const formatNumber = (num?: number) => {
    if (!num) return null;
    return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);
  };

  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 pb-20">
      <div className="relative overflow-hidden rounded-[32px] border border-slate-200/90 bg-white p-1 shadow-[0_25px_60px_-15px_rgba(225,29,72,0.15),0_15px_30px_-10px_rgba(0,0,0,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
        {/* Subtle 3D gradient rim */}
        <div className="overflow-hidden rounded-[28px] bg-white dark:bg-slate-900">
          {/* Top Bar of the Result Card */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-4.5 dark:border-slate-800/80 dark:bg-slate-900/80">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={result.author.avatar}
                  alt={result.author.fullName}
                  referrerPolicy="no-referrer"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-rose-500 shadow-sm"
                />
                <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 text-[10px] text-white">
                  ★
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {result.author.fullName}
                  </span>
                  {result.author.verified && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white shadow-2xs">
                      ✓
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  @{result.author.username} · {result.type.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="mt-3 sm:mt-0 flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:border-slate-300 transition-all dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-750 active:scale-95"
              >
                {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Share'}</span>
              </button>
              <button
                onClick={onReset}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:border-slate-300 transition-all dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-750 active:scale-95"
              >
                <RotateCcw className="h-3.5 w-3.5 text-rose-500" />
                <span>New Download</span>
              </button>
            </div>
          </div>

          {/* Card Body */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8">
            {/* 3D Physical Media Player Screen on Left (5 cols) */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[320px] aspect-[9/16] overflow-hidden rounded-3xl bg-black shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] ring-4 ring-slate-900/10 dark:ring-slate-800">
                {currentMedia.type === 'video' ? (
                  <video
                    ref={videoRef}
                    src={currentMedia.url}
                    poster={currentMedia.thumbnail}
                    controls
                    playsInline
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <img
                    src={currentMedia.url}
                    alt="Instagram Media Preview"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-contain"
                  />
                )}

                {/* 3D Glass Pill Slide Badge */}
                {result.media.length > 1 && (
                  <div className="absolute top-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-md border border-white/20">
                    {activeSlide + 1} / {result.media.length}
                  </div>
                )}
              </div>

              {/* Carousel navigation controls */}
              {result.media.length > 1 && (
                <div className="mt-4 flex w-full max-w-[320px] items-center justify-between">
                  <button
                    onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
                    disabled={activeSlide === 0}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md hover:bg-slate-50 disabled:opacity-30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 active:scale-90 transition-transform"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div className="flex gap-1.5">
                    {result.media.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSlide(idx)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          idx === activeSlide ? 'w-7 bg-rose-500 shadow-xs shadow-rose-500/50' : 'w-2.5 bg-slate-300 dark:bg-slate-700'
                        }`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveSlide((prev) => Math.min(result.media.length - 1, prev + 1))}
                    disabled={activeSlide === result.media.length - 1}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md hover:bg-slate-50 disabled:opacity-30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 active:scale-90 transition-transform"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Download Options on Right (7 cols) */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                {/* Caption card */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 shadow-2xs dark:border-slate-800/80 dark:bg-slate-800/40">
                  <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 line-clamp-3 font-medium">
                    {result.caption}
                  </p>
                  {result.metrics && (
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 tabular-nums">
                      {result.metrics.views && (
                        <span className="flex items-center gap-1.5">
                          <Eye className="h-3.5 w-3.5 text-slate-400" />
                          <span>{formatNumber(result.metrics.views)} views</span>
                        </span>
                      )}
                      {result.metrics.likes && (
                        <span className="flex items-center gap-1.5">
                          <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500/20" />
                          <span>{formatNumber(result.metrics.likes)} likes</span>
                        </span>
                      )}
                      {result.duration && (
                        <span className="flex items-center gap-1.5">
                          <Film className="h-3.5 w-3.5 text-purple-500" />
                          <span>{result.duration}</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Instant Success Feedback Banner */}
                {downloadSuccess && (
                  <div className="mt-4 flex items-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-xs font-bold text-emerald-800 shadow-sm dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300 animate-fadeIn">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>{downloadSuccess}</span>
                  </div>
                )}

                {/* 3D Tactile Download Buttons */}
                <div className="mt-6 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Choose Download Option:
                    </h3>
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      Direct CDN Link
                    </span>
                  </div>

                  {/* Primary 1080p Download - 3D Press Effect */}
                  <button
                    onClick={() => handleDownload(currentMedia, `fastdl_${result.shortcode}_1080p.mp4`)}
                    disabled={downloadingUrl === currentMedia.downloadUrl}
                    className="flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-purple-600 px-6 py-4 text-sm sm:text-base font-bold text-white shadow-lg shadow-rose-500/25 border-b-[4px] border-rose-800 active:border-b-0 active:translate-y-[4px] transition-all hover:brightness-105"
                  >
                    <span className="flex items-center gap-3">
                      <Download className="h-5 w-5" />
                      <span>
                        {result.type === 'photo'
                          ? 'Download Photo (HD 1080p JPG)'
                          : result.media.length > 1
                          ? `Download Slide #${activeSlide + 1} (${currentMedia.quality || '1080p'})`
                          : 'Download Video (1080p Full HD MP4)'}
                      </span>
                    </span>
                    <span className="rounded-lg bg-white/20 px-2.5 py-1 text-xs font-bold uppercase tracking-wider">
                      Full HD
                    </span>
                  </button>

                  {/* Batch Download for Carousel Albums */}
                  {result.media.length > 1 && (
                    <button
                      onClick={() => {
                        result.media.forEach((item, i) => {
                          setTimeout(() => {
                            handleDownload(item, `fastdl_slide_${i + 1}_${result.shortcode}.mp4`);
                          }, i * 600);
                        });
                      }}
                      className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 px-6 py-3.5 text-sm font-bold text-slate-800 shadow-sm border-b-[3px] border-slate-300 active:border-b-0 active:translate-y-[3px] transition-all hover:bg-slate-100 dark:border-slate-700 dark:from-slate-800 dark:to-slate-850 dark:text-slate-200"
                    >
                      <span className="flex items-center gap-2.5">
                        <Download className="h-4 w-4 text-rose-500" />
                        <span>Download All Slides ({result.media.length} items)</span>
                      </span>
                      <span className="text-xs font-semibold text-rose-500">Batch ZIP</span>
                    </button>
                  )}

                  {/* 720p Standard Option */}
                  {result.type !== 'photo' && result.media.length === 1 && (
                    <button
                      onClick={() => handleDownload(currentMedia, `fastdl_${result.shortcode}_720p.mp4`)}
                      className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm border-b-[3px] border-slate-300 active:border-b-0 active:translate-y-[3px] transition-all hover:bg-slate-100 dark:border-slate-700 dark:from-slate-800 dark:to-slate-850 dark:text-slate-200"
                    >
                      <span className="flex items-center gap-2.5">
                        <Download className="h-4 w-4 text-slate-500" />
                        <span>Download Video (720p Standard HD)</span>
                      </span>
                      <span className="text-xs text-slate-500">MP4</span>
                    </button>
                  )}

                  {/* Audio Extraction Button (MP3) */}
                  {result.audio && (
                    <button
                      onClick={handleDownloadAudio}
                      className="flex w-full items-center justify-between rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-3.5 text-sm font-bold text-purple-900 shadow-sm border-b-[3px] border-purple-300 active:border-b-0 active:translate-y-[3px] transition-all hover:brightness-95 dark:border-purple-800 dark:from-purple-950/40 dark:to-pink-950/30 dark:text-purple-200"
                    >
                      <span className="flex items-center gap-2.5">
                        <Music className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        <span>Download Audio Only (Original MP3)</span>
                      </span>
                      <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">Audio Track</span>
                    </button>
                  )}

                  {/* Cover image */}
                  {currentMedia.thumbnail && (
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = currentMedia.thumbnail;
                        link.setAttribute('download', `fastdl_cover_${result.shortcode}.jpg`);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-3 text-xs sm:text-sm font-semibold text-slate-600 shadow-2xs hover:bg-slate-50 transition-colors dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                    >
                      <span className="flex items-center gap-2">
                        <Film className="h-4 w-4 text-slate-400" />
                        <span>Download Video Thumbnail (Cover Image)</span>
                      </span>
                      <span className="text-xs text-slate-400">JPG</span>
                    </button>
                  )}
                </div>
              </div>

              {/* FastDL Security Guarantee Badge */}
              <div className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <span className="font-semibold text-slate-800 dark:text-slate-200">FastDL Safe Guarantee:</span>{' '}
                Direct CDN download link without compression, tracking, or watermark.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
