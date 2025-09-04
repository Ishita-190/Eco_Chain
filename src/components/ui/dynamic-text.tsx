'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/src/lib/utils';

type TypewriterProps = {
  texts: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
};

export function Typewriter({
  texts,
  className,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 2000,
}: TypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!texts.length) return;

    const timeout = setTimeout(() => {
      if (isPaused) return;

      if (!isDeleting && currentText === texts[currentTextIndex]) {
        // Finished typing, pause before deleting
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, delayBetweenTexts);
        return;
      }

      if (isDeleting && currentText === '') {
        // Finished deleting, move to next text
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        return;
      }

      // Either typing or deleting
      const nextText = isDeleting
        ? currentText.slice(0, -1)
        : texts[currentTextIndex].slice(0, currentText.length + 1);

      setCurrentText(nextText);
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, typingSpeed, deletingSpeed, delayBetweenTexts]);

  return (
    <span className={cn('inline-block', className)}>
      {currentText}
      <span className="animate-blink">|</span>
    </span>
  );
}

type GradientTextProps = {
  text: string;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  animate?: boolean;
};

export function GradientText({
  text,
  className,
  gradientFrom = 'from-green-400',
  gradientTo = 'to-teal-500',
  animate = false,
}: GradientTextProps) {
  return (
    <span
      className={cn(
        'bg-clip-text text-transparent bg-gradient-to-r',
        gradientFrom,
        gradientTo,
        animate && 'animate-gradient-x',
        className
      )}
    >
      {text}
    </span>
  );
}

type CountUpProps = {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
};

export function CountUp({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  className,
  decimals = 0,
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const step = end / (duration / 16); // 60fps

  useEffect(() => {
    let animationFrame: number;
    let lastTime: number;
    let currentCount = 0;

    const updateCount = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      currentCount = Math.min(currentCount + step * (deltaTime / 16), end);
      setCount(currentCount);

      if (currentCount < end) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, step]);

  return (
    <span className={className}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
}

type ShimmerTextProps = {
  text: string;
  className?: string;
};

export function ShimmerText({ text, className }: ShimmerTextProps) {
  return (
    <span className={cn('relative', className)}>
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      {text}
    </span>
  );
}

type WavyTextProps = {
  text: string;
  className?: string;
  waveSpeed?: number;
  waveHeight?: number;
};

export function WavyText({
  text,
  className,
  waveSpeed = 2,
  waveHeight = 4,
}: WavyTextProps) {
  return (
    <span className={cn('inline-block', className)}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block animate-wave"
          style={{
            animationDelay: `${i * 0.05}s`,
            animationDuration: `${waveSpeed}s`,
            transform: `translateY(${Math.sin(i) * waveHeight}px)`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}