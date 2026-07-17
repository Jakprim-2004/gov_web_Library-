'use client';

import { useEffect, useState } from 'react';
import { SettingsPanel } from 'gov-layout';

type ThemeMode = 'light' | 'dark';
type FontSize = 'sm' | 'md' | 'lg';

export default function SettingPage() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [fontSize, setFontSize] = useState<FontSize>('md');

  useEffect(() => {
    const savedTheme = localStorage.getItem('demo_theme');
    const savedFont = localStorage.getItem('demo_font_size');

    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    if (savedFont === 'sm' || savedFont === 'md' || savedFont === 'lg') {
      setFontSize(savedFont);
      document.documentElement.style.fontSize =
        savedFont === 'sm' ? '14px' : savedFont === 'lg' ? '18px' : '16px';
    }
  }, []);

  const onChangeTheme = (next: ThemeMode) => {
    setTheme(next);
    localStorage.setItem('demo_theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  const onChangeFont = (next: FontSize) => {
    setFontSize(next);
    localStorage.setItem('demo_font_size', next);
    document.documentElement.style.fontSize =
      next === 'sm' ? '14px' : next === 'lg' ? '18px' : '16px';
  };

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
      <section className="card-section p-6 md:p-8 mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#060d26]">ตั้งค่า</h1>
        <p className="mt-2 text-sm text-[#707993]">ปรับโหมดสีและขนาดตัวอักษรในหน้าเดียว</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="card-section p-6 md:p-8">
          <h2 className="text-lg font-bold text-[#060d26] mb-4">โหมดสี</h2>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => onChangeTheme('light')} className={`rounded-full px-4 py-2 text-sm font-semibold border ${theme === 'light' ? 'bg-[#1e7d55] text-white border-[#1e7d55]' : 'bg-white text-[#475272] border-[#060d26]/10'}`}>สว่าง</button>
            <button type="button" onClick={() => onChangeTheme('dark')} className={`rounded-full px-4 py-2 text-sm font-semibold border ${theme === 'dark' ? 'bg-[#1e7d55] text-white border-[#1e7d55]' : 'bg-white text-[#475272] border-[#060d26]/10'}`}>มืด</button>
          </div>

          <h3 className="text-base font-bold text-[#060d26] mt-6 mb-3">ขนาดตัวอักษร</h3>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => onChangeFont('sm')} className={`rounded-full px-4 py-2 text-sm font-semibold border ${fontSize === 'sm' ? 'bg-[#1e7d55] text-white border-[#1e7d55]' : 'bg-white text-[#475272] border-[#060d26]/10'}`}>เล็ก</button>
            <button type="button" onClick={() => onChangeFont('md')} className={`rounded-full px-4 py-2 text-sm font-semibold border ${fontSize === 'md' ? 'bg-[#1e7d55] text-white border-[#1e7d55]' : 'bg-white text-[#475272] border-[#060d26]/10'}`}>กลาง</button>
            <button type="button" onClick={() => onChangeFont('lg')} className={`rounded-full px-4 py-2 text-sm font-semibold border ${fontSize === 'lg' ? 'bg-[#1e7d55] text-white border-[#1e7d55]' : 'bg-white text-[#475272] border-[#060d26]/10'}`}>ใหญ่</button>
          </div>
        </div>

        <div className="card-section p-6 md:p-8">
          <h2 className="text-lg font-bold text-[#060d26] mb-4">การแสดงผล</h2>
          <SettingsPanel showTheme />
        </div>
      </section>
    </main>
  );
}
