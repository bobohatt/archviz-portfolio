'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 bg-white">
      <h1 className="font-jost text-4xl text-neutral-900">Etwas ist schiefgelaufen</h1>
      <p className="text-neutral-600 text-center max-w-md">
        Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.
      </p>
      <div className="flex gap-4 mt-4">
        <button
          onClick={reset}
          className="px-6 py-3 bg-black text-white rounded-full hover:opacity-90 transition"
        >
          Erneut versuchen
        </button>
        <Link
          href="/home"
          className="px-6 py-3 rounded-full ring-1 ring-neutral-800 text-neutral-800 hover:bg-neutral-100 transition"
        >
          Zur Startseite
        </Link>
      </div>
    </main>
  );
}
