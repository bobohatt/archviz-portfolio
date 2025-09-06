// app/home/page.tsx

"use client";
import { useEffect, useRef } from "react";
import { PROJECTS, type Project } from "@/lib/projects";
import Link from "next/link";
import Image from "next/image";

const THUMB_REGEX = /\/thumb\.(jpe?g|png|webp|avif)$/i;

function pickThumb(p: Project) {
  return p.images.find((src) => THUMB_REGEX.test(src)) ?? p.images[0];
}

export default function HomePage() {
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function setHeaderVar() {
      const h = headerRef.current?.offsetHeight ?? 0;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    }
    setHeaderVar();
    window.addEventListener("resize", setHeaderVar);
    return () => window.removeEventListener("resize", setHeaderVar);
  }, []);

  const PADDING = "p-6";

  return (
    <main className="min-h-screen bg-white text-neutral-900 selection:bg-black selection:text-white">
      <header ref={headerRef} className="sticky top-0 z-30 bg-white border-b border-neutral-200 pt-[15px] pb-[15px]">
        <div className="px-[16px] md:px-[40px] max-w-[2000px] mx-auto flex items-center justify-between gap-3">
          <Link href="/home" className="flex items-center gap-2 shrink-0">
            <Image src="/logo.png" alt="WaArchi Logo" width={144} height={48} className="h-10 md:h-12 w-auto shrink-0" priority />
          </Link>
          <nav className="flex items-center gap-3 text-xs overflow-x-auto overscroll-x-contain max-w-[70%] md:max-w-none md:overflow-visible md:gap-6 md:text-sm">
            <Link href="/about" className="hover:opacity-60 transition-opacity shrink-0">über uns</Link>
            <Link href="/how-we-work" className="hover:opacity-60 transition-opacity shrink-0">arbeitsweise</Link>
            <Link href="/contact" className="hover:opacity-60 transition-opacity shrink-0">kontakt</Link>
            <Link href="/impressum" className="hover:opacity-60 transition-opacity shrink-0">impressum</Link>
            <Link href="/datenschutz" className="hover:opacity-60 transition-opacity shrink-0">datenschutz</Link>
          </nav>
        </div>
      </header>

      <section className={`mx-auto max-w-7xl ${PADDING} text-center`}>
        <h1 className="font-jost text-4xl md:text-2xl tracking-tight leading-[1.1]"></h1>
      </section>

    <section id="work" className="px-[40px] max-w-[2000px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px] relative">
            {PROJECTS.map((p) => (
                <div key={p.id} className="relative">
                {/* Das Link-Tag umschließt jetzt nur noch das Div */}
                <Link href={`/work/${p.id}`} scroll={false} className="block cursor-up-arrow" aria-label={`Open project ${p.title}`}>
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

      <footer id="about" className="mt-24 border-t border-neutral-200">
          {/* ... dein footer ... */}
      </footer>
    </main>
  );
}