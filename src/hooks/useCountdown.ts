import { useEffect, useRef, useState } from 'react';

export function useCountdown(totalSeconds: number, isActive: boolean) {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setSecondsLeft(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (!isActive) return undefined;

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    };
  }, [isActive]);

  return { secondsLeft, isFinished: isActive && secondsLeft === 0 };
}
