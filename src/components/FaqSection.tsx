import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations.ts';

interface FaqSectionProps {
  currentLang: string;
}

interface FaqItem {
  q: string;
  a: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: 'Is FastDL free to use and are there download limits?',
      a: 'Yes, FastDL is 100% free and unlimited. You can download as many Instagram videos, reels, photos, and carousels as you like without any subscription, credits, or hidden paywalls.',
    },
    {
      q: 'Do I need to install software or log into my Instagram account?',
      a: 'No! FastDL runs directly in your web browser. You do not need to install browser extensions, APKs, or third-party apps, and you NEVER have to enter your Instagram username or password.',
    },
    {
      q: 'Can I download videos from private Instagram accounts?',
      a: 'FastDL strictly supports publicly shared Instagram posts, reels, videos, stories, and carousels. To protect user privacy and account security, private accounts that require follow approval cannot be scraped or accessed by external web downloaders.',
    },
    {
      q: 'Where do downloaded videos and photos get saved?',
      a: 'On Windows and Mac, files are saved in your default "Downloads" folder. On iPhone (iOS Safari), tap the download icon in the address bar and select "Save Video" to send it directly to your Photos Camera Roll. On Android, files appear in your Files app or Google Photos.',
    },
    {
      q: 'What resolution and file format will I get?',
      a: 'FastDL preserves the original quality uploaded by the creator. Videos are saved in Full HD 1080p MP4 format (or 720p), photos are saved in maximum clarity JPG, and extracted audio is saved in high-bitrate MP3 format.',
    },
    {
      q: 'Does FastDL put a watermark on the downloaded videos?',
      a: 'No. All videos and images are downloaded completely clean and without any watermark, logo, or overlay from FastDL.',
    },
    {
      q: 'Can I download Instagram audio and background music?',
      a: 'Yes! When you paste an Instagram Reel or Video URL, FastDL automatically identifies the soundtrack and provides a dedicated "Download Audio Only (MP3)" button.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-50/60 dark:bg-slate-900/50 border-t border-slate-200/80 dark:border-slate-800">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="mt-3 font-['Syne',sans-serif] text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white [text-wrap:balance]">
            {t.faqTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.faqSubtitle}
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-colors dark:border-slate-800 dark:bg-slate-900"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-slate-900 transition-colors hover:text-rose-600 dark:text-white dark:hover:text-rose-400 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-rose-500' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-slate-100 px-5 pt-3 pb-5 text-sm leading-relaxed text-slate-600 dark:border-slate-800/80 dark:text-slate-400 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
