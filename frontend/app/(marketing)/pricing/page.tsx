"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, Minus, Sparkles, ChevronDown } from "lucide-react";

const PLANS = [
  {
    name: "Básico",
    tagline: "Para un negocio único que está empezando.",
    monthly: 29,
    yearly: 23,
    highlight: false,
    features: ["1 negocio", "Hasta 2 barberos/estilistas", "200 citas al mes", "100 clientes registrados", "Soporte por email"],
  },
  {
    name: "Pro",
    tagline: "Para negocios en crecimiento con varias sedes.",
    monthly: 79,
    yearly: 63,
    highlight: true,
    features: ["Hasta 3 sucursales", "Barberos ilimitados", "Citas ilimitadas", "Analítica de rendimiento", "Recordatorios automáticos", "Soporte prioritario"],
  },
  {
    name: "Empresa",
    tagline: "Para cadenas y franquicias sin límites.",
    monthly: 199,
    yearly: 159,
    highlight: false,
    features: ["Sucursales ilimitadas", "Acceso a API", "Marca blanca", "Analítica avanzada", "Soporte dedicado 24/7"],
  },
];

const COMPARISON_ROWS: { label: string; values: [string | boolean, string | boolean, string | boolean] }[] = [
  { label: "Sucursales", values: ["1", "Hasta 3", "Ilimitadas"] },
  { label: "Barberos / estilistas", values: ["Hasta 2", "Ilimitados", "Ilimitados"] },
  { label: "Citas por mes", values: ["200", "Ilimitadas", "Ilimitadas"] },
  { label: "Clientes registrados", values: ["100", "Ilimitados", "Ilimitados"] },
  { label: "Analítica de rendimiento", values: [false, true, true] },
  { label: "Recordatorios automáticos", values: [false, true, true] },
  { label: "Pagos en línea", values: [false, true, true] },
  { label: "Acceso a API", values: [false, false, true] },
  { label: "Marca blanca", values: [false, false, true] },
  { label: "Soporte", values: ["Email", "Prioritario", "Dedicado 24/7"] },
];

const FAQS = [
  { q: "¿Puedo cambiar de plan en cualquier momento?", a: "Sí. Puedes subir o bajar de plan cuando quieras — el cambio aplica en tu siguiente ciclo de facturación, sin penalizaciones." },
  { q: "¿Qué pasa si supero el límite de citas de mi plan?", a: "Te avisamos antes de llegar al límite. Puedes actualizar a un plan superior en un clic sin perder tu historial." },
  { q: "¿Hay algún costo de instalación o contrato mínimo?", a: "No. Sin costos ocultos, sin permanencia mínima. Cancelas cuando quieras." },
  { q: "¿El plan Empresa incluye soporte para múltiples países?", a: "Sí, el plan Empresa incluye soporte multi-región y facturación consolidada para cadenas con presencia en varios países." },
];

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="w-full bg-pure-white overflow-hidden">
      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center px-6 pt-24 pb-16 text-center">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 20%, rgba(251, 225, 209, 0.45), rgba(211, 227, 252, 0.25), transparent)",
          }}
        />

        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-apricot-wash px-4 py-1.5 text-[13px] font-[500] text-rust mb-6"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Precios simples, sin sorpresas
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl font-[family-name:var(--font-signifier)] text-[56px] md:text-[64px] font-normal leading-[1.08] tracking-[-0.02em] text-ink"
        >
          Un plan para cada etapa de tu barbería
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 max-w-xl text-[18px] leading-[1.5] text-ash"
        >
          Empieza gratis, crece cuando lo necesites. Cambia o cancela cuando quieras, sin letra pequeña.
        </motion.p>

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 inline-flex items-center gap-1 rounded-full border border-dove/25 bg-fog p-1"
        >
          <button
            onClick={() => setYearly(false)}
            className={`relative rounded-full px-5 py-2 text-[14px] font-[480] transition-colors z-10 ${
              !yearly ? "text-pure-white" : "text-graphite hover:text-ink"
            }`}
          >
            {!yearly && (
              <motion.span layoutId="billing-pill" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
            )}
            Mensual
          </button>
          <button
            onClick={() => setYearly(true)}
            className={`relative flex items-center gap-2 rounded-full px-5 py-2 text-[14px] font-[480] transition-colors z-10 ${
              yearly ? "text-pure-white" : "text-graphite hover:text-ink"
            }`}
          >
            {yearly && (
              <motion.span layoutId="billing-pill" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
            )}
            Anual
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${yearly ? "bg-pure-white/20 text-pure-white" : "bg-apricot-wash text-rust"}`}>
              -20%
            </span>
          </button>
        </motion.div>
      </section>

      {/* ── Plan cards ── */}
      <section className="px-6 pb-24" style={{ perspective: 1200 }}>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TiltCard
                className={`relative rounded-[28px] p-8 flex flex-col h-full ${
                  plan.highlight
                    ? "bg-ink text-pure-white shadow-[0_30px_60px_-15px_rgba(23,25,28,0.35)]"
                    : "bg-pure-white border border-dove/20 shadow-[0_20px_40px_-15px_rgba(4,23,43,0.08)]"
                } ${plan.highlight ? "md:scale-105 md:z-10" : ""}`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-rust px-4 py-1.5 text-[12px] font-bold text-pure-white shadow-md">
                    <Sparkles className="h-3 w-3" />
                    Más popular
                  </span>
                )}

                <p className={`text-[15px] font-[500] ${plan.highlight ? "text-pure-white/70" : "text-graphite"}`}>{plan.name}</p>

                <div className="mt-4 flex items-baseline gap-1.5" style={{ transformStyle: "preserve-3d" }}>
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={yearly ? `${plan.name}-y` : `${plan.name}-m`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="font-[family-name:var(--font-signifier)] text-[48px] leading-none"
                    >
                      ${yearly ? plan.yearly : plan.monthly}
                    </motion.span>
                  </AnimatePresence>
                  <span className={`text-[14px] ${plan.highlight ? "text-pure-white/60" : "text-graphite"}`}>/mes</span>
                </div>
                {yearly && (
                  <p className={`mt-1 text-[12px] ${plan.highlight ? "text-pure-white/50" : "text-dove"}`}>
                    Facturado anualmente
                  </p>
                )}

                <p className={`mt-4 text-[14px] leading-snug ${plan.highlight ? "text-pure-white/75" : "text-ash"}`}>
                  {plan.tagline}
                </p>

                <div className={`my-6 h-px ${plan.highlight ? "bg-pure-white/15" : "bg-dove/15"}`} />

                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[14px]">
                      <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${plan.highlight ? "bg-pure-white/15" : "bg-apricot-wash"}`}>
                        <Check className={`h-3 w-3 ${plan.highlight ? "text-pure-white" : "text-rust"}`} />
                      </span>
                      <span className={plan.highlight ? "text-pure-white/90" : "text-ink"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/register"
                  className={`mt-8 flex items-center justify-center rounded-full px-6 py-3 text-[15px] font-[480] transition-all active:scale-95 ${
                    plan.highlight
                      ? "bg-pure-white text-ink hover:bg-pure-white/90 shadow-lg"
                      : "bg-ink text-pure-white hover:bg-ink/90"
                  }`}
                >
                  Comenzar con {plan.name}
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section className="px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-5xl text-center mb-12"
        >
          <h2 className="font-[family-name:var(--font-signifier)] text-[36px] font-normal tracking-[-0.01em] text-ink">
            Compara cada detalle
          </h2>
          <p className="mt-3 text-[16px] text-ash">Todo lo que incluye cada plan, lado a lado.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto max-w-4xl rounded-[28px] border border-dove/20 bg-pure-white shadow-[0_20px_40px_-15px_rgba(4,23,43,0.06)] overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-dove/10 bg-fog/50">
                  <th className="px-6 py-4 text-left text-[13px] font-[500] text-graphite">Capacidad</th>
                  {PLANS.map((p) => (
                    <th key={p.name} className={`px-6 py-4 text-center text-[13px] font-[600] ${p.highlight ? "text-rust" : "text-ink"}`}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-dove/10">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.label} className="hover:bg-fog/30 transition-colors">
                    <td className="px-6 py-4 text-[14px] font-[480] text-ink">{row.label}</td>
                    {row.values.map((v, i) => (
                      <td key={i} className="px-6 py-4 text-center">
                        {typeof v === "boolean" ? (
                          v ? (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-apricot-wash text-rust mx-auto">
                              <Check className="h-3.5 w-3.5" />
                            </span>
                          ) : (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-fog text-dove mx-auto">
                              <Minus className="h-3.5 w-3.5" />
                            </span>
                          )
                        ) : (
                          <span className="text-[14px] font-[480] text-ink">{v}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center mb-10"
        >
          <h2 className="font-[family-name:var(--font-signifier)] text-[36px] font-normal tracking-[-0.01em] text-ink">
            Preguntas frecuentes
          </h2>
        </motion.div>

        <div className="mx-auto max-w-2xl space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-[20px] border border-dove/20 bg-pure-white overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <span className="text-[15px] font-[480] text-ink">{faq.q}</span>
                <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4 text-graphite flex-shrink-0" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-4 text-[14px] leading-relaxed text-ash">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-4xl rounded-[32px] bg-ink px-10 py-16 text-center overflow-hidden"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(251, 225, 209, 0.15), transparent)" }}
          />
          <h2 className="relative font-[family-name:var(--font-signifier)] text-[36px] md:text-[42px] font-normal leading-tight tracking-[-0.015em] text-pure-white">
            Tu barbería merece verse tan bien como funciona
          </h2>
          <p className="relative mt-4 text-[16px] text-pure-white/70 max-w-lg mx-auto">
            14 días gratis, sin tarjeta de crédito. Cancela cuando quieras.
          </p>
          <a
            href="/register"
            className="relative mt-8 inline-flex items-center rounded-full bg-pure-white px-8 py-3.5 text-[15px] font-[500] text-ink transition-all hover:bg-pure-white/90 active:scale-95 shadow-lg"
          >
            Comenzar gratis
          </a>
        </motion.div>
      </section>
    </div>
  );
}
