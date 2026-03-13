"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ANIMATION_CLASSES = {
  fadeInUp: "animate-fadeInUp",
  fadeInLeft: "animate-fadeInLeft",
  fadeInRight: "animate-fadeInRight",
  scaleIn: "animate-scaleIn",
} as const;

type AnimationName = keyof typeof ANIMATION_CLASSES;

interface ScrollAnimatorProps {
  children: React.ReactNode;
  className?: string;
  animation?: AnimationName;
  delay?: number;
  threshold?: number;
  once?: boolean;
}

export function ScrollAnimator({
  children,
  className,
  animation = "fadeInUp",
  delay = 0,
  threshold = 0.1,
  once = true,
}: ScrollAnimatorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0",
        isVisible && ANIMATION_CLASSES[animation],
        isVisible && "opacity-100",
        className
      )}
      style={{
        animationDelay: isVisible ? `${delay}ms` : undefined,
        animationFillMode: "both",
      }}
    >
      {children}
    </div>
  );
}
