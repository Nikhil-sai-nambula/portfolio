"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

type CounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

export function Counter({
  value,
  suffix = "",
  prefix = "",
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, {
    stiffness: 60,
    damping: 18,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (inView) {
      motionVal.set(value);
    }
  }, [inView, motionVal, value]);

  useEffect(() => {
    const unsubscribe = springVal.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString()}${suffix}`;
      }
    });
    return () => unsubscribe();
  }, [springVal, prefix, suffix]);

  return (
    <span
      aria-label={`${prefix}${value.toLocaleString()}${suffix}`}
      className={`tabular-nums ${className}`}
    >
      <span ref={ref} aria-hidden="true">
        {prefix}0{suffix}
      </span>
    </span>
  );
}
