"use client";

import {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { type Project } from "@/lib/projects";

// Helpers & Icons
const THUMB_REGEX = /\/thumb\.(jpe?g|png|webp|avif)$/i;

function pickThumb(p: Project) {
  return p.images.find((src) => THUMB_REGEX.test(src)) ?? p.images[0];
}
function slidesWithoutThumb(p: Project) {
  const thumb = pickThumb(p);
  return p.images.filter((src) => src !== thumb);
}

function ChevronLeft({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
function ChevronRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
function HomeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  );
}

export default function ProjectClientView({ project }: { project: Project }) {
  const router = useRouter();

  // Bild-Navigation
  const [index, setIndex] = useState(0);
  const slides = useMemo(() => slidesWithoutThumb(project), [project]);

  const goHome = useCallback(() => router.push("/home"), [router]);
  const next = useCallback(() => {
    if (!project || slides.length === 0) return;
    setIndex((i) => (i + 1) % slides.length);
  }, [project, slides.length]);
  const prev = useCallback(() => {
    if (!project || slides.length === 0) return;
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }, [project, slides.length]);

  // Keyboard-Shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") goHome();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goHome, next, prev]);

  // Top-Bar und Bottom-Bar messen
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const bottomBarRef = useRef<HTMLDivElement | null>(null);
  const [topBarH, setTopBarH] = useState(0);
  const [bottomBarH, setBottomBarH] = useState(0);

  useLayoutEffect(() => {
    function observe(el: HTMLDivElement | null, cb: (h: number) => void) {
      if (!el) return () => {};
      const ro = new ResizeObserver((entries) => {
        const box = entries[0]?.contentRect;
        if (box) cb(Math.ceil(box.height));
      });
      ro.observe(el);

      const sync = () => cb(Math.ceil(el.getBoundingClientRect().height));
      window.addEventListener("resize", sync);
      window.addEventListener("orientationchange", sync);
      sync();

      return () => {
        ro.disconnect();
        window.removeEventListener("resize", sync);
        window.removeEventListener("orientationchange", sync);
      };
    }

    const cleanupTop = observe(topBarRef.current, setTopBarH);
    const cleanupBottom = observe(bottomBarRef.current, setBottomBarH);
    return () => {
      cleanupTop();
      cleanupBottom();
    };
  }, []);

  if (!project) return null;

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* =============== MOBILE LAYOUT =============== */}
      <div className="md:hidden">
        {/* Bild exakt zwischen Top- und Bottom-Bar (mit 20px Luft über Bottom-Bar) */}
        <div
          className="fixed left-0 right-0 z-10 bg-white"
          style={{ top: topBarH, bottom: bottomBarH + 20 }}
        >
          <Image
            key={slides[index]}
            src={slides[index]}
            alt={`${project.title} image ${index + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        {/* Top-Bar */}
        <div ref={topBarRef} className="fixed top-0 left-0 right-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="max-w-[75%]">
              <h3 className="font-jost text-base leading-tight text-black">
                {project.title}
              </h3>
              {project.description && (
                <p className="text-[13px] text-neutral-700 mt-0.5">
                  {project.description}
                </p>
              )}
              {project.location && (
                <p className="text-[13px] text-neutral-600">{project.location}</p>
              )}
            </div>

            {/* Runder Home-Button */}
            <Link
              href="/home"
              className="grid h-11 w-11 place-items-center rounded-full bg-black text-white hover:opacity-90 transition"
              aria-label="Zur Übersicht"
            >
              <HomeIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Bottom Controls (zentrierte Thumbs) */}
        <div
          ref={bottomBarRef}
          className="fixed left-0 right-0 z-30"
          style={{ bottom: 20 }}
        >
          <div className="mx-auto max-w-[2000px] px-3 pb-[env(safe-area-inset-bottom)]">
            <div className="bg-white/85 backdrop-blur p-2">
              <div className="flex items-center gap-2">
                {/* Runder Prev */}
                <button
                  onClick={prev}
                  className="grid h-9 w-9 place-items-center rounded-full bg-black text-white hover:opacity-90 transition shrink-0"
                  aria-label="Vorheriges Bild"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Zentrierte Thumbnails:
                    - Wrapper: flex-1 min-w-0
                    - Scroller: w-full overflow-x-auto
                    - Inhalt: w-max + mx-auto -> zentriert, wenn schmaler als w-full
                */}
                <div className="flex-1 min-w-0">
                  <div className="w-full overflow-x-auto no-scrollbar">
                    <div className="mx-auto w-max flex gap-2">
                      {slides.map((src, i) => (
                        <button
                          key={src + i}
                          onClick={() => setIndex(i)}
                          className={`relative aspect-square h-12 shrink-0 overflow-hidden ring-1 transition ${
                            i === index
                              ? "ring-black"
                              : "ring-neutral-300 hover:ring-neutral-500"
                          }`}
                          aria-label={`Bild ${i + 1}`}
                        >
                          <Image
                            src={src}
                            alt=""
                            fill
                            sizes="20vw"
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Runder Next */}
                <button
                  onClick={next}
                  className="grid h-9 w-9 place-items-center rounded-full bg-black text-white hover:opacity-80 transition shrink-0"
                  aria-label="Nächstes Bild"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =============== DESKTOP LAYOUT =============== */}
      <div className="hidden md:block">
        <div className="min-h-screen bg-white">
          {/* Top-Bar */}
          <div
            ref={topBarRef}
            className="sticky top-0 z-20 flex items-center justify-between p-6 text-black"
          >
            <div className="max-w-[70%]">
              <h3 className="font-jost text-xl leading-tight">{project.title}</h3>
              {project.description && (
                <p className="text-base text-neutral-600 mt-1">
                  {project.description}
                </p>
              )}
              {project.location && (
                <p className="text-base text-neutral-600 mt-1">
                  {project.location}
                </p>
              )}
            </div>

            {/* Runder Home-Button (Desktop) */}
            <Link
              href="/home"
              className="grid h-12 w-12 place-items-center rounded-full bg-black text-white hover:opacity-70 transition"
              aria-label="Back to home"
            >
              <HomeIcon className="h-6 w-6" />
            </Link>
          </div>

          {/* Fixiertes Bildfenster zwischen Top-Bar und Thumbnails */}
          <div
            className="fixed left-0 right-0 z-10 bg-white"
            style={{ top: topBarH + 30, bottom: bottomBarH + 20 }}
          >
            <div className="relative mx-auto w-full max-w-[2000px] h-full px-8">
              <Image
                src={slides[index]}
                alt={`${project.title} image ${index + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>

        {/* Bottom Controls (zentrierte Thumbs, Pfeile nah dran) */}
        <div
          ref={bottomBarRef}
          className="fixed left-0 right-0 z-30"
          style={{ bottom: 20 }}
        >
          <div className="mx-auto max-w-[2000px] px-6">
            <div className="bg-white/85 backdrop-blur p-3">
              {/* zentrierter, kompakter Inline-Cluster */}
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-3 max-w-full">
                  {/* Runder Prev */}
                  <button
                    onClick={prev}
                    className="grid h-10 w-10 place-items-center rounded-full bg-black text-white hover:opacity-70 transition"
                    aria-label="Vorheriges Bild"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  {/* Scroller: schrumpft auf Inhalt, bleibt aber capped und zentriert */}
                  <div className="overflow-x-auto no-scrollbar max-w-[70vw]">
                    <div className="mx-auto w-max flex gap-3">
                      {slides.map((src, i) => (
                        <button
                          key={src + i}
                          onClick={() => setIndex(i)}
                          className={`relative aspect-square h-12 shrink-0 overflow-hidden  transition ${
                            i === index ? "outline outline-2 outline-black" : "hover:outline hover:outline-1 hover:outline-neutral-400"
                          }`}
                          aria-label={`Bild ${i + 1}`}
                        >
                          <Image
                            src={src}
                            alt=""
                            fill
                            sizes="10vw"
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Runder Next */}
                  <button
                    onClick={next}
                    className="grid h-10 w-10 place-items-center rounded-full bg-black text-white hover:opacity-90 transition"
                    aria-label="Nächstes Bild"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

          {/* Ende Desktop */}
        </div>
      </div>
    </motion.main>
  );
}
