"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M6 6l12 12M6 18L18 6" />
    </svg>
  );
}

export default function ImpressumPage() {
  const router = useRouter();

  const close = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    // Body-Scroll sperren, solange Overlay offen ist
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      key="impressum-overlay"
      className="fixed inset-0 z-50 bg-white"
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Impressum"
    >
      {/* Klick auf den Hintergrund schließt */}
      <div className="absolute inset-0" onClick={close} />

      <div className="relative h-full overflow-y-auto">
        {/* Top-Banner wie bei Datenschutz */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-neutral-200">
          <div className="max-w-[2000px] mx-auto px-[40px] py-4 flex items-center justify-between">
            <h4 className="font-jost text-lg text-neutral-800">Impressum</h4>
            <button
              onClick={close}
              className="bg-black rounded-full p-3 text-white hover:opacity-90 transition"
              aria-label="Close Impressum"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Inhalt (identisch strukturiert, nur Text vom bisherigen Impressum) */}
        <div className="max-w-[2000px] mx-auto px-[40px] py-10 md:py-16 text-neutral-700 space-y-6">
          <section className="space-y-4">
            <p><strong>Angaben gemäß § 5 TMG</strong></p>
            <p>
              <strong>Kaan Özden</strong><br />
              Messerstraße 31<br />
              42657 Solingen<br />
              Deutschland
            </p>

            <p>
              <strong>Kontakt:</strong><br />
              E-Mail: <a href="mailto:hallo@waarchi.de" className="underline">hallo@waarchi.de</a>
            </p>

            <p>
              <strong>Vertretungsberechtigt:</strong><br />
              Kaan Özden
            </p>

            <p>
              <strong>Umsatzsteuer-ID gemäß § 27a UStG:</strong><br />
              128/5451/5573
            </p>

            <p>
              <strong>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:</strong><br />
              Kaan Özden, Adresse wie oben
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-jost text-xl text-neutral-800">Haftung für Inhalte &amp; Links</h2>
            <p>
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für externe Links. 
              Für den Inhalt verlinkter Seiten sind ausschließlich deren Betreiber verantwortlich.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-jost text-xl text-neutral-800">Hosted on Vercel.</h2>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
