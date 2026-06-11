"use client";

import React, { useRef, useState, useEffect } from "react";
import { 
  Users, 
  Plus, 
  Scissors, 
  Calendar, 
  DollarSign, 
  Clock, 
  ArrowUpRight, 
  ChevronRight,
  TrendingUp,
  LayoutDashboard,
  Settings,
  List,
  Sparkles
} from "lucide-react";

// Types for Card component props
interface CardProps {
  style?: React.CSSProperties;
  className?: string;
}

// 1. Stats Card: Clientes Registrados
function ClientesCard({ style, className }: CardProps) {
  return (
    <div
      style={style}
      className={`bg-pure-white border border-dove/20 shadow-subtle rounded-[24px] p-5 flex flex-col justify-between select-none transition-shadow hover:shadow-md ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-wash/50 text-ink">
          <Users className="h-4 w-4" />
        </div>
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-800">
          +12%
        </span>
      </div>
      <div className="mt-2">
        <p className="text-[32px] font-bold text-ink leading-none tracking-tight">
          142
        </p>
        <p className="mt-1.5 text-xs font-semibold text-graphite tracking-tight uppercase">
          Clientes Activos
        </p>
      </div>
    </div>
  );
}

// 2. Stats Card: Ingresos del Día
function IngresosCard({ style, className }: CardProps) {
  return (
    <div
      style={style}
      className={`bg-pure-white border border-dove/20 shadow-subtle rounded-[24px] p-5 flex flex-col justify-between select-none transition-shadow hover:shadow-md ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-apricot-wash/50 text-ink">
          <DollarSign className="h-4 w-4" />
        </div>
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-800 flex gap-0.5">
          <ArrowUpRight className="h-3 w-3" /> 8%
        </span>
      </div>
      <div className="mt-2">
        <p className="text-[32px] font-bold text-ink leading-none tracking-tight">
          $420.00
        </p>
        <p className="mt-1.5 text-xs font-semibold text-graphite tracking-tight uppercase">
          Ingresos de Hoy
        </p>
      </div>
    </div>
  );
}

// 3. Upcoming Appointments Card
function CitasCard({ style, className }: CardProps) {
  const appointments = [
    { name: "Carlos Gómez", service: "Corte + Barba", barber: "Alex", time: "09:30 AM", initial: "CG", color: "bg-orange-100 text-orange-800" },
    { name: "Sofía Ruiz", service: "Tinte Capilar", barber: "Jess", time: "11:00 AM", initial: "SR", color: "bg-purple-100 text-purple-800" },
    { name: "David Marín", service: "Corte Clásico", barber: "Alex", time: "12:15 PM", initial: "DM", color: "bg-blue-100 text-blue-800" },
    { name: "Mateo Benítez", service: "Perfilado", barber: "Daniel", time: "02:30 PM", initial: "MB", color: "bg-emerald-100 text-emerald-800" },
  ];

  return (
    <div
      style={style}
      className={`bg-pure-white border border-dove/20 shadow-subtle rounded-[24px] p-5 flex flex-col justify-between overflow-hidden select-none transition-shadow hover:shadow-md ${className}`}
    >
      <div className="flex items-center justify-between border-b border-dove/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="font-bold text-ink text-sm">Citas de Hoy</h3>
        </div>
        <span className="text-[11px] text-graphite font-semibold">4 Pendientes</span>
      </div>
      
      <div className="flex-1 mt-3 space-y-2.5 overflow-hidden">
        {appointments.map((app, idx) => (
          <div key={idx} className="flex items-center justify-between p-2 rounded-xl hover:bg-fog/50 transition-colors duration-150">
            <div className="flex items-center gap-2.5">
              <div className={`h-7 w-7 rounded-full ${app.color} flex items-center justify-center text-[10px] font-bold`}>
                {app.initial}
              </div>
              <div>
                <p className="text-xs font-bold text-ink leading-tight">{app.name}</p>
                <p className="text-[10px] text-graphite leading-none mt-0.5">{app.service} • {app.barber}</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-ink flex items-center gap-1">
              <Clock className="h-3 w-3 text-dove" /> {app.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 4. Weekly Revenue SVG Chart
function RevenueChartCard({ style, className }: CardProps) {
  return (
    <div
      style={style}
      className={`bg-pure-white border border-dove/20 shadow-subtle rounded-[24px] p-5 flex flex-col justify-between overflow-hidden select-none transition-shadow hover:shadow-md ${className}`}
    >
      <div className="flex items-center justify-between border-b border-dove/10 pb-3">
        <div>
          <h3 className="font-bold text-ink text-sm">Rendimiento Semanal</h3>
          <p className="text-[10px] text-graphite font-medium">Ingresos de la semana actual</p>
        </div>
        <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
          <TrendingUp className="h-3.5 w-3.5" /> +24%
        </div>
      </div>
      
      <div className="flex-1 relative mt-4 flex items-end">
        <svg className="w-full h-[80%] overflow-visible" viewBox="0 0 300 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(251, 225, 209, 0.5)" />
              <stop offset="100%" stopColor="rgba(251, 225, 209, 0.0)" />
            </linearGradient>
          </defs>
          
          {/* Background grid */}
          <line x1="0" y1="30" x2="300" y2="30" stroke="#f2f2f3" strokeDasharray="3,3" strokeWidth="1" />
          <line x1="0" y1="60" x2="300" y2="60" stroke="#f2f2f3" strokeDasharray="3,3" strokeWidth="1" />
          <line x1="0" y1="90" x2="300" y2="90" stroke="#f2f2f3" strokeDasharray="3,3" strokeWidth="1" />
          
          {/* Area under line */}
          <path
            d="M 0,110 Q 50,85 100,98 T 200,45 T 300,15 L 300,120 L 0,120 Z"
            fill="url(#chartGlow)"
          />
          
          {/* Line curve */}
          <path
            d="M 0,110 Q 50,85 100,98 T 200,45 T 300,15"
            fill="none"
            stroke="#17191c"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          
          {/* Data Points */}
          <circle cx="100" cy="98" r="4.5" fill="#ffffff" stroke="#17191c" strokeWidth="2.5" />
          <circle cx="200" cy="45" r="4.5" fill="#ffffff" stroke="#17191c" strokeWidth="2.5" />
          <circle cx="300" cy="15" r="5" fill="#17191c" />
        </svg>
        
        {/* SVG floating tooltip badge */}
        <div className="absolute top-[8%] right-[10%] bg-ink text-pure-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg flex items-center gap-1">
          <span>Sábado</span>
          <span className="text-apricot-wash font-extrabold">$510</span>
        </div>
      </div>
      
      <div className="flex justify-between mt-2.5 text-[9px] font-bold text-dove uppercase tracking-wider border-t border-dove/10 pt-2 px-1">
        <span>Lun</span>
        <span>Mar</span>
        <span>Mié</span>
        <span>Jue</span>
        <span>Vie</span>
        <span>Sáb</span>
        <span>Dom</span>
      </div>
    </div>
  );
}

// 5. Sidebar/Quick Actions widget card
function QuickActionsCard({ style, className }: CardProps) {
  const actions = [
    { label: "Nueva Cita", icon: Plus, bg: "bg-ink text-pure-white hover:bg-ink/90" },
    { label: "Nuevo Cliente", icon: Users, bg: "bg-fog text-ink hover:bg-dove/20 border border-dove/10" },
    { label: "Servicios", icon: Scissors, bg: "bg-fog text-ink hover:bg-dove/20 border border-dove/10" },
  ];

  return (
    <div
      style={style}
      className={`bg-pure-white border border-dove/20 shadow-subtle rounded-[24px] p-4 flex flex-col justify-between select-none transition-shadow hover:shadow-md ${className}`}
    >
      <div>
        <h3 className="font-bold text-ink text-xs tracking-tight">Acceso Rápido</h3>
        <p className="text-[10px] text-graphite leading-tight mt-0.5">Operaciones comunes</p>
      </div>
      
      <div className="mt-3.5 space-y-2">
        {actions.map((act, idx) => (
          <button
            key={idx}
            className={`w-full flex items-center justify-between rounded-xl px-2.5 py-1.5 text-[11px] font-semibold transition-all duration-150 cursor-pointer ${act.bg}`}
          >
            <span className="flex items-center gap-1.5">
              <act.icon className="h-3.5 w-3.5" />
              {act.label}
            </span>
            <ChevronRight className="h-3 w-3 opacity-60" />
          </button>
        ))}
      </div>
    </div>
  );
}

// Coordinates definition inside the aspect ratio canvas: Width: 100%, Height: 100% (16/10 aspect ratio)
// Scattered values: Start state (Hero)
// Target values: End state (Grid slots inside Mock App Window)
const scatteredCoords = [
  // Card 1: Clients
  { left: 3, top: 12, width: 19, height: 16, rotate: -7, scale: 0.88 },
  // Card 2: Income
  { left: 5, top: 68, width: 19, height: 16, rotate: 6, scale: 0.92 },
  // Card 3: Appointments
  { left: 78, top: 10, width: 19, height: 42, rotate: 8, scale: 0.95 },
  // Card 4: Revenue Chart
  { left: 74, top: 60, width: 22, height: 32, rotate: -5, scale: 0.9 },
  // Card 5: Quick Actions
  { left: 42, top: 80, width: 16, height: 18, rotate: 3, scale: 0.95 },
];

const targetCoords = [
  // Card 1: Clients (Top Row Slot 1)
  { left: 33.5, top: 29.5, width: 17.5, height: 14.5, rotate: 0, scale: 1 },
  // Card 2: Income (Top Row Slot 2)
  { left: 52.5, top: 29.5, width: 17.5, height: 14.5, rotate: 0, scale: 1 },
  // Card 3: Appointments (Right column)
  { left: 71.5, top: 29.5, width: 17.5, height: 53.5, rotate: 0, scale: 1 },
  // Card 4: Revenue Chart (Bottom Row wide slot)
  { left: 33.5, top: 46.5, width: 36.5, height: 36.5, rotate: 0, scale: 1 },
  // Card 5: Quick Actions (Placed inside sidebar bottom)
  { left: 13.5, top: 52.0, width: 15.0, height: 31.0, rotate: 0, scale: 1 },
];

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Citas", icon: Calendar, active: false },
  { label: "Clientes", icon: Users, active: false },
  { label: "Barberos", icon: Scissors, active: false },
  { label: "Servicios", icon: List, active: false },
  { label: "Configuración", icon: Settings, active: false },
];

export function ScrollAssembly() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const targetProgressRef = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      if (!containerRef.current || window.innerWidth < 768) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      
      if (totalScroll <= 0) return;
      
      const currentScroll = -rect.top;
      const p = Math.max(0, Math.min(1, currentScroll / totalScroll));
      targetProgressRef.current = p;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Trigger initial computation

    // Smooth scroll interpolation (LERP) loop inside requestAnimationFrame
    let animFrameId: number;
    let currentP = 0;
    
    const updateProgress = () => {
      const targetP = targetProgressRef.current;
      const diff = targetP - currentP;
      
      // Interpolate with a 0.08 damping factor for maximum fluidity
      if (Math.abs(diff) > 0.0001) {
        currentP += diff * 0.08;
        setProgress(currentP);
      } else if (currentP !== targetP) {
        currentP = targetP;
        setProgress(currentP);
      }
      animFrameId = requestAnimationFrame(updateProgress);
    };
    
    animFrameId = requestAnimationFrame(updateProgress);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("resize", checkMobile);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  // Easing function: cubic bezier curves
  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // Interpolations for scrolling
  // 1. Hero Text fades out as progress goes 0 -> 0.22
  const textOpacity = Math.max(0, 1 - progress / 0.22);
  const textScale = 1 - (progress / 0.22) * 0.08;
  const textTranslateY = -(progress / 0.22) * 35;

  // 2. Mock App Frame fades in and scales as progress goes 0.08 -> 0.48
  const appStart = 0.08;
  const appEnd = 0.5;
  const appProgress = Math.max(0, Math.min(1, (progress - appStart) / (appEnd - appStart)));
  const appOpacity = appProgress;
  const appScale = 0.82 + 0.18 * appProgress;
  const appTranslateY = 60 * (1 - appProgress);

  // 3. Card coordinates interpolation progress: 0.08 -> 0.76
  const cardStart = 0.08;
  const cardEnd = 0.76;
  const cardProgress = Math.max(0, Math.min(1, (progress - cardStart) / (cardEnd - cardStart)));
  const easeT = easeInOutCubic(cardProgress);

  // Status triggers when cards fully locked
  const isDocked = progress >= 0.74;

  if (isMobile) {
    // ──────── MOBILE VIEWPORT LAYOUT ────────
    return (
      <div className="w-full px-2 py-16 flex flex-col gap-10">
        {/* Simple Editorial Hero */}
        <div className="text-center max-w-xl mx-auto flex flex-col items-center">
          <span className="inline-flex items-center gap-1 bg-apricot-wash/65 text-rust text-xs font-semibold px-3 py-1 rounded-full mb-4 animate-pulse">
            <Sparkles className="h-3 w-3" /> Agenda de Barbería Inteligente
          </span>
          <h1 className="font-[family-name:var(--font-signifier)] text-4xl font-normal leading-tight tracking-tight text-ink">
            Tu barbería, organizada
          </h1>
          <p className="mt-4 text-[16px] text-ash font-medium leading-relaxed">
            Gestiona citas, fideliza clientes y visualiza tus ingresos en tiempo real desde cualquier dispositivo.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="/register"
              className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-pure-white hover:bg-ink/90 transition-colors"
            >
              Comenzar gratis
            </a>
            <a
              href="/pricing"
              className="rounded-full border border-dove/30 px-6 py-2.5 text-sm font-semibold text-ink hover:bg-fog/50 transition-colors"
            >
              Ver precios
            </a>
          </div>
        </div>

        {/* Feature Cards Grid for Mobile */}
        <div className="grid gap-5 sm:grid-cols-2 max-w-2xl mx-auto w-full mt-4">
          <ClientesCard className="h-44" />
          <IngresosCard className="h-44" />
          <RevenueChartCard className="h-64 sm:col-span-2" />
          <CitasCard className="h-80 sm:col-span-2" />
          <QuickActionsCard className="h-48 sm:col-span-2" />
        </div>
      </div>
    );
  }

  // ──────── DESKTOP SCROLL assembly LAYOUT ────────
  return (
    <div ref={containerRef} className="w-full relative" style={{ height: "230vh" }}>
      {/* Sticky container that keeps elements centered on screen during scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-pure-white">
        {/* Warm Radial Glow Backdrop */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(ellipse 70% 65% at 50% 50%, rgba(251, 225, 209, 0.42), rgba(211, 227, 252, 0.28), transparent)",
            opacity: 1 - progress * 0.4,
          }}
        />

        {/* 1. HERO TEXT SECTION: Fades away during scroll */}
        <div
          style={{
            opacity: textOpacity,
            transform: `translate3d(0, ${textTranslateY}px, 0) scale(${textScale})`,
            display: textOpacity === 0 ? "none" : "flex",
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none select-none z-20"
        >
          <span className="inline-flex items-center gap-1.5 bg-apricot-wash text-rust text-[13px] font-[500] px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="h-3.5 w-3.5 text-rust animate-spin-slow" />
            Software de gestión editorial para barberos
          </span>
          <h1 className="max-w-4xl font-[family-name:var(--font-signifier)] text-[72px] font-normal leading-[1.05] tracking-[-0.03em] text-ink">
            Tu barbería, organizada
          </h1>
          <p className="mt-6 max-w-xl text-[19px] font-normal leading-[1.4] text-ash">
            Agenda citas, gestiona tus barberos, atrae más clientes y haz crecer tu negocio desde una interfaz pulida y moderna.
          </p>
          <div className="mt-10 flex items-center gap-6 pointer-events-auto">
            <a
              href="/register"
              className="rounded-full bg-ink px-6 py-3 text-[15px] font-[450] text-pure-white transition-all hover:bg-ink/90 shadow-md hover:shadow-lg active:scale-95"
            >
              Comenzar gratis
            </a>
            <a
              href="/pricing"
              className="text-[15px] font-[450] text-ink transition-colors hover:text-graphite flex items-center gap-1"
            >
              Ver precios <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* 2. THE ASSEMBLY VIEWPORT CANVAS (16:10 fixed aspect ratio for relative percent mapping) */}
        <div className="relative w-full max-w-[1400px] aspect-[16/10] max-h-[82vh] overflow-visible flex items-center justify-center px-6">
          
          {/* A. MOCK APPLICATION WINDOW FRAME */}
          <div
            style={{
              opacity: appOpacity,
              transform: `translate3d(0, ${appTranslateY}px, 0) scale(${appScale})`,
              boxShadow: "0 25px 50px -12px rgba(4, 23, 43, 0.12), 0 0 0 1px rgba(4, 23, 43, 0.05)",
            }}
            className="absolute left-[10%] top-[15%] w-[80%] h-[75%] bg-fog rounded-[28px] border border-dove/30 overflow-hidden flex"
          >
            {/* Sidebar Mockup */}
            <aside className="w-[22%] bg-pure-white border-r border-dove/20 flex flex-col justify-between p-4.5 select-none">
              <div className="space-y-6">
                {/* Window buttons (macOS style) & App Title */}
                <div>
                  <div className="flex items-center gap-1.5 mb-5">
                    <span className="h-3.5 w-3.5 rounded-full bg-red-400/80" />
                    <span className="h-3.5 w-3.5 rounded-full bg-yellow-400/80" />
                    <span className="h-3.5 w-3.5 rounded-full bg-green-400/80" />
                  </div>
                  <span className="font-[family-name:var(--font-signifier)] text-lg font-bold tracking-tight text-ink">
                    TubarberApp
                  </span>
                </div>
                
                {/* Mock Navigation links */}
                <nav className="space-y-1">
                  {sidebarItems.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold ${
                        item.active
                          ? "bg-ink text-pure-white"
                          : "text-graphite hover:bg-fog hover:text-ink transition-colors duration-150"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </div>
                  ))}
                </nav>
              </div>

              {/* Bottom sidebar info (stands as target placeholder for Quick Actions card) */}
              <div className="rounded-2xl border border-dashed border-dove/30 h-[31%] flex items-center justify-center p-3">
                <span className="text-[10px] text-dove text-center leading-tight">
                  Arrastra módulos o crea accesos directos aquí
                </span>
              </div>
            </aside>

            {/* Main Mock Canvas Area */}
            <main className="flex-1 flex flex-col overflow-hidden bg-[#fafafa]">
              {/* Top mock header */}
              <header className="h-[15%] border-b border-dove/20 px-6 flex items-center justify-between bg-pure-white">
                <div>
                  <h2 className="text-sm font-bold text-ink flex items-center gap-1">
                    ¡Hola, Alejandro!{" "}
                    {isDocked && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md font-bold border border-emerald-100 animate-fade-in-up">
                        <Sparkles className="h-2.5 w-2.5" /> Todo al día
                      </span>
                    )}
                  </h2>
                  <p className="text-[10px] text-graphite leading-none mt-0.5">Esto es lo que pasa en tu barbería hoy.</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-fog border border-dove/20 flex items-center justify-center text-[10px] font-bold text-ink">
                    AJ
                  </div>
                </div>
              </header>
              
              {/* App main canvas elements placeholders */}
              <div className="flex-1 p-5 grid grid-cols-3 grid-rows-3 gap-4">
                {/* Slot 1: Clientes (Top row left) */}
                <div className="border border-dashed border-dove/30 rounded-[24px] flex items-center justify-center text-[10px] text-dove/60 font-semibold uppercase tracking-wider">
                  Módulo Clientes
                </div>
                {/* Slot 2: Ingresos (Top row middle) */}
                <div className="border border-dashed border-dove/30 rounded-[24px] flex items-center justify-center text-[10px] text-dove/60 font-semibold uppercase tracking-wider">
                  Módulo Finanzas
                </div>
                {/* Slot 3: Citas (Right column spans 3 rows) */}
                <div className="row-span-3 border border-dashed border-dove/30 rounded-[24px] flex items-center justify-center text-[10px] text-dove/60 font-semibold uppercase tracking-wider">
                  Módulo Agenda
                </div>
                {/* Slot 4: Revenue Chart (Spans 2 columns, bottom 2 rows) */}
                <div className="col-span-2 row-span-2 border border-dashed border-dove/30 rounded-[24px] flex items-center justify-center text-[10px] text-dove/60 font-semibold uppercase tracking-wider">
                  Gráfico de Rendimiento Semanal
                </div>
              </div>
            </main>
          </div>

          {/* B. FLYING / INTERPOLATED CARDS */}
          {/* Card 1: Clients Stats */}
          <ClientesCard
            style={{
              position: "absolute",
              left: `${scatteredCoords[0].left + (targetCoords[0].left - scatteredCoords[0].left) * easeT}%`,
              top: `${scatteredCoords[0].top + (targetCoords[0].top - scatteredCoords[0].top) * easeT}%`,
              width: `${scatteredCoords[0].width + (targetCoords[0].width - scatteredCoords[0].width) * easeT}%`,
              height: `${scatteredCoords[0].height + (targetCoords[0].height - scatteredCoords[0].height) * easeT}%`,
              transform: `rotate(${scatteredCoords[0].rotate + (0 - scatteredCoords[0].rotate) * easeT}deg) scale(${scatteredCoords[0].scale + (1 - scatteredCoords[0].scale) * easeT})`,
              transformOrigin: "center center",
              zIndex: 31,
            }}
            className={`${progress > 0.05 ? "pointer-events-auto" : "pointer-events-none"} ${isDocked ? "shadow-none border-dove/10" : ""}`}
          />

          {/* Card 2: Income Stats */}
          <IngresosCard
            style={{
              position: "absolute",
              left: `${scatteredCoords[1].left + (targetCoords[1].left - scatteredCoords[1].left) * easeT}%`,
              top: `${scatteredCoords[1].top + (targetCoords[1].top - scatteredCoords[1].top) * easeT}%`,
              width: `${scatteredCoords[1].width + (targetCoords[1].width - scatteredCoords[1].width) * easeT}%`,
              height: `${scatteredCoords[1].height + (targetCoords[1].height - scatteredCoords[1].height) * easeT}%`,
              transform: `rotate(${scatteredCoords[1].rotate + (0 - scatteredCoords[1].rotate) * easeT}deg) scale(${scatteredCoords[1].scale + (1 - scatteredCoords[1].scale) * easeT})`,
              transformOrigin: "center center",
              zIndex: 32,
            }}
            className={`${progress > 0.05 ? "pointer-events-auto" : "pointer-events-none"} ${isDocked ? "shadow-none border-dove/10" : ""}`}
          />

          {/* Card 3: Appointments List */}
          <CitasCard
            style={{
              position: "absolute",
              left: `${scatteredCoords[2].left + (targetCoords[2].left - scatteredCoords[2].left) * easeT}%`,
              top: `${scatteredCoords[2].top + (targetCoords[2].top - scatteredCoords[2].top) * easeT}%`,
              width: `${scatteredCoords[2].width + (targetCoords[2].width - scatteredCoords[2].width) * easeT}%`,
              height: `${scatteredCoords[2].height + (targetCoords[2].height - scatteredCoords[2].height) * easeT}%`,
              transform: `rotate(${scatteredCoords[2].rotate + (0 - scatteredCoords[2].rotate) * easeT}deg) scale(${scatteredCoords[2].scale + (1 - scatteredCoords[2].scale) * easeT})`,
              transformOrigin: "center center",
              zIndex: 33,
            }}
            className={`${progress > 0.05 ? "pointer-events-auto" : "pointer-events-none"} ${isDocked ? "shadow-none border-dove/10" : ""}`}
          />

          {/* Card 4: Revenue Chart */}
          <RevenueChartCard
            style={{
              position: "absolute",
              left: `${scatteredCoords[3].left + (targetCoords[3].left - scatteredCoords[3].left) * easeT}%`,
              top: `${scatteredCoords[3].top + (targetCoords[3].top - scatteredCoords[3].top) * easeT}%`,
              width: `${scatteredCoords[3].width + (targetCoords[3].width - scatteredCoords[3].width) * easeT}%`,
              height: `${scatteredCoords[3].height + (targetCoords[3].height - scatteredCoords[3].height) * easeT}%`,
              transform: `rotate(${scatteredCoords[3].rotate + (0 - scatteredCoords[3].rotate) * easeT}deg) scale(${scatteredCoords[3].scale + (1 - scatteredCoords[3].scale) * easeT})`,
              transformOrigin: "center center",
              zIndex: 34,
            }}
            className={`${progress > 0.05 ? "pointer-events-auto" : "pointer-events-none"} ${isDocked ? "shadow-none border-dove/10" : ""}`}
          />

          {/* Card 5: Quick Actions Panel */}
          <QuickActionsCard
            style={{
              position: "absolute",
              left: `${scatteredCoords[4].left + (targetCoords[4].left - scatteredCoords[4].left) * easeT}%`,
              top: `${scatteredCoords[4].top + (targetCoords[4].top - scatteredCoords[4].top) * easeT}%`,
              width: `${scatteredCoords[4].width + (targetCoords[4].width - scatteredCoords[4].width) * easeT}%`,
              height: `${scatteredCoords[4].height + (targetCoords[4].height - scatteredCoords[4].height) * easeT}%`,
              transform: `rotate(${scatteredCoords[4].rotate + (0 - scatteredCoords[4].rotate) * easeT}deg) scale(${scatteredCoords[4].scale + (1 - scatteredCoords[4].scale) * easeT})`,
              transformOrigin: "center center",
              zIndex: 35,
            }}
            className={`${progress > 0.05 ? "pointer-events-auto" : "pointer-events-none"} ${isDocked ? "shadow-none border-dove/10" : ""}`}
          />

        </div>
        
        {/* Scroll Indicator helper */}
        <div className="absolute bottom-6 flex flex-col items-center gap-1 opacity-60 text-xs text-graphite pointer-events-none animate-bounce">
          <span className="font-bold">Desliza hacia abajo</span>
          <div className="w-1 h-3 rounded-full bg-dove" />
        </div>
      </div>
    </div>
  );
}
