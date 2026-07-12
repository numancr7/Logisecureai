import { useEffect, useState } from "react";

export function useCountUp(target: number, duration = 1600, delay = 0) {
  const [value, setValue] = useState(target); // Start with target value for cached data
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    // Skip animation if target is 0 or if already animated
    if (target === 0 || hasAnimated) {
      setValue(target);
      return;
    }
    
    let raf = 0;
    let start = 0;
    const t = window.setTimeout(() => {
      const tick = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min(1, (ts - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(target * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
        else setHasAnimated(true);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [target, duration, delay, hasAnimated]);
  return value;
}