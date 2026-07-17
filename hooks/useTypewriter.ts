'use client';

import { useState, useEffect } from 'react';

export function useTypewriter(
  text: string,
  speed: number = 38,
  startDelay: number = 600
) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let intervalId: NodeJS.Timeout;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (index < text.length) {
          setDisplayed((prev) => prev + text.charAt(index));
          index++;
        } else {
          setDone(true);
          clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
