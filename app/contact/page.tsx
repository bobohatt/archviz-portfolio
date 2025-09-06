// app/(.)contact/page.tsx

"use client";
// NEU: useCallback importieren
import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

function CloseIcon({ className = "" }: { className?: string }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M6 6l12 12M6 18L18 6" /></svg>; }

export default function ContactSheet() {
    const router = useRouter();
    
    // NEU: 'close' wird mit useCallback stabilisiert
    const close = useCallback(() => {
        router.back();
    }, [router]);

    // Schließen per Escape-Taste
    useEffect(() => { 
        const onKey = (e: KeyboardEvent) => { 
            if (e.key === 'Escape') close(); 
        }; 
        window.addEventListener('keydown', onKey); 
        return () => window.removeEventListener('keydown', onKey); 
    // NEU: 'close' wird hier als Abhängigkeit hinzugefügt
    }, [close]); 
    
    // Scroll-Lock für den Body hinzufügen, passend zum neuen Vollbild-Stil
    useEffect(() => { 
        document.body.style.overflow = "hidden"; 
        return () => { document.body.style.overflow = ""; }; 
    }, []);

    return (
        <motion.div key="contact-overlay" className="fixed inset-0 z-50 bg-white" exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Kontakt">
            {/* Klickbarer Hintergrund zum Schließen */}
            <div className="absolute inset-0" onClick={close} />

            <div className="relative h-full overflow-y-auto">
                {/* Sticky Header */}
                <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-neutral-200">
                    <div className="max-w-[2000px] mx-auto px-[40px] py-4 flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                            <span className="font-jost text-lg text-neutral-800">Kontakt</span>
                            <span className="font-jost text-lg text-neutral-400">Contact</span>
                        </div>
                        <button onClick={close} className="bg-black rounded-full p-3 text-white hover:opacity-90 transition" aria-label="Close Contact"><CloseIcon className="h-5 w-5" /></button>
                    </div>
                </div>

                {/* Inhaltsbereich */}
                <div className="max-w-[2000px] mx-auto px-[40px] py-10 md:py-16">
                    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        
                        {/* Bild-Spalte */}
                        <div className="relative aspect-[1/1] w-full max-w-l mx-auto overflow-hidden bg-neutral-100">
                            <Image 
                                src="/contact/logogif2.gif" 
                                alt="Kontakt Platzhalter" 
                                fill 
                                className="object-cover" 
                                sizes="(min-width: 1024px) 33vw, 80vw"
                                unoptimized // Wichtig für GIFs
                            />
                        </div>

                        {/* Text-Spalte */}
                        <div className="space-y-4 text-neutral-800">
                            <p>
                                Wir sind bereit für neue Ideen und spannende Zusammenarbeit. Schreiben Sie uns einfach unter:
                            </p>
                            <p className="text-neutral-500">
                                We are ready for new ideas and exciting collaborations. Just reach out to us at:
                            </p>
                            <p className="text-black underline underline-offset-4 text-lg">
                                <a href="mailto:hallo@waarchi.de">hallo@waarchi.de</a>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </motion.div>
    );
}