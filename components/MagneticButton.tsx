"use client";

import { useRef, useCallback } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: "button" | "a";
  href?: string;
  download?: boolean;
  strength?: number;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className = "",
  style,
  as: Tag = "button",
  href,
  download,
  strength = 0.3,
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  const getEl = () => (Tag === "a" ? anchorRef.current : buttonRef.current);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = getEl();
      if (!el) return;
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (isMobile) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [Tag, strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = getEl();
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  }, [Tag]);

  if (Tag === "a") {
    return (
      <a
        ref={anchorRef}
        className={className}
        style={style}
        href={href}
        download={download}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
