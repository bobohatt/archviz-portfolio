"use client";
import { useEffect, useCallback } from "react"; // Korrekte Imports
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

function CloseIcon({ className = "" }: { className?: string }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M6 6l12 12M6 18L18 6" /></svg>; }

export default function AboutSheet() {
  const router = useRouter();
  
  const close = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => { 
    const onKey = (e: KeyboardEvent) => { 
      if (e.key === 'Escape') close(); 
    }; 
    window.addEventListener('keydown', onKey); 
    return () => window.removeEventListener('keydown', onKey); 
  }, [close]); // 'close' hier hinzugefügt

  useEffect(() => { 
    document.body.style.overflow = "hidden"; 
    return () => { document.body.style.overflow = ""; }; 
  }, []);

  return (
    <motion.div key="about-overlay" className="fixed inset-0 z-50 bg-white" exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="About WaArchi">
      <div className="absolute inset-0" onClick={close} />
      <div className="relative h-full overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-neutral-200">
          <div className="max-w-[2000px] mx-auto px-[40px] py-4 flex items-center justify-between">
            <div className="flex items-baseline gap-2"><span className="font-jost text-lg text-neutral-800">Über uns</span><span className="font-jost text-lg text-neutral-400">About us</span></div>
            <button onClick={close} className="bg-black rounded-full p-3 text-white hover:opacity-90 transition" aria-label="Close About"><CloseIcon className="h-5 w-5" /></button>
          </div>
        </div>
        <div className="max-w-[2000px] mx-auto px-[40px] py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="relative aspect-[1.6/3] w-64 sm:w-72 md:w-80 lg:w-96 shrink-0 overflow-hidden bg-neutral-100">
                <Image src="/about/flymehammed.gif" alt="Portrait" fill className="object-cover" unoptimized />
              </div>
              <div className="max-w-prose">
                <h2 className="font-jost text-2xl md:text-3xl mb-4 text-neutral-800">Über uns.</h2>
                <p className="mb-7 text-neutral-800 leading-relaxed text-justify">Wir sind zwei Architekturstudenten, die ihre Begeisterung für Gestaltung und Visualisierung zu einem klaren Schwerpunkt entwickelt haben. Durch unser Studium verfügen wir über fundiertes architektonisches Verständnis, das wir mit einem hohen Anspruch an Ästhetik und Präzision in unsere Arbeit einfließen lassen. Unser Ziel ist es, die Charakteristik und Qualität jedes Projekts herauszuarbeiten und visuell eindrucksvoll zu vermitteln. Mit einem künstlerischen Blick, technischer Kompetenz und einem Gespür für Atmosphäre entstehen Visualisierungen, die Architektur nicht nur abbilden, sondern erlebbar machen.</p>
                <p className=" mb-6 text-neutral-800 leading-relaxed text-justify">In unserem Workflow nutzen wir Blender + Cycles für Modellierung, Texturierung und Rendern, um besonders realistische und detailreiche Ergebnisse zu erzielen. Die Nachbearbeitung erfolgt mit Programmen der Adobe Creative Cloud, wodurch wir die Visualisierungen präzise verfeinern, ihre Wirkung optimieren und eine überzeugende finale Präsentation sicherstellen.</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:flex-row-reverse lg:text-right">
              <div className="relative aspect-[1.6/3] w-64 sm:w-72 md:w-80 lg:w-96 shrink-0 overflow-hidden bg-neutral-100">
                <Image src="/about/flymekaan.gif" alt="Portrait" fill className="object-cover" unoptimized />
              </div>
              <div className="max-w-prose lg:text-left">
                <h3 className="font-jost text-xl md:text-3xl mb-4 text-neutral-400">About us.</h3>
                <p className="mb-27 text-neutral-400 leading-relaxed text-justify">We are two architecture students who have turned our passion for design and visualization into a clear focus. Through our studies, we bring solid architectural knowledge combined with a strong commitment to aesthetics and precision. Our goal is to highlight the unique character and quality of each project and present it in a visually compelling way. With an artistic eye, technical expertise, and a sense for atmosphere, we create visualizations that do more than just depict architecture.</p>
                <p className="text-neutral-400 leading-relaxed text-justify">In our workflow, we employ Blender + Cycles for modeling, texturing, and rendering to produce highly realistic and detailed results. Post-production is carried out using the Programms of the Adobe Creative Cloud, enabling us to fine-tune the imagery, optimize visual impact, and ensure a polished final presentation.</p>
              </div>
            </div>
          </div>
          <div className="mt-14 flex flex-wrap gap-4">
            <a href="mailto:hallo@waarchi.de" className="px-5 py-3 bg-black text-white rounded-full hover:opacity-90 transition">contact us</a>
            <Link href="/home" onClick={close} scroll={false} className="px-5 py-3 rounded-full ring-1 ring-neutral-800 hover:ring-neutral-800 transition text-neutral-800">view work</Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}