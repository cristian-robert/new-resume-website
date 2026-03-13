"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed right-6 bottom-6 z-50 h-10 w-10 rounded-full border-teal-700/30 bg-white/90 backdrop-blur transition-all duration-300 hover:border-teal-700 hover:bg-teal-700/10 cursor-pointer"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-4 w-4 text-teal-700" />
    </Button>
  );
}
