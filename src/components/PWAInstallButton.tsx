import React, { useState } from 'react';
import { Download, Smartphone, X, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall.ts';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (isInstalled || dismissed) {
    return null;
  }

  return (
    <>
      {/* Desktop / Android Chrome In-App Button */}
      {isInstallable && (
        <button
          onClick={install}
          className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-rose-500 to-purple-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:opacity-95 transition-all active:scale-95"
          title="Install FastDL Google Chrome App"
        >
          <Download className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Add to Chrome</span>
          <span className="sm:hidden">Install</span>
        </button>
      )}

      {/* iOS Safari Guide Button */}
      {isIOS && (
        <>
          <button
            onClick={() => setShowIOSGuide(true)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            <Smartphone className="h-3.5 w-3.5 text-rose-500" />
            <span className="hidden sm:inline">Install on iPhone</span>
            <span className="sm:hidden">App</span>
          </button>

          {showIOSGuide && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
              <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-500 to-rose-600 text-white font-bold text-xs">
                      F
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Install FastDL on iPhone
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowIOSGuide(false)}
                    className="rounded-lg p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4 space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 font-bold text-rose-600 dark:bg-rose-950 dark:text-rose-400 text-[11px]">
                      1
                    </span>
                    <span>
                      Tap the <strong>Share</strong> button at the bottom of Safari.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 font-bold text-rose-600 dark:bg-rose-950 dark:text-rose-400 text-[11px]">
                      2
                    </span>
                    <span>
                      Scroll down and tap <strong>Add to Home Screen</strong>.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 font-bold text-rose-600 dark:bg-rose-950 dark:text-rose-400 text-[11px]">
                      3
                    </span>
                    <span>
                      Tap <strong>Add</strong> in the top-right corner to enjoy 1-click downloads anytime!
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="mt-5 w-full rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 py-2.5 text-xs font-bold text-white shadow-md shadow-rose-500/20 hover:opacity-95"
                >
                  Got It
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
