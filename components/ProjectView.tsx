"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { PROJECTS, type Project } from "@/lib/projects";
import Image from "next/image";

// Hilfsfunktionen und Icons
const THUMB_REGEX = /\/thumb\.(jpe?g|png|webp|avif)$/i;
function pickThumb(p: Project) { return p.images.find((src) => THUMB_REGEX.test(src)) ?? p.images[0]; }
function slidesWithoutThumb(p: Project) { const thumb = pickThumb(p); return p.images.filter((src) => src !== thumb); }
function ChevronLeft({ className = "" }: { className?: string }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M15 18l-6-6 6-6" /></svg>; }
function ChevronRight({ className = "" }: { className?: string }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M9 6l6 6-6 6" /></svg>; }
function CloseIcon({ className = "" }: { className?: string }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M6 6l12 12M6 18L18 6" /></svg>; }

export default function ProjectView() {
  const router = useRouter();
  const params = useParams();
  const [index, setIndex] = useState(0);

  const active = useMemo(() => {
    const slug = typeof params.slug === 'string' ? params.slug : '';
    return PROJECTS.find((p) => p.id === slug)
  }, [params.slug]);

  const slides = useMemo(() => (active ? slidesWithoutThumb(active) : []), [active]);

  const close = useCallback(() => router.back(), [router]);
  const next = useCallback(() => { if (!active || slides.length === 0) return; setIndex((i) => (i + 1) % slides.length); }, [active, slides.length]);
  const prev = useCallback(() => { if (!active || slides.length === 0) return; setIndex((i) => (i - 1 + slides.length) % slides.length); }, [active, slides.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, next, prev]);

  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);

  if (!active) { return null; }

  return (
    <motion.div className="fixed left-0 top-0 z-50 w-[100dvw] h-[100dvh] bg-white overscroll-none" exit={{ opacity: 0 }}>
        <div className="absolute inset-0 flex min-h-0 flex-col">
          <div className="flex items-center justify-between p-4 md:p-6 text-black">
            <div className="max-w-[70%]">
              <h3 className="font-jost text-lg md:text-xl leading-tight">{active.title}</h3>
              {active.description && <p className="text-sm md:text-base text-neutral-600 mt-1">{active.description}</p>}
              {active.location && <p className="text-sm md:text-base text-neutral-600 mt-1">{active.location}</p>}
            </div>
            <button onClick={close} className="bg-black rounded-full p-4 hover:opacity-90 transition text-white" aria-label="Close"><CloseIcon className="h-6 w-6" /></button>
          </div>
          <div className="relative flex-1 flex flex-col items-center justify-center bg-white pt-[40px] px-[40px]">
            <div className="relative w-full max-w-[2000px] h-full pb-[60px]">
              <motion.div key={`${active.id}-${index}`} initial={{ opacity: 0.4, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease: "easeOut" }} className="relative w-full h-full select-none cursor-grab active:cursor-grabbing" drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2} dragDirectionLock dragMomentum={false} onPanEnd={(_, info) => { const dx = info.offset.x; const dy = info.offset.y; const vx = info.velocity.x; const vy = info.velocity.y; const passedX = Math.abs(dx) > 60 || Math.abs(vx) > 500; const passedY = Math.abs(dy) > 80 || Math.abs(vy) > 600; if (passedX && Math.abs(dx) > Math.abs(dy)) { if (dx < 0) next(); else prev(); return; } if (passedY && dy > 0) close(); }}>
                <Image src={slides[index]} alt={`${active.title} — image ${index + 1}`} fill className="object-contain bg-white" sizes="100vw" priority draggable={false} />
              </motion.div>
              <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[10px] z-10 hidden md:flex gap-4">
                <button onClick={prev} className="pointer-events-auto bg-black rounded-full p-2 hover:opacity-90 transition text-white" aria-label="Previous image"><ChevronLeft className="h-5 w-5" /></button>
                <button onClick={next} className="pointer-events-auto bg-black rounded-full p-2 hover:opacity-90 transition text-white" aria-label="Next image"><ChevronRight className="h-5 w-5" /></button>
              </div>
            </div>
          </div>
          <div className="px-4 md:px-10 pb-5 md:pb-8 bg-white">
            <div className="mx-auto max-w-6xl">
              <div className="flex gap-3 overflow-x-auto justify-center">
                {slides.map((src, i) => (
                  <button key={src + i} onClick={() => setIndex(i)} className={`relative aspect-square h-16 md:h-20 shrink-0 overflow-hidden ring-1 transition ${i === index ? "ring-black" : "ring-neutral-300 hover:ring-neutral-500"}`} aria-label={`View image ${i + 1}`}>
                    <div className="absolute inset-0"><Image src={src} alt="" fill sizes="10vw" className="object-cover" /></div>
                    {i === index && <span className="absolute inset-0 ring-2 ring-black pointer-events-none" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
    </motion.div>
  );
}