import { useEffect, useRef, useState } from "react";

/* ─── Animated counter ─── */
export default function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let start = 0;
          const step = end / 60;
          const t = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(t); }
            else setCount(Math.floor(start));
          }, 16);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}