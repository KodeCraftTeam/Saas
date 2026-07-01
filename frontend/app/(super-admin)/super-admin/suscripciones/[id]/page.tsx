"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBusinesses, Business } from "@/features/super-admin/api";
import { getMockSubscription, SubscriptionPlan, MockSubscription } from "@/features/super-admin/subscription-mock";
import { useToast } from "@/shared/components/ui/Toast";
import {
  ArrowLeft, Building2, Mail, Phone, MapPin, CalendarPlus,
  CheckCircle2, XCircle, Minus, Plus as PlusIcon, RefreshCw,
} from "lucide-react";

const PLAN_BADGE_STYLE: Record<SubscriptionPlan, string> = {
  "Básico": "bg-fog text-graphite border border-dove/15",
  "Pro": "bg-sky-wash text-ink border border-transparent",
  "Empresa": "bg-apricot-wash text-rust border border-transparent",
  "Personalizado": "bg-ink text-pure-white border border-transparent",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
}

function buildPaymentHistory(sub: MockSubscription) {
  const history = [];
  const cursor = new Date(sub.lastPayment);
  for (let i = 0; i < 4; i++) {
    history.push(new Date(cursor));
    cursor.setMonth(cursor.getMonth() - 1);
  }
  return history;
}

export default function SuscripcionDetallePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { toast } = useToast();

  const [business, setBusiness] = useState<Business | null>(null);
  const [sub, setSub] = useState<MockSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [sucursales, setSucursales] = useState(1);
  const [barberos, setBarberos] = useState(2);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const list = await getBusinesses();
        const index = list.findIndex((b) => b.id === params.id);
        const found = list[index] ?? null;
        setBusiness(found);
        if (found) setSub(getMockSubscription(found, Math.max(index, 0)));
      } catch (e) {
        console.error("Error loading negocio:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  const toggleStatus = () => {
    setSub((prev) => (prev ? { ...prev, status: prev.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE" } : prev));
  };

  const changePlan = (plan: SubscriptionPlan) => {
    setSub((prev) => (prev ? { ...prev, plan } : prev));
  };

  const extendPayment = (days: number) => {
    setSub((prev) => {
      if (!prev) return prev;
      const next = new Date(prev.nextPayment);
      next.setDate(next.getDate() + days);
      return { ...prev, nextPayment: next.toISOString() };
    });
    toast({ title: "Fecha actualizada", description: `Próximo pago extendido ${days} días.`, variant: "success" });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-pure-white">
        <RefreshCw className="h-5 w-5 text-graphite animate-spin" />
      </div>
    );
  }

  if (!business || !sub) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3 bg-pure-white">
        <p className="text-sm text-graphite">Negocio no encontrado.</p>
        <button
          onClick={() => router.push("/super-admin/suscripciones")}
          className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 text-xs font-[450] text-pure-white hover:bg-ink/90 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver a Suscripciones
        </button>
      </div>
    );
  }

  const history = buildPaymentHistory(sub);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-pure-white text-ink font-sohne select-none antialiased">
      {/* ── Top Bar ── */}
      <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-dove/25 bg-pure-white px-8">
        <div className="flex items-center gap-2 text-[13px] font-[450] text-graphite tracking-[-0.009em]">
          <span>Plataforma</span>
          <span className="text-dove">/</span>
          <button onClick={() => router.push("/super-admin/suscripciones")} className="hover:text-ink transition-colors">
            Suscripciones
          </button>
          <span className="text-dove">/</span>
          <span className="font-[480] text-ink">{business.name}</span>
        </div>
        <button
          onClick={() => router.push("/super-admin/suscripciones")}
          className="flex items-center gap-1.5 rounded-full border border-dove/30 bg-pure-white px-4 py-1.5 text-xs font-[450] text-ash hover:text-ink hover:border-graphite transition-all"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver
        </button>
      </header>

      {/* ── Main Content Area ── */}
      <div className="flex-1 overflow-auto px-8 py-8 space-y-8 w-full">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-apricot-wash text-lg font-medium text-rust">
            {business.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <h1 className="font-signifier text-[32px] font-normal leading-tight tracking-[-0.015em] text-ink">
              {business.name}
            </h1>
            <p className="mt-1 text-sm text-graphite">{business.type} · {business.cityName || "Sin ciudad"}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* ── Info del negocio ── */}
          <div className="rounded-cards bg-pure-white border border-dove/20 shadow-subtle p-6">
            <h2 className="text-base font-[480] text-ink mb-4">Información del negocio</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-ash">
                <Mail className="h-3.5 w-3.5 text-graphite flex-shrink-0" /> {business.email}
              </div>
              <div className="flex items-center gap-2 text-ash">
                <Phone className="h-3.5 w-3.5 text-graphite flex-shrink-0" /> {business.phone}
              </div>
              <div className="flex items-center gap-2 text-ash">
                <MapPin className="h-3.5 w-3.5 text-graphite flex-shrink-0" /> {business.address}
              </div>
              <div className="flex items-center gap-2 text-ash">
                <Building2 className="h-3.5 w-3.5 text-graphite flex-shrink-0" /> {business.type}
              </div>
            </div>
          </div>

          {/* ── Estado de suscripción ── */}
          <div className="rounded-cards bg-pure-white border border-dove/20 shadow-subtle p-6">
            <h2 className="text-base font-[480] text-ink mb-4">Suscripción</h2>

            <label className="block text-[11px] font-bold text-graphite uppercase tracking-wider mb-1.5">Plan actual</label>
            <select
              value={sub.plan}
              onChange={(e) => changePlan(e.target.value as SubscriptionPlan)}
              className={`w-full rounded-full px-3 py-1.5 text-sm font-[500] focus:outline-none cursor-pointer mb-4 ${PLAN_BADGE_STYLE[sub.plan]}`}
            >
              <option value="Básico">Básico</option>
              <option value="Pro">Pro</option>
              <option value="Empresa">Empresa</option>
              <option value="Personalizado">Personalizado</option>
            </select>

            <label className="block text-[11px] font-bold text-graphite uppercase tracking-wider mb-1.5">Estado</label>
            <button
              onClick={toggleStatus}
              className={`w-full flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-[500] transition-colors ${
                sub.status === "ACTIVE"
                  ? "bg-[#f0fdf4] text-emerald-600 hover:bg-[#e3fbe9]"
                  : "bg-fog text-graphite hover:bg-dove/15"
              }`}
            >
              {sub.status === "ACTIVE" ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              {sub.status === "ACTIVE" ? "Activo — clic para suspender" : "Suspendido — clic para activar"}
            </button>

            {sub.plan === "Personalizado" && (
              <div className="mt-4 space-y-3 border-t border-dove/10 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink">Sucursales</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setSucursales((v) => Math.max(1, v - 1))} className="flex h-6 w-6 items-center justify-center rounded-full border border-dove/30 text-graphite hover:border-graphite hover:text-ink transition-colors">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-5 text-center text-sm font-[480]">{sucursales}</span>
                    <button onClick={() => setSucursales((v) => v + 1)} className="flex h-6 w-6 items-center justify-center rounded-full border border-dove/30 text-graphite hover:border-graphite hover:text-ink transition-colors">
                      <PlusIcon className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink">Barberos</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setBarberos((v) => Math.max(1, v - 1))} className="flex h-6 w-6 items-center justify-center rounded-full border border-dove/30 text-graphite hover:border-graphite hover:text-ink transition-colors">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-5 text-center text-sm font-[480]">{barberos}</span>
                    <button onClick={() => setBarberos((v) => v + 1)} className="flex h-6 w-6 items-center justify-center rounded-full border border-dove/30 text-graphite hover:border-graphite hover:text-ink transition-colors">
                      <PlusIcon className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Ciclo de pago ── */}
          <div className="rounded-cards bg-apricot-wash p-6">
            <h2 className="text-base font-[480] text-rust mb-4">Ciclo de pago</h2>
            <p className="text-[11px] font-bold text-rust/70 uppercase tracking-wider">Último pago</p>
            <p className="text-sm font-[480] text-rust mt-0.5">{formatDate(sub.lastPayment)}</p>

            <p className="text-[11px] font-bold text-rust/70 uppercase tracking-wider mt-4">Próximo pago</p>
            <p className="text-sm font-[480] text-rust mt-0.5">{formatDate(sub.nextPayment)}</p>

            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => extendPayment(15)}
                className="flex items-center gap-1 rounded-full bg-pure-white/70 px-3 py-1.5 text-xs font-[500] text-rust hover:bg-pure-white transition-colors"
              >
                <CalendarPlus className="h-3 w-3" /> +15 días
              </button>
              <button
                onClick={() => extendPayment(30)}
                className="flex items-center gap-1 rounded-full bg-pure-white/70 px-3 py-1.5 text-xs font-[500] text-rust hover:bg-pure-white transition-colors"
              >
                <CalendarPlus className="h-3 w-3" /> +1 mes
              </button>
            </div>
          </div>
        </div>

        {/* ── Historial de pagos ── */}
        <div className="rounded-cards bg-pure-white border border-dove/20 shadow-subtle overflow-hidden">
          <div className="border-b border-dove/10 px-6 py-4">
            <h2 className="text-base font-[480] tracking-[-0.009em] text-ink">Historial de pagos</h2>
            <p className="text-xs text-graphite mt-0.5">Últimos ciclos facturados</p>
          </div>
          <div className="divide-y divide-dove/10">
            {history.map((date, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-3.5">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-fog text-graphite">
                    <CalendarPlus className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-sm text-ink">{formatDate(date.toISOString())}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0fdf4] px-2.5 py-0.5 text-xs font-medium text-emerald-600">
                  Pagado
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
