"use client";

import { useEffect, useState } from "react";
import { BarChart3, TrendingUp, Users, Building, Activity, DollarSign, Calendar } from "lucide-react";

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-pure-white text-ink font-sohne select-none antialiased">
      {/* ── Top Bar ── */}
      <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-dove/25 bg-pure-white px-8">
        <div className="flex items-center gap-2 text-[13px] font-[450] text-graphite tracking-[-0.009em]">
          <span>Plataforma</span>
          <span className="text-dove">/</span>
          <span className="font-[480] text-ink">Analítica</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-rust animate-pulse" />
          <span className="text-xs font-semibold text-ink bg-fog px-3 py-1 rounded-full border border-dove/15">En tiempo real</span>
        </div>
      </header>

      {/* ── Main Content Area ── */}
      <div className="flex-1 overflow-auto px-8 py-8 space-y-8 w-full">
        <div>
          <h1 className="font-signifier text-[44px] font-normal leading-tight tracking-[-0.015em] text-ink">
            Analítica de Plataforma
          </h1>
          <p className="mt-1.5 text-[15px] text-ash font-[430]">
            Métricas detalladas sobre el crecimiento de usuarios, facturación y distribución de negocios.
          </p>
        </div>

        {/* ── Overview cards (Steep style small grid) ── */}
        <div className="grid grid-cols-4 gap-4">
          <div className="rounded-cards bg-pure-white border border-dove/20 p-5 shadow-subtle flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-graphite uppercase tracking-wider">Crecimiento mensual</span>
              <Activity className="h-4 w-4 text-rust" />
            </div>
            <div className="mt-4 flex items-end justify-between gap-3">
              <p className="text-2xl font-bold text-ink tracking-tight font-signifier">+100%</p>
              <svg width="56" height="24" viewBox="0 0 56 24" className="flex-shrink-0">
                <polyline points="0,19 10,15 20,17 30,9 40,11 56,3" fill="none" stroke="#5d2a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-[11px] font-medium text-rust mt-1.5">Comparado con mes anterior</p>
          </div>

          <div className="rounded-cards bg-pure-white border border-dove/20 p-5 shadow-subtle flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-graphite uppercase tracking-wider">Ingreso por negocio</span>
              <DollarSign className="h-4 w-4 text-rust" />
            </div>
            <div className="mt-4 flex items-end justify-between gap-3">
              <p className="text-2xl font-bold text-ink tracking-tight font-signifier">$0 USD</p>
              <svg width="56" height="24" viewBox="0 0 56 24" className="flex-shrink-0">
                <polyline points="0,12 10,13 20,11 30,12 40,10 56,11" fill="none" stroke="#777b86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-[11px] font-medium text-graphite mt-1.5">Suscripciones activas</p>
          </div>

          <div className="rounded-cards bg-pure-white border border-dove/20 p-5 shadow-subtle flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-graphite uppercase tracking-wider">Tiempo de uso</span>
              <Calendar className="h-4 w-4 text-rust" />
            </div>
            <div className="mt-4 flex items-end justify-between gap-3">
              <p className="text-2xl font-bold text-ink tracking-tight font-signifier">4.8 hrs/día</p>
              <svg width="56" height="24" viewBox="0 0 56 24" className="flex-shrink-0">
                <polyline points="0,16 10,10 20,14 30,7 40,9 56,5" fill="none" stroke="#5d2a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-[11px] font-medium text-rust mt-1.5">Alta retención diaria</p>
          </div>

          <div className="rounded-cards bg-pure-white border border-dove/20 p-5 shadow-subtle flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-graphite uppercase tracking-wider">Conversión</span>
              <TrendingUp className="h-4 w-4 text-rust" />
            </div>
            <div className="mt-4 flex items-end justify-between gap-3">
              <p className="text-2xl font-bold text-ink tracking-tight font-signifier">12.5%</p>
              <svg width="56" height="24" viewBox="0 0 56 24" className="flex-shrink-0">
                <polyline points="0,18 10,17 20,13 30,14 40,8 56,6" fill="none" stroke="#5d2a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-[11px] font-medium text-rust mt-1.5">Pruebas gratuitas a premium</p>
          </div>
        </div>

        {/* ── Charts Grid ── */}
        <div className="grid grid-cols-3 gap-6">
          {/* Main Growth Line Chart (Warm Data Card Accent) */}
          <div className="col-span-2 rounded-cards bg-pure-white border border-dove/20 p-6 shadow-subtle flex flex-col justify-between min-h-[380px]">
            <div className="flex items-center justify-between border-b border-dove/10 pb-4 mb-4">
              <div>
                <h2 className="text-base font-[480] text-ink">Crecimiento de Negocios y Citas</h2>
                <p className="text-xs text-graphite">Evolución temporal del onboarding en el primer semestre de 2026</p>
              </div>
              <span className="rounded-full bg-fog border border-dove/15 px-3 py-1 text-xs font-bold text-graphite">
                Ene 2026 - Jun 2026
              </span>
            </div>

            {/* SVG Minimalist Chart */}
            <div className="flex-1 w-full relative min-h-[200px] flex items-end">
              <svg viewBox="0 0 500 180" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5d2a1a" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#5d2a1a" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Grid Lines */}
                <line x1="0" y1="45" x2="500" y2="45" stroke="#f5f5f8" strokeWidth="1" />
                <line x1="0" y1="90" x2="500" y2="90" stroke="#f5f5f8" strokeWidth="1" />
                <line x1="0" y1="135" x2="500" y2="135" stroke="#f5f5f8" strokeWidth="1" />
                <line x1="0" y1="180" x2="500" y2="180" stroke="#e3e4e6" strokeWidth="1.5" />

                {/* Growth Path Area */}
                <path
                  d="M 10 180 Q 80 160 100 150 T 200 120 T 300 90 T 400 45 T 490 20 L 490 180 Z"
                  fill="url(#chartGrad)"
                />

                {/* Growth Curve (Rust accent) */}
                <path
                  d="M 10 180 Q 80 160 100 150 T 200 120 T 300 90 T 400 45 T 490 20"
                  fill="none"
                  stroke="#5d2a1a"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Nodes */}
                <circle cx="100" cy="150" r="4" fill="white" stroke="#5d2a1a" strokeWidth="2.5" />
                <circle cx="200" cy="120" r="4" fill="white" stroke="#5d2a1a" strokeWidth="2.5" />
                <circle cx="300" cy="90" r="4" fill="white" stroke="#5d2a1a" strokeWidth="2.5" />
                <circle cx="400" cy="45" r="4" fill="white" stroke="#5d2a1a" strokeWidth="2.5" />
                <circle cx="490" cy="20" r="5" fill="#5d2a1a" stroke="white" strokeWidth="2" />
              </svg>
            </div>

            {/* X-Axis labels */}
            <div className="flex justify-between text-[11px] font-bold text-graphite mt-4 px-2 uppercase tracking-wide">
              <span>Ene</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Abr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>

          {/* Distribution widget — donut real (Cool Data Card Tint style) */}
          <div className="rounded-cards bg-sky-wash p-6 flex flex-col justify-between min-h-[380px]">
            <div className="flex flex-col border-b border-ink/5 pb-4 mb-4">
              <h2 className="text-base font-[480] text-ink">Distribución</h2>
              <p className="text-xs text-ink/70">Tipos de negocios creados</p>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="relative h-[180px] w-[180px]">
                <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
                  <circle cx="90" cy="90" r="70" fill="none" stroke="#ffffff80" strokeWidth="22" />
                  {/* Barberías 50% */}
                  <circle
                    cx="90" cy="90" r="70" fill="none"
                    stroke="#5d2a1a" strokeWidth="22"
                    strokeDasharray="219.9 439.8" strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                  {/* Spas 50% */}
                  <circle
                    cx="90" cy="90" r="70" fill="none"
                    stroke="#17191c" strokeWidth="22"
                    strokeDasharray="219.9 439.8" strokeDashoffset="-219.9"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="font-signifier text-[28px] font-normal leading-none text-ink">2</p>
                  <p className="text-[11px] text-ink/60 mt-1">negocios</p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-ink">
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-rust" /> Barberías</span>
                <span>50% (1)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-ink">
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-ink" /> Spas</span>
                <span>50% (1)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-medium text-ink/50">
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-ink/20" /> Salones / Otros</span>
                <span>0% (0)</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mapa de cobertura por ciudad ── */}
        <div className="rounded-cards bg-pure-white border border-dove/20 p-6 shadow-subtle">
          <div className="flex items-center justify-between border-b border-dove/10 pb-4 mb-6">
            <div>
              <h2 className="text-base font-[480] text-ink">Cobertura por ciudad</h2>
              <p className="text-xs text-graphite">Negocios registrados por ubicación en el territorio nacional</p>
            </div>
            <span className="rounded-full bg-fog border border-dove/15 px-3 py-1 text-xs font-bold text-graphite">
              4 ciudades activas
            </span>
          </div>

          <div className="flex items-center gap-10">
            <svg viewBox="0 0 300 340" className="h-[320px] w-[280px] flex-shrink-0">
              {/* Silueta esquemática — no busca precisión geográfica */}
              <path
                d="M 90 15 L 150 10 L 195 30 L 210 15 L 230 35 L 215 60 L 235 90 L 220 120
                   L 245 150 L 230 190 L 245 230 L 220 260 L 225 300 L 190 330 L 150 315
                   L 120 330 L 95 300 L 70 260 L 55 220 L 75 190 L 55 150 L 70 110
                   L 50 80 L 70 45 Z"
                fill="#f7f7f8"
                stroke="#a3a6af"
                strokeWidth="1.5"
              />

              {/* Barranquilla */}
              <circle cx="150" cy="35" r="6" fill="#5d2a1a" opacity="0.85" />
              <text x="164" y="39" className="fill-graphite" style={{ fontSize: "10px", fontWeight: 600 }}>Barranquilla</text>

              {/* Medellín */}
              <circle cx="115" cy="130" r="9" fill="#5d2a1a" />
              <text x="130" y="134" className="fill-ink" style={{ fontSize: "11px", fontWeight: 700 }}>Medellín</text>

              {/* Bogotá */}
              <circle cx="155" cy="200" r="9" fill="#17191c" />
              <text x="170" y="204" className="fill-ink" style={{ fontSize: "11px", fontWeight: 700 }}>Bogotá</text>

              {/* Cali */}
              <circle cx="105" cy="250" r="6" fill="#5d2a1a" opacity="0.85" />
              <text x="119" y="254" className="fill-graphite" style={{ fontSize: "10px", fontWeight: 600 }}>Cali</text>
            </svg>

            <div className="flex-1 space-y-4">
              {[
                { name: "Bogotá", count: 1, color: "bg-ink" },
                { name: "Medellín", count: 1, color: "bg-rust" },
                { name: "Cali", count: 0, color: "bg-rust/40" },
                { name: "Barranquilla", count: 0, color: "bg-rust/40" },
              ].map((c) => (
                <div key={c.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-ink font-[480]">
                    <span className={`h-2 w-2 rounded-full ${c.color}`} />
                    {c.name}
                  </span>
                  <span className="text-sm font-bold text-graphite">{c.count} negocio{c.count === 1 ? "" : "s"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
