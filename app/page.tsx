"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const EXIT_DURATION = 350; // ms - matches the motion.div exit transition

function EntryHoverInvert({
  src,
  alt,
  size = 150,
  durationMs = 500,
  easing = "cubic-bezier(0.22, 1, 0.36, 1)",
}: {
  src: string;
  alt: string;
  size?: number;
  durationMs?: number;
  easing?: string;
}) {
  return (
    <span
      className="relative inline-block group align-middle"
      style={{ width: size, height: size }}
      aria-label={alt}
    >
      <Image src={src} alt={alt} fill sizes="10vw" className="absolute inset-0 object-contain select-none pointer-events-none" priority draggable={false} />
      <Image src={src} alt="" fill sizes="10vw" className="absolute inset-0 object-contain select-none pointer-events-none invert opacity-0 group-hover:opacity-100" style={{ transition: `opacity ${durationMs}ms ${easing}` }} draggable={false} aria-hidden />
    </span>
  );
}

export default function EntryPage() {
  const router = useRouter();
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [minDelayDone, setMinDelayDone] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Short delay so the animation isn't too abrupt
  useEffect(() => {
    const t = setTimeout(() => setMinDelayDone(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Clean up exit timeout on unmount
  useEffect(() => {
    return () => {
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
      }
    };
  }, []);

  const handleEnter = () => {
    if (isExiting) return; // Prevent double-clicks
    setIsExiting(true);
    exitTimeoutRef.current = setTimeout(() => {
      router.push('/home');
    }, EXIT_DURATION);
  };

  // Body scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const curtainVisible = !(heroLoaded && minDelayDone);

  return (
    <main>
      <AnimatePresence>
        {curtainVisible && !isExiting && (
          <motion.div
            key="curtain"
            className="fixed inset-0 z-[200] bg-white"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: EXIT_DURATION / 1000, ease: "easeOut" }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {!isExiting && (
           <motion.div
            key="gate"
            className="fixed left-0 top-0 z-[150] w-[100dvw] h-[100dvh] overscroll-none flex items-center justify-center cursor-pointer select-none bg-black/0"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: EXIT_DURATION / 1000, ease: "easeOut" }}
            aria-label="Enter site"
          >
            <div className="absolute inset-0 -z-10">
              <Image src="/frontpage.jpg" alt="" fill priority sizes="100vw" className="object-cover" onLoad={() => setHeroLoaded(true)} />
            </div>
            <div className="absolute inset-0 bg-black/20 -z-10" />
            <div className="text-center space-y-4 px-6 text-white drop-shadow">
              <Image src="/logow.png" alt="WaArchi" width={500} height={150} className="mx-auto h-28 w-auto pointer-events-none" priority />
              <p className="font-jost text-xl tracking-wide opacity-100 pointer-events-none">WaArchi Studio</p>
              <button
                className="mx-auto mt-30 bg-transparent border-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/20 rounded-full"
                onClick={handleEnter}
                aria-label="Enter website"
              >
                <EntryHoverInvert src="/entry.png" alt="Enter" size={150} durationMs={500} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}