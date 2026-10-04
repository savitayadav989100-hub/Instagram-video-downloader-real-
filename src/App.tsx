import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { DownloaderHero } from './components/DownloaderHero.tsx';
import { ResultCard } from './components/ResultCard.tsx';
import { HowToGuide } from './components/HowToGuide.tsx';
import { FeaturesSection } from './components/FeaturesSection.tsx';
import { SupportedTypes } from './components/SupportedTypes.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ToolTab, ResolveResult } from './types/index.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<ToolTab>('all');
  const [currentLang, setCurrentLang] = useState<string>('en');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResolveResult | null>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleResolve = async (url: string, tab: ToolTab) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/resolve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          preferredType: tab === 'all' ? undefined : tab,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to retrieve media. Please verify the Instagram link.');
      }

      setResult(data);

      // Smooth scroll to the result card
      setTimeout(() => {
        const el = document.getElementById('result-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } catch (err: any) {
      console.error('Resolve error:', err);
      setError(err.message || 'Unable to download media from this URL. Please verify it is a valid public post.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-slate-800 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans">
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      <main className="flex-1">
        <DownloaderHero
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          currentLang={currentLang}
          onResolve={handleResolve}
          isLoading={isLoading}
          error={error}
        />

        {result && (
          <div id="result-section">
            <ResultCard result={result} onReset={handleReset} />
          </div>
        )}

        <HowToGuide currentLang={currentLang} />

        <FeaturesSection currentLang={currentLang} />

        <SupportedTypes onSelectTab={setActiveTab} />

        <FaqSection currentLang={currentLang} />
      </main>

      <Footer onSelectTab={setActiveTab} />
    </div>
  );
}
