import { useState, useEffect } from 'react';

/**
 * Custom React hook to simulate typewriter typing animation.
 * 
 * @param {string} text The full string to type out.
 * @param {number} speed The delay between each letter in ms (default: 38).
 * @param {number} startDelay The delay before typing starts in ms (default: 600).
 * @returns {{ displayed: string, done: boolean }} An object containing the current displayed slice and completion state.
 */
export function useTypewriter(text, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Reset states on text/param change
    setDisplayed('');
    setDone(false);

    let timeoutId = null;
    let intervalId = null;

    timeoutId = setTimeout(() => {
      let currentIndex = 0;
      
      intervalId = setInterval(() => {
        currentIndex++;
        setDisplayed(text.slice(0, currentIndex));
        
        if (currentIndex >= text.length) {
          setDone(true);
          clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    // Cleanup timers
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
