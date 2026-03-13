"use client";

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
}: ScrollAnimatorProps) {
  return (
    <div
      className={cn("motion-reduce:animate-none", ANIMATION_CLASSES[animation], className)}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
      }}
    >
      {children}
    </div>
  );
}
