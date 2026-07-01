"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBusinesses, Business } from "@/features/super-admin/api";
import { getMockSubscription, SubscriptionPlan, SubscriptionStatus } from "@/features/super-admin/subscription-mock";
import { Check, Sparkles, RefreshCw, Minus, Plus as PlusIcon, Pencil, CalendarPlus } from "lucide-react";

const PLANS = [
  {
    name: "Básico",
    price: "$29",
    period: "/mes",
    description: "Para un negocio único que está empezando.",
    features: ["1 negocio", "Agenda de citas", "Hasta 2 barberos/estilistas", "Soporte por email"],
    highlight: false,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/mes",
    description: "Para negocios en crecimiento con varias sedes.",
    features: ["Hasta 3 sucursales", "Analítica de rendimiento", "Barberos ilimitados", "Soporte prioritario"],
    highlight: true,
  },
  {
    name: "Empresa",
    price: "$199",
    period: "/mes",
    description: "Para cadenas y franquicias sin límites.",
    features: ["Sucursales ilimitadas", "Acceso a API", "Marca blanca", "Soporte dedicado 24/7"],
    highlight: false,
  },
];

const TOGGLE_MODULES = [
  { key: "analitica", label: "Analítica avanzada", price: 20 },
  { key: "api", label: "Acceso a API", price: 25 },
  { key: "marca_blanca", label: "Marca blanca (white-label)", price: 30 },
  { key: "soporte", label: "Soporte prioritario 24/7", price: 18 },
  { key: "exportacion", label: "Exportación de reportes", price: 10 },
];

const BASE_PRICE = 29;
const SUCURSAL_INCLUIDA = 1;
const PRECIO_POR_SUCURSAL = 12;
const BARBEROS_INCLUIDOS = 2;
const PRECIO_POR_BARBERO = 5;

const PLAN_BADGE_STYLE: Record<SubscriptionPlan, string> = {
  "Básico": "bg-fog text-graphite border border-dove/15",
  "Pro": "bg-sky-wash text-ink border border-transparent",
  "Empresa": "bg-apricot-wash text-rust border border-transparent",
  "Personalizado": "bg-ink text-pure-white border border-transparent",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" });
}

export default function SuscripcionesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [subs, setSubs] = useState<Record<string, ReturnType<typeof getMockSubscription>>>({});
  const [selectedModules, setSelectedModules] = useState<Set<string>>(new Set());
  const [sucursales, setSucursales] = useState(SUCURSAL_INCLUIDA);
  const [barberos, setBarberos] = useState(BARBEROS_INCLUIDOS);

  const loadData = async () => {
    setLoading(true);
    try {
      const bList = await getBusinesses();
      setBusinesses(bList);
      const initial: Record<string, ReturnType<typeof getMockSubscription>> = {};
      bList.forEach((b, i) => (initial[b.id] = getMockSubscription(b, i)));
      setSubs(initial);
    } catch (e) {
      console.error("Error loading suscripciones:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleModule = (key: string) => {
    setSelectedModules((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const customTotal =
    BASE_PRICE +
    Math.max(0, sucursales - SUCURSAL_INCLUIDA) * PRECIO_POR_SUCURSAL +
    Math.max(0, barberos - BARBEROS_INCLUIDOS) * PRECIO_POR_BARBERO +
    TOGGLE_MODULES.filter((m) => selectedModules.has(m.key)).reduce((sum, m) => sum + m.price, 0);

  const toggleStatus = (id: string) => {
    setSubs((prev) => ({
      ...prev,
      [id]: { ...prev[id], status: prev[id].status === "ACTIVE" ? "SUSPENDED" : "ACTIVE" },
    }));
  };

  const changePlan = (id: string, plan: SubscriptionPlan) => {
    setSubs((prev) => ({ ...prev, [id]: { ...prev[id], plan } }));
  };

  const extendPayment = (id: string, days: number) => {
    setSubs((prev) => {
      const current = new Date(prev[id].nextPayment);
      current.setDate(current.getDate() + days);
      return { ...prev, [id]: { ...prev[id], nextPayment: current.toISOString() } };
    });
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-pure-white text-ink font-sohne select-none antialiased">
      {/* ── Top Bar ── */}
      <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-dove/25 bg-pure-white px-8">
        <div className="flex items-center gap-2 text-[13px] font-[450] text-graphite tracking-[-0.009em]">
          <span>Plataforma</span>
          <span className="text-dove">/</span>
          <span className="font-[480] text-ink">Suscripciones</span>
        </div>
        <button
          onClick={loadData}
          disabled={loading}
          className="flex items-center gap-1.5 rounded-full border border-dove/30 bg-pure-white px-4 py-1.5 text-xs font-[450] text-ash hover:text-ink hover:border-graphite transition-all disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          Recargar
        </button>
      </header>

      {/* ── Main Content Area ── */}
      <div className="flex-1 overflow-auto px-8 py-8 space-y-8 w-full">
        <div>
          <h1 className="font-signifier text-[44px] font-normal leading-tight tracking-[-0.015em] text-ink">
            Planes de Suscripción
          </h1>
          <p className="mt-1.5 text-[15px] text-ash font-[430]">
            Los niveles que ofrecemos y quién los está usando ahora mismo.
          </p>
        </div>

        {/* ── Plan cards ── */}
        <div className="grid grid-cols-3 gap-5">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-cards p-6 flex flex-col relative ${
                plan.highlight ? "bg-ink text-pure-white" : "bg-pure-white border border-dove/20 shadow-subtle text-ink"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-6 flex items-center gap-1 rounded-full bg-rust px-3 py-1 text-[11px] font-bold text-pure-white">
                  <Sparkles className="h-3 w-3" />
                  Más popular
                </span>
              )}
              <p className={`text-sm font-[480] ${plan.highlight ? "text-pure-white/70" : "text-graphite"}`}>{plan.name}</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-signifier text-[36px] leading-none">{plan.price}</span>
                <span className={`text-sm ${plan.highlight ? "text-pure-white/60" : "text-graphite"}`}>{plan.period}</span>
              </div>
              <p className={`mt-3 text-xs leading-snug ${plan.highlight ? "text-pure-white/70" : "text-graphite"}`}>
                {plan.description}
              </p>
              <div className={`my-5 h-px ${plan.highlight ? "bg-pure-white/15" : "bg-dove/15"}`} />
              <ul className="space-y-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-3.5 w-3.5 flex-shrink-0 text-rust" />
                    <span className={plan.highlight ? "text-pure-white/90" : "text-ink"}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Personalizado ── */}
        <div className="rounded-cards bg-pure-white border border-dove/20 shadow-subtle overflow-hidden">
          <div className="border-b border-dove/10 px-6 py-4">
            <h2 className="text-base font-[480] tracking-[-0.009em] text-ink">Plan Personalizado</h2>
            <p className="text-xs text-graphite mt-0.5">Define exactamente lo que necesita este negocio</p>
          </div>

          <div className="p-6 grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-5">
              {/* Sucursales stepper */}
              <div className="flex items-center justify-between rounded-[14px] border border-dove/20 px-4 py-3.5">
                <div>
                  <p className="text-sm font-[480] text-ink">Sucursales</p>
                  <p className="text-xs text-graphite mt-0.5">1 incluida · +${PRECIO_POR_SUCURSAL} c/u adicional</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSucursales((v) => Math.max(1, v - 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-dove/30 text-graphite hover:border-graphite hover:text-ink transition-colors"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-[480] text-ink">{sucursales}</span>
                  <button
                    onClick={() => setSucursales((v) => v + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-dove/30 text-graphite hover:border-graphite hover:text-ink transition-colors"
                  >
                    <PlusIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Barberos stepper */}
              <div className="flex items-center justify-between rounded-[14px] border border-dove/20 px-4 py-3.5">
                <div>
                  <p className="text-sm font-[480] text-ink">Barberos / estilistas</p>
                  <p className="text-xs text-graphite mt-0.5">2 incluidos · +${PRECIO_POR_BARBERO} c/u adicional</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setBarberos((v) => Math.max(1, v - 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-dove/30 text-graphite hover:border-graphite hover:text-ink transition-colors"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-[480] text-ink">{barberos}</span>
                  <button
                    onClick={() => setBarberos((v) => v + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-dove/30 text-graphite hover:border-graphite hover:text-ink transition-colors"
                  >
                    <PlusIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Toggle modules */}
              <div className="grid grid-cols-2 gap-3">
                {TOGGLE_MODULES.map((mod) => {
                  const active = selectedModules.has(mod.key);
                  return (
                    <button
                      key={mod.key}
                      onClick={() => toggleModule(mod.key)}
                      className={`flex items-center justify-between gap-3 rounded-[14px] border px-4 py-3 text-left transition-colors ${
                        active ? "border-rust/30 bg-apricot-wash" : "border-dove/20 bg-pure-white hover:border-dove/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border ${
                            active ? "border-rust bg-rust text-pure-white" : "border-dove/40 bg-pure-white"
                          }`}
                        >
                          {active && <Check className="h-3 w-3" />}
                        </span>
                        <span className={`text-sm font-[480] ${active ? "text-rust" : "text-ink"}`}>{mod.label}</span>
                      </div>
                      <span className={`text-xs font-medium ${active ? "text-rust" : "text-graphite"}`}>+${mod.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[16px] bg-fog p-5 flex flex-col justify-between">
              <div className="space-y-3 text-sm text-ink">
                <div className="flex items-center justify-between">
                  <span className="text-graphite">Base</span>
                  <span className="font-[480]">${BASE_PRICE}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-graphite">Sucursales</span>
                  <span className="font-[480]">{sucursales}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-graphite">Barberos</span>
                  <span className="font-[480]">{barberos}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-graphite">Módulos extra</span>
                  <span className="font-[480]">{selectedModules.size}</span>
                </div>
              </div>
              <div className="mt-6 border-t border-dove/15 pt-4">
                <p className="text-[11px] font-bold text-graphite uppercase tracking-wider">Total estimado</p>
                <p className="font-signifier text-[32px] text-ink leading-none mt-1">
                  ${customTotal} <span className="text-sm font-sohne text-graphite">/mes</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Negocios con suscripción ── */}
        <div className="rounded-cards bg-pure-white border border-dove/20 shadow-subtle overflow-hidden">
          <div className="flex items-center justify-between border-b border-dove/10 px-6 py-4">
            <div>
              <h2 className="text-base font-[480] tracking-[-0.009em] text-ink">Negocios con suscripción</h2>
              <p className="text-xs text-graphite mt-0.5">Estado, ciclo de pago y plan de cada negocio</p>
            </div>
            <span className="rounded-full bg-fog px-3 py-1 text-xs font-bold text-graphite border border-dove/10">
              {businesses.length} negocios
            </span>
          </div>

          {loading ? (
            <div className="px-6 py-12 text-center text-sm text-graphite">Cargando suscripciones...</div>
          ) : businesses.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-graphite">No hay negocios registrados.</div>
          ) : (
            <div className="divide-y divide-dove/10">
              {businesses.map((b) => {
                const sub = subs[b.id];
                if (!sub) return null;
                return (
                  <div key={b.id} className="flex items-center gap-4 px-6 py-4 hover:bg-fog/30 transition-colors">
                    {/* Negocio */}
                    <div className="flex items-center gap-3 flex-[1.4] min-w-0">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-apricot-wash text-xs font-medium text-rust">
                        {b.name.charAt(0).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-[480] text-ink truncate">{b.name}</p>
                        <p className="text-xs text-graphite truncate">{b.cityName || "Sin ciudad"}</p>
                      </div>
                    </div>

                    {/* Plan */}
                    <div className="flex-1">
                      <select
                        value={sub.plan}
                        onChange={(e) => changePlan(b.id, e.target.value as SubscriptionPlan)}
                        className={`rounded-full px-3 py-1 text-xs font-[500] focus:outline-none cursor-pointer ${PLAN_BADGE_STYLE[sub.plan]}`}
                      >
                        <option value="Básico">Básico</option>
                        <option value="Pro">Pro</option>
                        <option value="Empresa">Empresa</option>
                        <option value="Personalizado">Personalizado</option>
                      </select>
                    </div>

                    {/* Estado toggle */}
                    <div className="flex-1">
                      <button
                        onClick={() => toggleStatus(b.id)}
                        className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-[500] transition-colors ${
                          sub.status === "ACTIVE"
                            ? "bg-[#f0fdf4] text-emerald-600 hover:bg-[#e3fbe9]"
                            : "bg-fog text-graphite hover:bg-dove/15"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${sub.status === "ACTIVE" ? "bg-emerald-500" : "bg-dove"}`} />
                        {sub.status === "ACTIVE" ? "Activo" : "Suspendido"}
                      </button>
                    </div>

                    {/* Fechas */}
                    <div className="flex-[1.3] text-xs text-graphite space-y-0.5">
                      <p>Último pago: <span className="text-ink font-[480]">{formatDate(sub.lastPayment)}</span></p>
                      <p className="flex items-center gap-1.5">
                        Próximo: <span className="text-ink font-[480]">{formatDate(sub.nextPayment)}</span>
                        <button
                          onClick={() => extendPayment(b.id, 15)}
                          title="Extender 15 días"
                          className="ml-1 flex items-center gap-0.5 rounded-full border border-dove/20 px-1.5 py-0.5 text-[10px] hover:border-graphite hover:text-ink transition-colors"
                        >
                          <CalendarPlus className="h-2.5 w-2.5" /> 15d
                        </button>
                        <button
                          onClick={() => extendPayment(b.id, 30)}
                          title="Extender 1 mes"
                          className="flex items-center gap-0.5 rounded-full border border-dove/20 px-1.5 py-0.5 text-[10px] hover:border-graphite hover:text-ink transition-colors"
                        >
                          <CalendarPlus className="h-2.5 w-2.5" /> 1m
                        </button>
                      </p>
                    </div>

                    {/* Acciones */}
                    <div className="flex-shrink-0">
                      <Link
                        href={`/super-admin/suscripciones/${b.id}`}
                        className="flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-xs font-[450] text-pure-white hover:bg-ink/90 transition-colors"
                      >
                        <Pencil className="h-3 w-3" />
                        Editar
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
