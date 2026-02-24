// app/home/page.tsx

"use client";
import { useEffect, useRef, useState } from "react";
import { PROJECTS, type Project } from "@/lib/projects";
import Link from "next/link";
import Image from "next/image";

const THUMB_REGEX = /\/thumb\.(jpe?g|png|webp|avif)$/i;

function pickThumb(p: Project) {
  return p.images.find((src) => THUMB_REGEX.test(src)) ?? p.images[0];
}

export default function HomePage() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function setHeaderVar() {
      const h = headerRef.current?.offsetHeight ?? 0;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    }

    function onScroll() {
      setIsScrolled(window.scrollY > 10);
    }

    setHeaderVar();
    onScroll();

    window.addEventListener("resize", setHeaderVar);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", setHeaderVar);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <main className="min-h-screen bg-white text-neutral-900 selection:bg-black selection:text-white">
      <header
        ref={headerRef}
        className={`sticky top-0 z-30 border-b transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-neutral-300 py-[6px] shadow-[0_2px_14px_rgba(0,0,0,0.05)]"
            : "bg-white border-neutral-200 py-[15px]"
        }`}
      >
        <div className={`px-[16px] md:px-[40px] max-w-[2000px] mx-auto flex items-center justify-between gap-3 transition-all duration-300 ${isScrolled ? "md:gap-5" : "md:gap-3"}`}>
          <Link href="/home" className="relative flex items-center shrink-0 h-12 md:h-14 min-w-[144px]" aria-label="WaArchi Home">
            <Image
              src="/logo.png"
              alt="WaArchi Logo"
              width={144}
              height={48}
              className={`absolute left-0 w-auto shrink-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isScrolled
                  ? "h-7 md:h-8 opacity-0 -translate-y-0.5"
                  : "h-10 md:h-12 opacity-100 translate-y-0"
              }`}
              priority
            />

            <span
              aria-hidden
              className={`absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-[6px] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isScrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-0.5"
              }`}
            >
              <span className="h-[6px] md:h-[7px] w-[34px] bg-black" />
              <span className="h-[6px] md:h-[7px] w-[18px] bg-black" />
              <span className="h-[6px] md:h-[7px] w-[22px] bg-black" />
              <span className="h-[6px] md:h-[7px] w-[16px] bg-black" />
              <span className="h-[6px] md:h-[7px] w-[28px] bg-black" />
            </span>
          </Link>
          <nav className={`flex items-center gap-3 overflow-x-auto overscroll-x-contain max-w-[70%] md:max-w-none md:overflow-visible md:gap-6 transition-all duration-300 ${isScrolled ? "text-[11px] md:text-[13px] tracking-[0.03em]" : "text-xs md:text-sm"}`}>
            <Link href="/about" className="hover:opacity-60 transition-opacity shrink-0">über uns</Link>
            <Link href="/how-we-work" className="hover:opacity-60 transition-opacity shrink-0">arbeitsweise</Link>
            <Link href="/contact" className="hover:opacity-60 transition-opacity shrink-0">kontakt</Link>
            <Link href="/impressum" className="hover:opacity-60 transition-opacity shrink-0">impressum</Link>
            <Link href="/datenschutz" className="hover:opacity-60 transition-opacity shrink-0">datenschutz</Link>
          </nav>
        </div>
      </header>


    <section id="work" className="px-[40px] max-w-[2000px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px] relative">
            {PROJECTS.map((p) => (
                <div key={p.id} className="relative">
                {/* Das Link-Tag umschließt jetzt nur noch das Div */}
                <Link href={`/work/${p.id}`} scroll={false} className="group block cursor-up-arrow" aria-label={`Open project ${p.title}`}>
                    {/* Dieses Div ist NEU und übernimmt das Styling */}
                    <div className="relative aspect-square w-full overflow-hidden ring-1 ring-neutral-200 bg-neutral-100">
                    <Image 
                        src={pickThumb(p)} 
                        alt={p.title} 
                        fill 
                        sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" 
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" 
                    />
                    </div>
                </Link>
                <span className="absolute -bottom-5 left-0 font-jost text-xs md:text-sm text-neutral-600 leading-none truncate w-full pb-[2px]">{p.title}</span>
                </div>
            ))}
            </div>
        </section>

      <footer className="mt-24 border-t border-neutral-200">
          <div className="px-[16px] md:px-[40px] max-w-[2000px] mx-auto py-8 md:py-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex flex-col gap-2">
                <p className="font-jost text-sm text-neutral-800">WaArchi Studio</p>
                <p className="text-sm text-neutral-500">Architekturvisualisierung</p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <a
                  href="mailto:hallo@waarchi.de"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  hallo@waarchi.de
                </a>
                <a
                  href="https://www.instagram.com/waarchi_studio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-2"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @waarchi_studio
                </a>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-xs text-neutral-400">© {new Date().getFullYear()} WaArchi Studio. Alle Rechte vorbehalten.</p>
              <div className="flex items-center gap-4 text-xs text-neutral-400">
                <Link href="/impressum" className="hover:text-neutral-600 transition-colors">Impressum</Link>
                <Link href="/datenschutz" className="hover:text-neutral-600 transition-colors">Datenschutz</Link>
              </div>
            </div>
          </div>
      </footer>
    </main>
  );
}