import React from 'react';
import { Film, Video, Image as ImageIcon, Clock, Layers, Tv, ArrowRight } from 'lucide-react';
import { ToolTab } from '../types/index.ts';

interface SupportedTypesProps {
  onSelectTab: (tab: ToolTab) => void;
}

export const SupportedTypes: React.FC<SupportedTypesProps> = ({ onSelectTab }) => {
  const types = [
    {
      tab: 'reel' as ToolTab,
      title: 'Instagram Reels Downloader',
      badge: 'Reels',
      desc: 'Save viral 15s to 90s short-form Instagram Reels with complete audio in 1080p MP4 format.',
      icon: <Film className="h-5 w-5 text-rose-500" />,
      accent: 'group-hover:border-rose-400 group-hover:shadow-rose-500/10',
    },
    {
      tab: 'video' as ToolTab,
      title: 'Instagram Video Downloader',
      badge: 'Feed Video',
      desc: 'Download regular feed videos, long-form clips, and landscape productions in maximum crisp clarity.',
      icon: <Video className="h-5 w-5 text-purple-500" />,
      accent: 'group-hover:border-purple-400 group-hover:shadow-purple-500/10',
    },
    {
      tab: 'photo' as ToolTab,
      title: 'Instagram Photo Downloader',
      badge: 'Photos',
      desc: 'Extract full-resolution photographs, portraits, and aesthetic images in pristine high-definition JPG.',
      icon: <ImageIcon className="h-5 w-5 text-amber-500" />,
      accent: 'group-hover:border-amber-400 group-hover:shadow-amber-500/10',
    },
    {
      tab: 'carousel' as ToolTab,
      title: 'Carousel / Album Downloader',
      badge: 'Multi-Slide',
      desc: 'Download multi-photo and mixed video carousel albums with one-click batch download options.',
      icon: <Layers className="h-5 w-5 text-blue-500" />,
      accent: 'group-hover:border-blue-400 group-hover:shadow-blue-500/10',
    },
    {
      tab: 'story' as ToolTab,
      title: 'Stories & Highlights Downloader',
      badge: 'Stories',
      desc: 'Save public 24-hour stories and permanent profile highlights before they expire from view.',
      icon: <Clock className="h-5 w-5 text-emerald-500" />,
      accent: 'group-hover:border-emerald-400 group-hover:shadow-emerald-500/10',
    },
    {
      tab: 'igtv' as ToolTab,
      title: 'Instagram IGTV Downloader',
      badge: 'IGTV Series',
      desc: 'Download full-length IGTV broadcast episodes and serialized videos to watch offline anytime.',
      icon: <Tv className="h-5 w-5 text-indigo-500" />,
      accent: 'group-hover:border-indigo-400 group-hover:shadow-indigo-500/10',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
            All Content Formats
          </span>
          <h2 className="mt-2 font-['Syne',sans-serif] text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white [text-wrap:balance]">
            Download Every Type of Instagram Media
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            FastDL supports every media type posted across Instagram with tailored decoders.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {types.map((t) => (
            <button
              key={t.tab}
              onClick={() => {
                onSelectTab(t.tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`group flex flex-col justify-between text-left rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/40 dark:hover:bg-slate-900 ${t.accent}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-xs dark:bg-slate-800">
                    {t.icon}
                  </div>
                  <span className="rounded-full bg-slate-200/60 px-2.5 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {t.badge}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  {t.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {t.desc}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-rose-500">
                <span>Start Downloading</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
