import React, { useState } from 'react';
import {
  Video,
  Image as ImageIcon,
  Film,
  Clock,
  Tv,
  Layers,
  Clipboard,
  X,
  ArrowRight,
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ToolTab, SampleLink } from '../types/index.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface DownloaderHeroProps {
  activeTab: ToolTab;
  onSelectTab: (tab: ToolTab) => void;
  currentLang: string;
  onResolve: (url: string, tab: ToolTab) => void;
  isLoading: boolean;
  error: string | null;
}

const SAMPLE_LINKS: SampleLink[] = [
  {
    label: 'Viral Reel',
    type: 'reel',
    url: 'https://www.instagram.com/reel/C8x9AbC1234/',
    description: '1080p Instagram Reel with audio',
  },
  {
    label: 'Photo Carousel (4 Slides)',
    type: 'carousel',
    url: 'https://www.instagram.com/p/C9mKl2Z5678/',
    description: 'Multi-slide album photos & video',
  },
  {
    label: 'Nature Video',
    type: 'video',
    url: 'https://www.instagram.com/p/C7nOq3W9012/',
    description: 'Landscape Full HD Video',
  },
  {
    label: 'Aesthetic Photo',
    type: 'photo',
    url: 'https://www.instagram.com/p/C5yTx8R3456/',
    description: 'High-res 1080x1350 portrait photo',
  },
];

export const DownloaderHero: React.FC<DownloaderHeroProps> = ({
  activeTab,
  onSelectTab,
  currentLang,
  onResolve,
  isLoading,
  error,
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [clipboardFeedback, setClipboardFeedback] = useState<string | null>(null);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const tabOptions: { tab: ToolTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'video', label: 'Video', icon: <Video className="h-4 w-4" /> },
    { tab: 'photo', label: 'Photo', icon: <ImageIcon className="h-4 w-4" /> },
    { tab: 'reel', label: 'Reels', icon: <Film className="h-4 w-4" /> },
    { tab: 'story', label: 'Stories', icon: <Clock className="h-4 w-4" /> },
    { tab: 'igtv', label: 'IGTV', icon: <Tv className="h-4 w-4" /> },
    { tab: 'carousel', label: 'Carousel', icon: <Layers className="h-4 w-4" /> },
  ];

  const getHeroTitle = () => {
    switch (activeTab) {
      case 'video':
        return t.heroTitle_video;
      case 'photo':
        return t.heroTitle_photo;
      case 'reel':
        return t.heroTitle_reel;
      case 'story':
        return t.heroTitle_story;
      case 'igtv':
        return t.heroTitle_igtv;
      case 'carousel':
        return t.heroTitle_carousel;
      default:
        return t.heroTitle_all;
    }
  };

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text && text.trim().length > 0) {
          setUrlInput(text.trim());
          setClipboardFeedback('Link pasted from clipboard!');
          setTimeout(() => setClipboardFeedback(null), 2500);
          return;
        }
      }
      setClipboardFeedback('Use Ctrl+V / Cmd+V to paste');
      setTimeout(() => setClipboardFeedback(null), 3000);
    } catch (err) {
      setClipboardFeedback('Please paste link manually.');
      setTimeout(() => setClipboardFeedback(null), 3000);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!urlInput.trim()) return;
    onResolve(urlInput.trim(), activeTab);
  };

  const handleSampleClick = (sample: SampleLink) => {
    setUrlInput(sample.url);
    onSelectTab(sample.type);
    onResolve(sample.url, sample.type);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-14 sm:pb-20">
      {/* 3D ambient lighting orbs */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 flex justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div className="h-[450px] w-[800px] -translate-y-1/3 rounded-full bg-gradient-to-tr from-amber-300/30 via-rose-400/25 to-purple-500/25 blur-3xl dark:from-rose-950/20 dark:via-purple-950/20 dark:to-slate-900/10" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        {/* 3D Segmented Category Tabs */}
        <div className="mb-6 sm:mb-8 inline-flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 rounded-2xl border border-slate-200/90 bg-white/90 p-1.5 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.04)] backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
          <button
            onClick={() => onSelectTab('all')}
            className={`flex items-center gap-1.5 rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-md shadow-rose-500/30 scale-102'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>All-in-One</span>
          </button>
          {tabOptions.map((opt) => (
            <button
              key={opt.tab}
              onClick={() => onSelectTab(opt.tab)}
              className={`flex items-center gap-1.5 rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeTab === opt.tab
                  ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-md shadow-rose-500/30 scale-102 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/60'
              }`}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </button>
          ))}
        </div>

        {/* Hero Title with 3D gradient touch */}
        <h1 className="font-['Syne',sans-serif] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-5xl dark:text-white [text-wrap:balance]">
          {getHeroTitle()}
        </h1>

        {/* Hero Subtitle */}
        <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {t.heroSubtitle}
        </p>

        {/* 3D Elevated Input Box */}
        <div className="mx-auto mt-8 sm:mt-10 max-w-3xl">
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-rose-400/30 via-purple-400/20 to-transparent shadow-[0_20px_50px_-15px_rgba(225,29,72,0.18),0_10px_20px_-5px_rgba(0,0,0,0.04)]">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-stretch rounded-[22px] border border-white/80 bg-white p-2.5 shadow-inner transition-all dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="relative flex flex-1 items-center">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder={t.pastePlaceholder}
                  className="w-full bg-transparent px-3 sm:px-4 py-3.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none dark:text-white dark:placeholder-slate-500 font-medium"
                  disabled={isLoading}
                />
                {urlInput && (
                  <button
                    type="button"
                    onClick={() => setUrlInput('')}
                    className="mr-2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    aria-label="Clear input"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={handlePaste}
                  className="mr-2 flex items-center gap-1.5 rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 transition-all dark:border-slate-700 dark:from-slate-800 dark:to-slate-850 dark:text-slate-200 active:scale-95 whitespace-nowrap"
                >
                  <Clipboard className="h-3.5 w-3.5 text-rose-500" />
                  <span>{t.pasteBtn}</span>
                </button>
              </div>

              {/* 3D Tactile Download Button */}
              <button
                type="submit"
                disabled={isLoading || !urlInput.trim()}
                className="mt-2 sm:mt-0 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-purple-600 px-7 py-4 text-sm sm:text-base font-bold text-white shadow-lg shadow-rose-500/25 border-b-[4px] border-rose-800 active:border-b-0 active:translate-y-[4px] transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{t.searching}</span>
                  </>
                ) : (
                  <>
                    <span>{t.downloadBtn}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Feedback message for clipboard */}
          {clipboardFeedback && (
            <div className="mt-2.5 flex items-center justify-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 animate-fadeIn">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{clipboardFeedback}</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/90 px-4 py-2.5 text-xs font-semibold text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-300 animate-fadeIn">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 3D Quick-Click Sample Link Chips for Easy 1-Click Testing */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="font-semibold text-slate-500 dark:text-slate-400">
              {t.trySample}
            </span>
            {SAMPLE_LINKS.map((sample) => (
              <button
                key={sample.label}
                type="button"
                onClick={() => handleSampleClick(sample)}
                className="group flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 text-slate-700 shadow-[0_2px_4px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 hover:border-rose-400 hover:text-rose-600 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-rose-500 dark:hover:text-rose-400"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 group-hover:scale-125 transition-transform" />
                <span className="font-medium">{sample.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
