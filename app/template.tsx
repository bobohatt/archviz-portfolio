// app/template.tsx

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        // Der key ist entscheidend, damit Framer Motion den Seitenwechsel erkennt
        key={pathname}
        
        // Startzustand: komplett unsichtbar
        initial={{ opacity: 0 }}
        
        // Endzustand: komplett sichtbar
        animate={{ opacity: 1 }}
        
        // Zustand beim Verlassen: wieder unsichtbar
        exit={{ opacity: 0 }}
        
        // Dauer und Art der Animation
        transition={{ ease: "easeInOut", duration: 0.35 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}