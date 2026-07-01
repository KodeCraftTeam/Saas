"use client";

import { useEffect, useState } from "react";
import { Building2, Users, TrendingUp, ArrowUpRight, RefreshCw, ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from "lucide-react";
import { getPlatformStats, getBusinesses, getUsers, Business, User, PlatformStats } from "@/features/super-admin/api";
import { useToast } from "@/shared/components/ui/Toast";

function useCounter(target: number, duration = 900) {
  const [val, setVal] = useState(0);
  useEffect(() => {
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

export default function SuperAdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { toast } = useToast();

  // Calendar State (Fixed to June 2026 for demonstration)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 24)); 

  const loadData = async () => {
    setLoading(true);
    try {
      const [s, b, u] = await Promise.all([
        getPlatformStats(),
        getBusinesses(),
        getUsers(),
      ]);
      setStats(s);
      setBusinesses(b);
      setUsers(u);
    } catch (e) {
      console.error("Error loading dashboard data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    loadData();
  }, []);

  const handleRefresh = async () => {
    await loadData();
    toast({
      title: "Datos actualizados",
      description: "Las estadísticas y métricas del sistema se han refrescado con éxito.",
      variant: "success"
    });
  };

  const businessCount = useCounter(stats?.activeBusinesses ?? 0);
  const userCount = useCounter(stats?.registeredUsers ?? 0);
  const revenueCount = useCounter(stats?.platformRevenue ?? 0);

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleDateString("es-CO", { month: "long" });

  const firstDayIndex = new Date(year, month, 1).getDay();
  const startDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // start on Monday
  const totalDays = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push(i);
  }

  // Mock Calendar Events for visual excellence
  const getDayEvents = (day: number) => {
    if (day === 24) return { Citas: 18, Business: 1, color: "border-rust bg-apricot-wash/30 text-rust" };
    if (day === 10) return { Citas: 12, Business: 0, color: "border-dove bg-fog text-ink" };
    if (day === 15) return { Citas: 24, Business: 1, color: "border-rust bg-apricot-wash/20 text-rust" };
    if (day === 22) return { Citas: 45, Business: 0, color: "border-rust bg-apricot-wash/40 text-rust" };
    return null;
  };

  const changeMonth = (direction: "prev" | "next") => {
    setCurrentDate(new Date(year, direction === "prev" ? month - 1 : month + 1, 1));
  };

  if (!mounted) return null;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-pure-white text-ink font-sohne select-none antialiased">
      {/* ── Top Bar ── */}
      <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-dove/25 bg-pure-white px-8">
        <div className="flex items-center gap-2 text-[13px] font-[450] text-graphite tracking-[-0.009em]">
          <span>Plataforma</span>
          <span className="text-dove">/</span>
          <span className="font-[480] text-ink">Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Calendar Trigger */}
          <button 
            onClick={() => setIsCalendarOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-dove/30 bg-pure-white px-4 py-1.5 text-xs font-[450] text-ash hover:text-ink hover:border-graphite transition-all"
          >
            <CalendarIcon className="h-3.5 w-3.5 text-graphite" />
            Ver Actividad
          </button>
          <button 
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-full border border-dove/30 bg-pure-white px-4 py-1.5 text-xs font-[450] text-ash hover:text-ink hover:border-graphite transition-all disabled:opacity-50"
          >
            <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </button>
          <div className="flex items-center gap-2 pl-2">
            <span className="h-1.5 w-1.5 rounded-full bg-rust animate-pulse" />
            <span className="text-xs font-[450] text-graphite">Todo en orden</span>
          </div>
        </div>
      </header>

      {/* ── Scrollable Area (Fluid 100% width, no max-w-[1200px] layout constraints) ── */}
      <div className="flex-1 overflow-auto px-8 py-8 space-y-8 w-full">
        
        {/* ── Greeting ── */}
        <div className="animate-fade-in-up">
          <h1 className="font-signifier text-[44px] leading-[1.1] tracking-[-0.015em] text-ink font-normal capitalize">
            {greeting()}, David.
          </h1>
          <p className="mt-1.5 text-[14px] font-[450] text-graphite capitalize">{todayLabel()}</p>
        </div>

        {/* ── KPI Widgets (Warm / Cool / White cards) ── */}
        <div className="grid grid-cols-3 gap-6">
          {/* Warm Data Card */}
          <div className="rounded-cards bg-apricot-wash p-6 flex flex-col justify-between min-h-[160px] relative overflow-hidden transition-transform duration-200 hover:-translate-y-0.5">
            <div className="flex items-center justify-between z-10">
              <span className="text-xs font-bold text-rust uppercase tracking-wider">Negocios activos</span>
              {stats?.activeBusinessesDelta && (
                <span className="flex items-center gap-0.5 rounded-full bg-pure-white/80 px-2 py-0.5 text-[11px] font-bold text-rust">
                  <ArrowUpRight className="h-3 w-3" />
                  {stats.activeBusinessesDelta}
                </span>
              )}
            </div>
            <p className="font-signifier text-[44px] font-normal leading-none tracking-[-0.015em] text-rust z-10">
              {businessCount}
            </p>
            <Building2 className="absolute right-4 bottom-4 h-16 w-16 text-rust/10 pointer-events-none" />
          </div>

          {/* Cool Data Card */}
          <div className="rounded-cards bg-sky-wash p-6 flex flex-col justify-between min-h-[160px] relative overflow-hidden transition-transform duration-200 hover:-translate-y-0.5">
            <div className="flex items-center justify-between z-10">
              <span className="text-xs font-bold text-ink uppercase tracking-wider opacity-85">Usuarios registrados</span>
              {stats?.registeredUsersDelta && (
                <span className="flex items-center gap-0.5 rounded-full bg-pure-white/80 px-2 py-0.5 text-[11px] font-bold text-ink">
                  <ArrowUpRight className="h-3 w-3" />
                  {stats.registeredUsersDelta}
                </span>
              )}
            </div>
            <p className="font-signifier text-[44px] font-normal leading-none tracking-[-0.015em] text-ink z-10">
              {userCount}
            </p>
            <Users className="absolute right-4 bottom-4 h-16 w-16 text-ink/10 pointer-events-none" />
          </div>

          {/* Product Dashboard Card (White) */}
          <div className="rounded-cards bg-pure-white border border-dove/20 p-6 flex flex-col justify-between min-h-[160px] relative overflow-hidden shadow-subtle transition-transform duration-200 hover:-translate-y-0.5">
            <div className="flex items-center justify-between z-10">
              <span className="text-xs font-bold text-graphite uppercase tracking-wider">Ingresos plataforma (USD)</span>
            </div>
            <p className="font-signifier text-[44px] font-normal leading-none tracking-[-0.015em] text-ink z-10">
              ${revenueCount}
            </p>
            <TrendingUp className="absolute right-4 bottom-4 h-16 w-16 text-graphite/10 pointer-events-none" />
          </div>
        </div>

        {/* ── Lists Grid (Full 100% Width side-by-side layout) ── */}
        <div className="grid grid-cols-2 gap-6 w-full">
          {/* Recent Businesses Card */}
          <div className="rounded-cards bg-pure-white border border-dove/20 p-6 shadow-subtle flex flex-col min-h-[350px]">
            <div className="flex items-center justify-between border-b border-dove/10 pb-4 mb-4">
              <h2 className="text-base font-[480] tracking-[-0.009em] text-ink">Negocios Recientes</h2>
              <span className="rounded-full bg-fog px-3 py-1 text-xs font-bold text-graphite border border-dove/10">
                {businesses.length} total
              </span>
            </div>
            
            {loading ? (
              <div className="flex-1 flex items-center justify-center text-sm text-graphite font-normal">Cargando...</div>
            ) : (
              <div className="flex-1 space-y-3.5">
                {businesses.slice(0, 4).map((b) => (
                  <div key={b.id} className="flex items-center justify-between rounded-xl bg-fog/50 p-3 border border-dove/10 hover:border-dove/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-apricot-wash text-xs font-medium text-rust">
                        {b.name.charAt(0).toUpperCase()}
                      </span>
                      <div>
                        <p className="text-sm font-[480] text-ink">{b.name}</p>
                        <p className="text-xs text-graphite">{b.cityName || "Bogotá"} • {b.type}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-pure-white px-2.5 py-0.5 text-xs font-medium text-rust border border-dove/15">
                      Activo
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Users Card */}
          <div className="rounded-cards bg-pure-white border border-dove/20 p-6 shadow-subtle flex flex-col min-h-[350px]">
            <div className="flex items-center justify-between border-b border-dove/10 pb-4 mb-4">
              <h2 className="text-base font-[480] tracking-[-0.009em] text-ink">Usuarios Recientes</h2>
              <span className="rounded-full bg-fog px-3 py-1 text-xs font-bold text-graphite border border-dove/10">
                {users.length} total
              </span>
            </div>

            {loading ? (
              <div className="flex-1 flex items-center justify-center text-sm text-graphite font-normal">Cargando...</div>
            ) : (
              <div className="flex-1 space-y-3.5">
                {users.slice(0, 4).map((u) => (
                  <div key={u.id} className="flex items-center justify-between rounded-xl bg-fog/50 p-3 border border-dove/10 hover:border-dove/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-sky-wash text-xs font-medium text-ink">
                        {u.name.charAt(0).toUpperCase()}
                      </span>
                      <div>
                        <p className="text-sm font-[480] text-ink">{u.name} {u.lastName}</p>
                        <p className="text-xs text-graphite">{u.email} • {u.role}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-pure-white px-2.5 py-0.5 text-xs font-medium text-ink border border-dove/15">
                      Activo
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Sidedrawer for Calendar (Steep style drawer) ── */}
      {isCalendarOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-end bg-ink/40 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setIsCalendarOpen(false)}
        >
          <div 
            className="h-full w-full max-w-md bg-pure-white p-6 shadow-subtle flex flex-col justify-between animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between border-b border-dove/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-apricot-wash rounded-xl flex items-center justify-center text-rust">
                    <CalendarIcon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-base font-[480] text-ink">Actividad Global</h3>
                    <p className="text-[11px] text-graphite">Registro de actividad diaria</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCalendarOpen(false)}
                  className="rounded-full p-1.5 hover:bg-fog transition-colors"
                >
                  <X className="h-5 w-5 text-ash" />
                </button>
              </div>

              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4 px-1">
                <span className="text-sm font-semibold text-ink capitalize">
                  {monthName} {year}
                </span>
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => changeMonth("prev")} 
                    className="rounded-full p-1 border border-dove/20 hover:bg-fog text-ash hover:text-ink transition-all"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    onClick={() => changeMonth("next")}
                    className="rounded-full p-1 border border-dove/20 hover:bg-fog text-ash hover:text-ink transition-all"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Compact Calendar Grid */}
              <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
                {["L", "M", "M", "J", "V", "S", "D"].map((d, idx) => (
                  <span key={`${d}-${idx}`} className="font-bold text-graphite uppercase py-1">
                    {d}
                  </span>
                ))}
                {calendarDays.map((day, idx) => {
                  if (day === null) {
                    return <div key={`empty-${idx}`} className="h-10 rounded-lg bg-fog/20" />;
                  }

                  const events = getDayEvents(day);
                  const isToday = day === 24 && month === 5 && year === 2026;

                  return (
                    <div 
                      key={`day-${day}`}
                      title={events ? `${events.Citas} citas${events.Business ? `, ${events.Business} negocio` : ''}` : undefined}
                      className={`h-10 rounded-lg border flex flex-col items-center justify-center relative cursor-pointer transition-all ${
                        isToday 
                          ? "border-rust bg-apricot-wash text-rust font-bold" 
                          : events 
                          ? `${events.color} border` 
                          : "border-dove/10 bg-pure-white text-ink hover:border-graphite"
                      }`}
                    >
                      <span>{day}</span>
                      {events && (
                        <span className="absolute bottom-1 h-1 w-1 rounded-full bg-rust" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Day details section */}
              <div className="mt-6 border-t border-dove/10 pt-4">
                <h4 className="text-xs font-bold text-graphite uppercase tracking-wider mb-3">Detalle de Actividad</h4>
                <div className="rounded-xl bg-fog p-3 border border-dove/15 space-y-2">
                  <p className="text-xs font-semibold text-ink">Miércoles, 24 de Junio de 2026 (Hoy)</p>
                  <div className="flex items-center justify-between text-xs text-ash">
                    <span>Citas Agendadas:</span>
                    <span className="font-semibold text-ink">18 citas</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-ash">
                    <span>Nuevos Negocios:</span>
                    <span className="font-semibold text-ink">1 negocio</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer (Pill Shaped Ink Button) */}
            <button
              onClick={() => setIsCalendarOpen(false)}
              className="w-full rounded-full bg-ink py-2 text-[15px] font-[450] text-pure-white hover:bg-ink/90 transition-colors mt-6"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
