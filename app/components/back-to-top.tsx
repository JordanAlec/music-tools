"use client";

import { useSyncExternalStore } from "react";

const VISIBLE_AFTER_PX = 400;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function scrollToTop() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
}

export default function BackToTop() {
  const isVisible = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > VISIBLE_AFTER_PX,
    () => false,
  );

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      inert={!isVisible}
      className={`fixed right-4 bottom-4 flex size-11 items-center justify-center rounded-full border border-neutral-300 bg-white text-lg shadow-md transition-opacity hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 sm:right-6 sm:bottom-6 hover:cursor-pointer dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <span aria-hidden>↑</span>
    </button>
  );
}
