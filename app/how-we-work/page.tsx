"use client";
// NEU: useCallback importieren
import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

function CloseIcon({ className = "" }: { className?: string }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M6 6l12 12M6 18L18 6" /></svg>; }

export default function HowWeWorkSheet() {
    const router = useRouter();
    
    // NEU: 'close' wird mit useCallback stabilisiert
    const close = useCallback(() => {
        router.back();
    }, [router]);

    useEffect(() => { 
        const onKey = (e: KeyboardEvent) => { 
            if (e.key === 'Escape') close(); 
        }; 
        window.addEventListener('keydown', onKey); 
        return () => window.removeEventListener('keydown', onKey); 
    // NEU: 'close' wird hier als Abhängigkeit hinzugefügt
    }, [close]);

    useEffect(() => { 
        document.body.style.overflow = "hidden"; 
        return () => { document.body.style.overflow = ""; }; 
    }, []);

    return (
        <motion.div key="how-we-work-overlay" className="fixed inset-0 z-50 bg-white" exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Wie wir arbeiten">
            <div className="absolute inset-0" onClick={close} />
            <div className="relative h-full overflow-y-auto">
                <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-neutral-200">
                    <div className="max-w-[2000px] mx-auto px-[40px] py-4 flex items-center justify-between">
                        <div className="flex items-baseline gap-2"><span className="font-jost text-lg text-neutral-800">Arbeitsweise</span><span className="font-jost text-lg text-neutral-400">How we work</span></div>
                        <button onClick={close} className="bg-black rounded-full p-3 text-white hover:opacity-90 transition" aria-label="Close How we work"><CloseIcon className="h-5 w-5" /></button>
                    </div>
                </div>
                <div className="max-w-[2000px] mx-auto px-[40px] py-10 md:py-16">
                    <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                            <div className="relative aspect-[3.3/4] w-full max-w-sm mx-auto overflow-hidden bg-neutral-100"><Image src="/how-we-work/step1.gif" alt="Konzept und Referenzen" fill className="object-cover" sizes="(min-width: 1024px) 33vw, 80vw" /></div>
                            <div>
                                <h3 className="font-jost text-2xl md:text-3xl mb-4">
                                    <span className="text-neutral-400">01 —</span>
                                    <span className="text-neutral-800"> Konzept & Referenzen</span>
                                </h3>
                                <p className="text-neutral-800 leading-relaxed text-justify">Alles beginnt mit Ihrer Vision. Sie teilen uns Ihre Ideen, Pläne, Skizzen und Referenzbilder mit. In dieser Phase ist es unser Ziel, Ihre ästhetischen Vorstellungen und die funktionalen Anforderungen des Projekts vollständig zu verstehen, um eine solide Basis für die Visualisierung zu schaffen.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto ring-1 ring-neutral-200 overflow-hidden bg-neutral-100 lg:order-last"><Image src="/how-we-work/step2.jpg" alt="3D-Modellierung" fill className="object-cover" sizes="(min-width: 1024px) 33vw, 80vw" /></div>
                            <div>
                                <h3 className="font-jost text-2xl md:text-3xl mb-4">
                                    <span className="text-neutral-400">02 —</span>
                                    <span className="text-neutral-800"> 3D-Modellierung</span>
                                </h3>
                                <p className="text-neutral-800 leading-relaxed text-justify">Basierend auf den gesammelten Informationen erstellen wir ein detailliertes 3D-Modell der Architektur und der Umgebung. Wir legen dabei höchsten Wert auf präzise Proportionen und saubere Geometrien. Sie erhalten erste Vorschau-Renderings in Rohform (&quot;Clay Renders&quot;), um Kameraperspektiven und den Bildausschnitt final festzulegen.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto ring-1 ring-neutral-200 overflow-hidden bg-neutral-100"><Image src="/how-we-work/step3.jpg" alt="Materialien und Licht" fill className="object-cover" sizes="(min-width: 1024px) 33vw, 80vw" /></div>
                            <div>
                                <h3 className="font-jost text-2xl md:text-3xl mb-4">
                                    <span className="text-neutral-400">03 —</span>
                                    <span className="text-neutral-800"> Materialien & Licht</span>
                                </h3>
                                <p className="text-neutral-800 leading-relaxed text-justify">Jetzt hauchen wir dem Modell Leben ein. Wir definieren Oberflächen mit fotorealistischen Materialien und setzen eine stimmungsvolle Lichtsituation um, die die gewünschte Atmosphäre erzeugt – sei es das warme Licht eines Sommertages oder die dramatische Beleuchtung der Dämmerung.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto ring-1 ring-neutral-200 overflow-hidden bg-neutral-100 lg:order-last"><Image src="/how-we-work/step4.jpg" alt="Finales Rendering und Post-Production" fill className="object-cover" sizes="(min-width: 1024px) 33vw, 80vw" /></div>
                            <div>
                                <h3 className="font-jost text-2xl md:text-3xl mb-4">
                                    <span className="text-neutral-400">04 —</span>
                                    <span className="text-neutral-800"> Finale & Post-Production</span>
                                </h3>
                                <p className="text-neutral-800 leading-relaxed text-justify">Nach Ihrer Freigabe rendern wir das Bild in hoher Auflösung. In der abschließenden Post-Production verfeinern wir Farben, Kontraste und Details, um die visuelle Wirkung zu maximieren und ein überzeugendes, emotional ansprechendes Endergebnis zu liefern, das Ihr Projekt perfekt in Szene setzt.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}