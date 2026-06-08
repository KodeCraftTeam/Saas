import Link from "next/link";

export default function MarketingPage() {
  return (
    <>
      {/* Hero — Steep editorial style */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden text-center">
        {/* Warm radial glow */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(251, 225, 209, 0.3), transparent)",
          }}
        />

        <h1 className="max-w-3xl font-[family-name:var(--font-signifier)] text-[64px] font-normal leading-[1.1] tracking-[-0.025em] text-ink">
          Tu barberia, organizada
        </h1>

        <p className="mt-6 max-w-xl text-[18px] font-normal leading-[1.35] text-ash">
          Agenda citas, gestiona clientes y haz crecer tu negocio desde una
          sola plataforma.
        </p>

        <div className="mt-10 flex items-center gap-5">
          <Link
            href="/register"
            className="rounded-full bg-ink px-5 py-2 text-[15px] font-[450] text-pure-white transition-colors hover:bg-ink/90"
          >
            Comenzar gratis
          </Link>
          <Link
            href="/pricing"
            className="text-[15px] font-[450] text-ink transition-colors hover:text-graphite"
          >
            Ver precios
          </Link>
        </div>
      </section>
    </>
  );
}
