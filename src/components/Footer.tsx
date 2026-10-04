import React from 'react';
import { ToolTab } from '../types/index.ts';

interface FooterProps {
  onSelectTab: (tab: ToolTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shadow-sm text-white font-bold text-sm">
                F
              </div>
              <span className="font-['Syne',sans-serif] text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Fast<span className="text-rose-600 dark:text-rose-400">DL</span>
              </span>
            </div>
            <p className="mt-3 max-w-sm text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              The premier online tool to download Instagram videos, reels, photos, IGTV, and stories in full original resolution with zero watermarks.
            </p>
            <div className="mt-4 text-[11px] leading-relaxed text-slate-400 dark:text-slate-500">
              Disclaimer: FastDL is an independent web utility and is not affiliated with, endorsed, or sponsored by Instagram, Meta Platforms, Inc. All Instagram logos, trademarks, and copyrights belong to their respective owners.
            </div>
          </div>

          {/* Quick Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Download Tools
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => {
                    onSelectTab('video');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-rose-500 transition-colors"
                >
                  Instagram Video Downloader
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('reel');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-rose-500 transition-colors"
                >
                  Instagram Reels Downloader
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('photo');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-rose-500 transition-colors"
                >
                  Instagram Photo Downloader
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('carousel');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-rose-500 transition-colors"
                >
                  Instagram Carousel Downloader
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('story');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-rose-500 transition-colors"
                >
                  Instagram Stories & Highlights
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Information
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a href="#how-to" className="hover:text-rose-500 transition-colors">
                  How to Download
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-rose-500 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <span className="text-slate-400">Privacy Policy</span>
              </li>
              <li>
                <span className="text-slate-400">Terms of Service</span>
              </li>
              <li>
                <span className="text-slate-400">Contact & DMCA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 text-center text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500">
          © {new Date().getFullYear()} FastDL. All rights reserved. Free Instagram Downloader.
        </div>
      </div>
    </footer>
  );
};
