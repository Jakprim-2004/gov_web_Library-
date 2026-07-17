'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTypewriter } from '@/hooks/useTypewriter';

export function HeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPills, setShowPills] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const smoothTimeRef = useRef<number>(0);
  const requestRef = useRef<number | null>(null);

  const typewriterText = "We make designing government applications fast, consistent, and beautiful. What are we building today?";
  const { displayed, done } = useTypewriter(typewriterText, 38, 600);

  // Trigger action pills fade-in/slide-up 400ms after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPills(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Video mouse-scrubbing effect: updates targetTimeRef based on horizontal mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video || isNaN(video.duration) || video.duration === 0) return;

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const currentX = e.clientX;
      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const duration = video.duration;
      // sensitivity = 0.8
      const timeOffset = (delta / window.innerWidth) * 0.8 * duration;
      let targetTime = targetTimeRef.current + timeOffset;

      // Clamp targetTime between 0 and duration
      if (targetTime < 0) targetTime = 0;
      if (targetTime > duration) targetTime = duration;

      targetTimeRef.current = targetTime;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      prevXRef.current = e.clientX;
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Sync initial currentTime when loaded metadata is ready
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const syncTime = () => {
        targetTimeRef.current = video.currentTime;
        smoothTimeRef.current = video.currentTime;
      };
      video.addEventListener('loadedmetadata', syncTime);
      if (video.duration) {
        syncTime();
      }
      return () => {
        video.removeEventListener('loadedmetadata', syncTime);
      };
    }
  }, []);

  // requestAnimationFrame Loop: smooth lerp + GOP step limiter to prevent stutter
  useEffect(() => {
    const MAX_SEEK_STEP = 0.12; // max seconds per frame jump (stay within keyframe buffer)
    const LERP = 0.06;           // gentle easing — moves 6% closer per frame (60 FPS)

    const updateVideoTime = () => {
      const video = videoRef.current;
      if (video && !isNaN(video.duration) && video.duration > 0) {
        const target = targetTimeRef.current;
        const smooth = smoothTimeRef.current;

        // Interpolate smoothly toward target
        let nextSmooth = smooth + (target - smooth) * LERP;

        // Clamp the per-frame jump to MAX_SEEK_STEP so the decoder never has
        // to cross a keyframe boundary, which is what causes stutter
        const step = nextSmooth - smooth;
        if (Math.abs(step) > MAX_SEEK_STEP) {
          nextSmooth = smooth + Math.sign(step) * MAX_SEEK_STEP;
        }

        smoothTimeRef.current = nextSmooth;

        const diff = nextSmooth - video.currentTime;
        // Perform seek only when the engine is not actively decoding
        if (!video.seeking && Math.abs(diff) > 0.001) {
          video.currentTime = nextSmooth;
        }
      }
      requestRef.current = requestAnimationFrame(updateVideoTime);
    };

    requestRef.current = requestAnimationFrame(updateVideoTime);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText('npm i gov-token-css gov-layout gov-sso-login');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section
      className="relative w-full h-screen overflow-hidden select-none bg-white text-black"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Background Video with Contrast & Brightness Enhancements */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
        className="fixed inset-0 w-full h-full object-cover z-0 contrast-[1.08] brightness-[1.03]"
        style={{
          objectPosition: '70% center',
          pointerEvents: 'none',
        }}
        muted
        playsInline
        preload="auto"
      />

      {/* Gradient Overlay: Slight background on the left for text legibility, completely transparent on the right to keep the robot head crisp */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/45 via-white/15 to-transparent z-[1] pointer-events-none" />

      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-5 sm:px-8 py-4 sm:py-5 z-10">
        {/* Logo */}
        <div className="flex items-center gap-3 select-none">
          <span
            className="text-[21px] sm:text-[26px] tracking-tight text-black"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            GOV UI Toolkit®
          </span>
          <span
            className="text-[25px] sm:text-[30px] text-black select-none leading-none"
            style={{ letterSpacing: '-0.02em' }}
          >
            ✳︎
          </span>
        </div>

        {/* Desktop nav links (hidden on mobile) */}
        <div className="hidden md:flex items-center text-[23px] text-black">
          <Link href="/tokens" className="hover:opacity-60 transition-opacity">Design Tokens</Link>
          <span className="mx-1 select-none">, </span>
          <Link href="/layout/staff" className="hover:opacity-60 transition-opacity">Staff Layout</Link>
          <span className="mx-1 select-none">, </span>
          <Link href="/layout/user" className="hover:opacity-60 transition-opacity">User Layout</Link>
          <span className="mx-1 select-none">, </span>
          <Link href="/sso" className="hover:opacity-60 transition-opacity">SSO Login</Link>
        </div>

        {/* Desktop CTA (hidden on mobile) */}
        <div className="hidden md:block">
          <Link
            href="/guide"
            className="text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
          >
            Integration Guide
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 z-[11] cursor-pointer"
          aria-label="Toggle Menu"
        >
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Overlay Menu */}
      <div
        className={`fixed inset-0 bg-white/95 backdrop-blur-sm z-9 flex flex-col justify-center px-8 gap-8 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Link href="/tokens" className="text-[32px] font-medium text-black">Design Tokens</Link>
        <Link href="/layout/staff" className="text-[32px] font-medium text-black">Staff Layout</Link>
        <Link href="/layout/user" className="text-[32px] font-medium text-black">User Layout</Link>
        <Link href="/sso" className="text-[32px] font-medium text-black">SSO Login</Link>
        <Link href="/guide" className="text-[32px] font-medium text-black underline">
          Integration Guide
        </Link>
      </div>

      {/* Hero Content Area */}
      <div className="relative w-full h-full flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 z-[2]">
        <div className="max-w-xl relative z-10 text-black">
          {/* Blurred Intro Label */}
          <div
            className="pointer-events-none select-none mb-5 sm:mb-6 text-black"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.3,
              fontWeight: 400,
              filter: 'blur(4px)',
            }}
          >
            Hey there, welcome to GOV UI,
            <br />
            Thailand's Official Government Design System & Components
          </div>

          {/* Typewriter Text */}
          <p
            className="mb-5 sm:mb-6 text-black"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.35,
              fontWeight: 400,
              minHeight: '54px',
            }}
          >
            {displayed}
            {!done && (
              <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-cursor-blink" />
            )}
          </p>

          {/* Action Pills */}
          <div
            className={`flex flex-wrap gap-y-1 transition-all duration-500 ${
              showPills ? 'animate-slide-up-pills' : 'opacity-0 translate-y-2'
            }`}
          >
            {/* White pill buttons */}
            <Link
              href="/tokens"
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Explore Design Tokens
            </Link>
            <Link
              href="/layout/staff"
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Try Staff Layout
            </Link>
            <Link
              href="/layout/user"
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Try User Layout
            </Link>
            <Link
              href="/sso"
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Test SSO Login
            </Link>

            {/* Outline install copy button */}
            <button
              onClick={handleCopyCommand}
              className="inline-flex items-center justify-center text-black bg-transparent border border-black/25 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 gap-2 sm:gap-3 cursor-pointer"
            >
              <span className="underline underline-offset-1">
                {copied ? 'Copied!' : 'Install: npm i gov-token-css'}
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
