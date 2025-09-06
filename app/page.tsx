"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

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

  // Ein kurzer Delay, damit die Animation nicht zu abrupt ist
  useEffect(() => {
    const t = setTimeout(() => setMinDelayDone(true), 300);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    // Nach der Ausblendanimation zur neuen Seite navigieren
    setTimeout(() => {
      router.push('/home');
    }, 400); // Dauer der Exit-Animation
  };
  
  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
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
            transition={{ duration: 0.35, ease: "easeOut" }}
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
            transition={{ duration: 0.35, ease: "easeOut" }}
            aria-label="Enter site"
          >
            <div className="absolute inset-0 -z-10">
              <Image src="/frontpage.jpg" alt="" fill priority sizes="100vw" className="object-cover" onLoad={() => setHeroLoaded(true)} />
            </div>
            <div className="absolute inset-0 bg-black/20 -z-10" />
            <div className="text-center space-y-4 px-6 text-white drop-shadow">
              <Image src="/logow.png" alt="WaArchi" width={500} height={150} className="mx-auto h-28 w-auto pointer-events-none" priority />
              <p className="font-jost text-xl tracking-wide opacity-100 pointer-events-none">WaArchi Studio</p>
              <div className="mx-auto mt-30" onClick={handleEnter}>
                <EntryHoverInvert src="/entry.png" alt="Enter" size={150} durationMs={500} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}