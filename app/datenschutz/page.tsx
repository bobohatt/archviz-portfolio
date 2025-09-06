"use client";
// NEU: useCallback importieren
import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function CloseIcon({ className = "" }: { className?: string }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M6 6l12 12M6 18L18 6" /></svg>; }

export default function DatenschutzSheet() {
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
        <motion.div key="datenschutz-overlay" className="fixed inset-0 z-50 bg-white" exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Datenschutzerklärung">
            <div className="absolute inset-0" onClick={close} />
            <div className="relative h-full overflow-y-auto">
                <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-neutral-200">
                    <div className="max-w-[2000px] mx-auto px-[40px] py-4 flex items-center justify-between">
                        <h4 className="font-jost text-lg text-neutral-800">Datenschutzerklärung</h4>
                        <button onClick={close} className="bg-black rounded-full p-3 text-white hover:opacity-90 transition" aria-label="Close Datenschutz"><CloseIcon className="h-5 w-5" /></button>
                    </div>
                </div>
                <div className="max-w-[2000px] mx-auto px-[40px] py-10 md:py-16 text-neutral-700 space-y-6">
                    <p><strong>1. Verantwortlicher</strong><br />Kaan Özden, Messerstraße 31, 42657 Solingen, Deutschland<br />E‑Mail: hallo@waarchi.de</p>
                    <p><strong>2. Server‑Logfiles beim Besuch der Website</strong><br />Beim Aufruf der Website werden automatisch folgende Daten verarbeitet: IP‑Adresse, Datum/Uhrzeit, aufgerufene URL, Referrer‑URL, Browser/OS, Provider. Verarbeitung zur technischen Bereitstellung (Art. 6 Abs. 1 lit. f DSGVO). Löschung nach Server‑Standard (z. B. 7–30 Tage).</p>
                    <p><strong>3. Kontaktaufnahme per E‑Mail</strong><br />Bei Kontakt verarbeiten wir Ihre Angaben zur Beantwortung (Art. 6 Abs. 1 lit. b DSGVO). Speicherung, solange es zur Abwicklung/Beweisführung erforderlich ist.</p>
                    <p><strong>4. Cookies / Tracking</strong><br />Es werden derzeit keine Cookies gesetzt, die eine Einwilligung erfordern, und keine externen Tracking‑Tools eingesetzt. Bei künftigem Einsatz holen wir eine Einwilligung ein (Art. 6 Abs. 1 lit. a DSGVO).</p>
                    <p><strong>5. Empfänger / Auftragsverarbeiter</strong><br />Eine Weitergabe erfolgt nur, soweit dies gesetzlich zulässig ist (Art. 6 Abs. 1 lit. a, b, c, f DSGVO). Sofern Hosting‑Dienstleister eingesetzt werden, erfolgt dies im Rahmen einer Auftragsverarbeitung nach Art. 28 DSGVO.</p>
                    <p><strong>6. Drittlandübermittlung</strong><br />Eine Übermittlung in Drittländer findet nicht statt bzw. nur mit geeigneten Garantien (Art. 44 ff. DSGVO). (Anpassen, falls z. B. US‑Dienste genutzt werden.)</p>
                    <p><strong>7. Speicherdauer</strong><br />Wir verarbeiten personenbezogene Daten nur so lange, wie es für die jeweiligen Zwecke erforderlich ist bzw. gesetzliche Aufbewahrungspflichten bestehen.</p>
                    <p><strong>8. Ihre Rechte</strong><br />Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20), Widerspruch (Art. 21), Widerruf erteilter Einwilligungen (Art. 7 Abs. 3), Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO).</p>
                    <p><strong>9. Datensicherheit</strong><br />TLS/SSL‑Verschlüsselung; technische und organisatorische Maßnahmen nach Art. 32 DSGVO.</p>
                    <p><strong>10. Aktualität</strong><br />Stand: August 2025. Änderungen dieser Erklärung bleiben vorbehalten.</p>
                </div>
            </div>
        </motion.div>
    );
}