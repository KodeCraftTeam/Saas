"use client";

import { useEffect, useState } from "react";
import { Building2, Users, TrendingUp, ArrowUpRight } from "lucide-react";

/* ── Animated counter ── */
function useCounter(target: number, duration = 900) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (target === 0) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return val;
}

/* ── Data ── */
const negocios = [
  { id: "f7f01c34", name: "KodeCraft Barberia",     type: "Barbería", ciudad: "Bogotá",   creado: "Hoy, 2:30 PM" },
  { id: "262ab4f2", name: "KodeCraft Spa Medellín",  type: "Spa",      ciudad: "Medellín", creado: "Hoy, 2:32 PM" },
];

/* ── Helpers ── */
function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 18) return "Buenas tardes";
  return "Buenas noches";
}
function todayLabel() {
  return new Date().toLocaleDateString("es-CO", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

/* ── Stat card ── */
function StatCard({
  icon: Icon, label, value, delta, delay, warm,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  delta?: string;
  delay: number;
  warm?: boolean;
}) {
  const count = useCounter(value);
  return (
    <div
      className="animate-fade-in-up group rounded-[18px] border border-[#efefef] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#e0e0e0] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.08)]"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both", background: warm ? "#fbe1d1" : "#fff" }}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#f7f7f8]">
          <Icon className="h-[15px] w-[15px] text-[#777b86]" />
        </div>
        {delta && (
          <span className="flex items-center gap-0.5 rounded-full bg-[#f0fdf4] px-2 py-0.5 text-[11px] font-[500] text-emerald-600">
            <ArrowUpRight className="h-3 w-3" />
            {delta}
          </span>
        )}
      </div>
      <p className="mt-5 text-[32px] font-[500] text-[#17191c] leading-none tracking-[-0.5px]">
        {count}
      </p>
      <p className="mt-1.5 text-[13px] text-[#a3a6af]">{label}</p>
    </div>
  );
}

/* ── Page ── */
export default function SuperAdminDashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">

      {/* ── Top bar ── */}
      <header
        className="flex h-[58px] flex-shrink-0 items-center justify-between border-b border-[#f5f5f5] px-8"
        style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.4s ease" }}
      >
        <div className="flex items-center gap-2 text-[13px]">
          <span className="text-[#c8c8c8]">Plataforma</span>
          <span className="text-[#e8e8e8]">/</span>
          <span className="font-[500] text-[#17191c]">Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[12px] text-[#a3a6af]">Todo en orden</span>
        </div>
      </header>

      <div className="flex-1 overflow-auto px-8 py-8">

        {/* ── Greeting ── */}
        <div
          className="animate-fade-in-up mb-8"
          style={{ animationDelay: "60ms", animationFillMode: "both" }}
        >
          <h1
            className="text-[38px] text-[#17191c] leading-[1.1] tracking-[-0.55px]"
            style={{ fontFamily: "var(--font-signifier)" }}
          >
            {greeting()}, david.
          </h1>
          <p className="mt-1 text-[13px] text-[#c8c8c8] capitalize">{todayLabel()}</p>
        </div>

        {/* ── Stats ── */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          <StatCard icon={Building2}  label="Negocios activos"     value={2} delta="+2" delay={120} warm />
          <StatCard icon={Users}      label="Usuarios registrados" value={1} delta="+1" delay={180} />
          <StatCard icon={TrendingUp} label="Ingresos plataforma"  value={0}            delay={240} />
        </div>

        {/* ── Negocios table ── */}
        <div
          className="animate-fade-in-up overflow-hidden rounded-[18px] border border-[#efefef]"
          style={{ animationDelay: "300ms", animationFillMode: "both" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#f5f5f5] px-6 py-4">
            <h2 className="text-[14px] font-[500] text-[#17191c]">Negocios</h2>
            <span className="rounded-full bg-[#f7f7f8] px-2.5 py-0.5 text-[11px] font-[500] text-[#a3a6af]">
              {negocios.length} total
            </span>
          </div>

          {/* Col labels */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_90px] gap-4 border-b border-[#f7f7f8] px-6 py-2.5">
            {["Nombre", "Tipo", "Ciudad", "Creado", "Estado"].map((h) => (
              <p key={h} className="text-[11px] font-[500] uppercase tracking-[0.5px] text-[#d0d0d0]">
                {h}
              </p>
            ))}
          </div>

          {/* Rows */}
          {negocios.map((n, i) => (
            <div
              key={n.id}
              className="animate-fade-in-up grid grid-cols-[2fr_1fr_1fr_1fr_90px] items-center gap-4 px-6 py-4 transition-colors duration-100 hover:bg-[#fafafa]"
              style={{
                animationDelay: `${360 + i * 60}ms`,
                animationFillMode: "both",
                borderBottom: i < negocios.length - 1 ? "1px solid #f7f7f8" : "none",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[10px] bg-[#fbe1d1] text-[11px] font-[600] text-[#5d2a1a]">
                  {n.name.charAt(0)}
                </span>
                <p className="text-[14px] font-[480] text-[#17191c] tracking-[-0.009em]">{n.name}</p>
              </div>
              <p className="text-[13px] text-[#a3a6af]">{n.type}</p>
              <p className="text-[13px] text-[#a3a6af]">{n.ciudad}</p>
              <p className="text-[13px] text-[#c8c8c8]">{n.creado}</p>
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0fdf4] px-2.5 py-1 text-[11px] font-[500] text-emerald-600">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Activo
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
