import React from 'react';
import { Zap, ShieldCheck, Sparkles, Smartphone, Music, DownloadCloud } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations.ts';

interface FeaturesSectionProps {
  currentLang: string;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const features = [
    {
      num: '01',
      title: 'Full HD & 4K Resolution',
      desc: 'Download videos and photos in their absolute original upload resolution. No compression, no downscaling, and no blur.',
      icon: <Sparkles className="h-6 w-6 text-amber-500" />,
      gradient: 'from-amber-500/10 to-rose-500/10',
      tag: 'Original Quality',
    },
    {
      num: '02',
      title: 'Lightning Fast Cloud Engines',
      desc: 'Our high-bandwidth CDN edge nodes fetch and prepare Instagram media within milliseconds, giving you instant direct downloads.',
      icon: <Zap className="h-6 w-6 text-rose-500" />,
      gradient: 'from-rose-500/10 to-purple-500/10',
      tag: 'Zero Lag',
    },
    {
      num: '03',
      title: '100% Free & Unlimited',
      desc: 'Download as many Reels, Videos, Carousels, and Stories as you need. No account registration, no credit cards, and no quotas.',
      icon: <DownloadCloud className="h-6 w-6 text-blue-500" />,
      gradient: 'from-blue-500/10 to-indigo-500/10',
      tag: 'No Limits',
    },
    {
      num: '04',
      title: 'Cross-Device Compatibility',
      desc: 'Works flawlessly on iPhone (iOS Safari), Android (Chrome), Windows, macOS, Linux, and tablets without installing any app.',
      icon: <Smartphone className="h-6 w-6 text-emerald-500" />,
      gradient: 'from-emerald-500/10 to-teal-500/10',
      tag: 'Universal Web',
    },
    {
      num: '05',
      title: 'Audio & MP3 Extraction',
      desc: 'Extract and save original background music, voiceovers, and trending audio tracks directly as standalone MP3 files.',
      icon: <Music className="h-6 w-6 text-purple-500" />,
      gradient: 'from-purple-500/10 to-pink-500/10',
      tag: 'MP3 Audio',
    },
    {
      num: '06',
      title: 'Safe, Anonymous & Clean',
      desc: 'No personal data or browsing history is tracked. All media is fetched anonymously through secure SSL encrypted connections.',
      icon: <ShieldCheck className="h-6 w-6 text-rose-600" />,
      gradient: 'from-rose-600/10 to-orange-500/10',
      tag: 'Private & Secure',
    },
  ];

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-50/60 dark:bg-slate-900/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
            Engineered for Speed
          </span>
          <h2 className="mt-2 font-['Syne',sans-serif] text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white [text-wrap:balance]">
            {t.featuresTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.featuresSubtitle}
          </p>
        </div>

        {/* Feature Cards with 3D Depth */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item) => (
            <div
              key={item.num}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(244,63,94,0.15)] hover:border-rose-400/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none dark:hover:border-rose-500/40"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-inner transition-transform group-hover:scale-110`}
                  >
                    {item.icon}
                  </div>
                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                    {item.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                <span className="font-['Syne',sans-serif] text-xs font-bold text-slate-400">
                  FEATURE {item.num}
                </span>
                <span className="text-xs font-medium text-rose-500 transition-transform group-hover:translate-x-1">
                  100% Free →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Showcase Banner with 3D Video Quality Frame */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 p-6 sm:p-10 text-white shadow-2xl dark:border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Ultra HD 4K Pipeline</span>
              </div>
              <h3 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold tracking-tight [text-wrap:balance]">
                Direct High-Definition Stream Extraction
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                Unlike ordinary download tools that compress media or strip audio fidelity, FastDL connects directly to the original CDN source stream, preserving crisp 60fps motion, HDR dynamic range, and high-bitrate AAC audio.
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-medium text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>MP4 Video (H.264/AVC)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>JPG Photos (Full Res)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>MP3 Audio (320kbps)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <img
                  src="/src/assets/images/fastdl_quality_showcase_1791093922937.jpg"
                  alt="4K Ultra HD Instagram Video Downloader"
                  referrerPolicy="no-referrer"
                  className="w-full object-cover aspect-[16/10] transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <div className="text-xs">
                    <p className="font-bold text-white">Full Bitrate Preservation</p>
                    <p className="text-slate-300">FastDL Stream Router v2.4</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
