import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 bg-white">
      <h1 className="font-jost text-6xl text-neutral-900">404</h1>
      <p className="font-jost text-xl text-neutral-600 text-center">
        Seite nicht gefunden
      </p>
      <p className="text-neutral-500 text-center max-w-md">
        Die angeforderte Seite existiert nicht oder wurde verschoben.
      </p>
      <Link
        href="/home"
        className="mt-4 px-6 py-3 bg-black text-white rounded-full hover:opacity-90 transition"
      >
        Zur Startseite
      </Link>
    </main>
  );
}
