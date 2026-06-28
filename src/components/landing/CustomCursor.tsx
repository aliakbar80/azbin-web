"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    window.addEventListener("mousemove", handleMouseMove);

    let rafId: number;
    const raf = () => {
      gsap.to(cursor, {
        x: mousePos.current.x,
        y: mousePos.current.y,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(dot, {
        x: mousePos.current.x,
        y: mousePos.current.y,
        duration: 0.1,
        ease: "none",
      });
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    const attach = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    };
    attach();

    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [handleMouseMove]);

  useEffect(() => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      scale: isHovering ? 1.8 : 1,
      background: isHovering ? "rgba(212,168,67,0.2)" : "rgba(255,255,255,0.05)",
      border: isHovering
        ? "1px solid rgba(212,168,67,0.5)"
        : "1px solid rgba(255,255,255,0.15)",
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isHovering]);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference hidden md:block"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.15)",
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none hidden md:block"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#D4A843",
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      />
    </>
  );
}
