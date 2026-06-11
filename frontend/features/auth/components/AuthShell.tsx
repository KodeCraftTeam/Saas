"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Scissors,
  Brush,
  Droplets,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

/**
 * Iconos flotantes decorativos para el panel de branding.
 * Cada uno tiene posición, tamaño, opacidad y animación única.
 */
const floatingIcons = [
  { icon: Scissors, top: "12%", left: "15%", size: 22, opacity: 0.12, delay: "0s", animation: "animate-float" },
  { icon: Brush, top: "28%", left: "75%", size: 20, opacity: 0.1, delay: "1.2s", animation: "animate-float-reverse" },
  { icon: Droplets, top: "65%", left: "20%", size: 18, opacity: 0.08, delay: "2.4s", animation: "animate-float" },
  { icon: Sparkles, top: "78%", left: "70%", size: 16, opacity: 0.1, delay: "0.8s", animation: "animate-float-reverse" },
  { icon: Scissors, top: "45%", left: "85%", size: 14, opacity: 0.06, delay: "3s", animation: "animate-float" },
  { icon: Brush, top: "88%", left: "40%", size: 20, opacity: 0.07, delay: "1.8s", animation: "animate-float-reverse" },
];

/**
 * Contenido de branding que cambia según la página.
 */
const brandingContent = {
  login: {
    title: "Gestiona tu barbería",
    description:
      "Agenda citas, administra barberos y haz crecer tu negocio desde un solo lugar.",
  },
  register: {
    title: "Únete a TubarberApp",
    description:
      "Crea tu cuenta y empieza a organizar tu barbería en minutos. Sin compromisos.",
  },
} as const;

export function AuthShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isRegister = pathname === "/register";
  const content = isRegister ? brandingContent.register : brandingContent.login;

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* ── Panel de Branding ─────────────────────────────── */}
      <div
        className={`
          hidden lg:flex lg:w-1/2 relative bg-ink items-center justify-center overflow-hidden
          transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isRegister ? "translate-x-full" : "translate-x-0"}
        `}
      >
        {/* Glow radial de Apricot Wash — pulsante */}
        <div className="absolute inset-0 animate-pulse-glow bg-[radial-gradient(ellipse_at_center,_var(--color-apricot-wash)_0%,_transparent_70%)] opacity-30" />

        {/* Iconos flotantes decorativos */}
        {floatingIcons.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className={`absolute ${item.animation}`}
              style={{
                top: item.top,
                left: item.left,
                opacity: item.opacity,
                animationDelay: item.delay,
              }}
            >
              <Icon
                size={item.size}
                className="text-pure-white"
                strokeWidth={1.5}
              />
            </div>
          );
        })}

        {/* Contenido central con entrada animada */}
        <div className="relative z-10 max-w-md px-12 text-center space-y-6">
          <div className="animate-fade-in-up animation-delay-1 mx-auto flex h-14 w-14 items-center justify-center rounded-[--radius-cards] bg-pure-white/10 backdrop-blur-sm">
            <Scissors className="h-7 w-7 text-pure-white" />
          </div>
          <h1 className="animate-fade-in-up animation-delay-2 font-[family-name:var(--font-signifier)] text-[44px] leading-[1.1] tracking-[-0.66px] text-pure-white font-normal">
            {content.title}
          </h1>
          <p className="animate-fade-in-up animation-delay-3 text-[16px] leading-[1.38] text-pure-white/60 tracking-[-0.009em]">
            {content.description}
          </p>
        </div>
      </div>

      {/* ── Panel de Formulario ───────────────────────────── */}
      <div
        className={`
          flex w-full lg:w-1/2 items-center justify-center bg-pure-white px-6 relative
          transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isRegister ? "translate-x-[-100%]" : "translate-x-0"}
        `}
      >
        {/* Botón de regreso al home */}
        <Link
          href="/"
          className="absolute top-6 left-6 flex items-center gap-1.5 text-graphite hover:text-ink transition-all duration-200 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span className="text-[13px] font-medium tracking-[-0.009em] opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-[60px] transition-all duration-200">
            Inicio
          </span>
        </Link>

        <div className="w-full max-w-[380px]">
          {/* Logo mobile — con entrada animada */}
          <div className="animate-fade-in-up mb-10 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-[--radius-cards] bg-ink">
              <Scissors className="h-4 w-4 text-pure-white" />
            </div>
            <span className="text-[16px] font-medium text-ink tracking-[-0.009em]">
              TubarberApp
            </span>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
