import React from 'react';
import { Copy, ArrowRight, Download, CheckCircle, Smartphone } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations.ts';

interface HowToGuideProps {
  currentLang: string;
}

export const HowToGuide: React.FC<HowToGuideProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const steps = [
    {
      num: '01',
      title: 'Copy the Instagram Link',
      desc: 'Open the Instagram app or website. Find the Reel, Video, or Photo you want to save, tap the Share icon (or three dots), and select "Copy Link".',
      icon: <Copy className="h-5 w-5 text-rose-500" />,
    },
    {
      num: '02',
      title: 'Paste into FastDL',
      desc: 'Navigate back to FastDL and paste the copied URL into the search field above, or simply hit the one-click "Paste" button.',
      icon: <ArrowRight className="h-5 w-5 text-purple-500" />,
    },
    {
      num: '03',
      title: 'Download High-Res Media',
      desc: 'FastDL processes the link instantly. Select your preferred resolution (1080p, 720p, or Audio MP3) and tap "Download" to save immediately.',
      icon: <Download className="h-5 w-5 text-emerald-500" />,
    },
  ];

  return (
    <section id="how-to" className="border-t border-slate-200/80 bg-white py-16 transition-colors dark:border-slate-800 dark:bg-slate-950 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-['Syne',sans-serif] text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white [text-wrap:balance]">
            {t.howToTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.howToSubtitle}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Steps List (7 cols) */}
          <div className="space-y-6 lg:col-span-7">
            {steps.map((step) => (
              <div
                key={step.num}
                className="flex items-start gap-4 rounded-2xl border border-slate-200/70 bg-slate-50/60 p-5 transition-all hover:border-rose-300 hover:bg-white hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900/40 dark:hover:border-slate-700 dark:hover:bg-slate-900"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-xs dark:bg-slate-800">
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-['Syne',sans-serif] text-xs font-bold text-rose-500">
                      STEP {step.num}
                    </span>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Graphic Showcase (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 p-2 shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <img
                src="/src/assets/images/fastdl_mobile_preview_1791093912371.jpg"
                alt="FastDL mobile preview downloading Instagram videos"
                referrerPolicy="no-referrer"
                className="w-full rounded-2xl object-cover shadow-sm aspect-[16/10]"
              />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">
                      iOS & Android Web Compatible
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">No App Required</span>
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Save directly to your camera roll or downloads folder in Safari, Chrome, and Firefox.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
