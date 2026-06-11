import Link from "next/link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Navigation Bar — Steep style */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-dove/40 bg-pure-white px-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-signifier)] text-xl font-normal tracking-tight text-ink"
        >
          TubarberApp
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            href="/pricing"
            className="text-[15px] font-[450] text-ink transition-colors hover:text-graphite"
          >
            Precios
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-[15px] font-[450] text-ink transition-colors hover:text-graphite"
            >
              Iniciar sesion
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-ink px-5 py-2 text-[15px] font-[450] text-pure-white transition-colors hover:bg-ink/90"
            >
              Comenzar
            </Link>
          </div>
        </nav>
      </header>

      {/* Content */}
      <main className="w-full flex-1">
        {children}
      </main>
    </div>
  );
}
