import { useEffect, useRef, useState } from "react";

export function useCountUp(
  value: number,
  duration = 600,
  decimals = 0
) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    const start = performance.now();
    const from = prev.current;
    const to = value;

    function step(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const current = from + (to - from) * progress;
      setDisplay(Number(current.toFixed(decimals)));

      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
    prev.current = value;
  }, [value, duration, decimals]);

  return display;
}
