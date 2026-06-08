import { Scissors } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Lado izquierdo - "La puerta" (solo desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-ink items-center justify-center overflow-hidden">
        {/* Glow radial de Apricot Wash */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-apricot-wash)_0%,_transparent_70%)] opacity-30" />

        <div className="relative z-10 max-w-md px-12 text-center space-y-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[--radius-cards] bg-pure-white/10 backdrop-blur-sm">
            <Scissors className="h-7 w-7 text-pure-white" />
          </div>
          <h1 className="font-[family-name:var(--font-signifier)] text-[44px] leading-[1.1] tracking-[-0.66px] text-pure-white font-normal">
            Gestiona tu barberia
          </h1>
          <p className="text-[16px] leading-[1.38] text-pure-white/60 tracking-[-0.009em]">
            Agenda citas, administra barberos y haz crecer tu negocio desde un
            solo lugar.
          </p>
        </div>
      </div>

      {/* Lado derecho - Formulario */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-pure-white px-6">
        <div className="w-full max-w-[380px]">
          {/* Logo mobile */}
          <div className="mb-10 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-[--radius-xl] bg-ink">
              <Scissors className="h-4 w-4 text-pure-white" />
            </div>
            <span className="text-[16px] font-medium text-ink tracking-[-0.009em]">
              BarberApp
            </span>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
