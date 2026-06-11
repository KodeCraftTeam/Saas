import { ScrollAssembly } from "./ScrollAssembly";
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Scissors, 
  Clock, 
  Award, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function MarketingPage() {
  const features = [
    {
      title: "Agenda Inteligente en Tiempo Real",
      description: "Permite que tus clientes reserven citas por sí mismos en segundos. Se integra con WhatsApp para enviar confirmaciones automáticas y reducir inasistencias en un 85%.",
      icon: Calendar,
      badge: "Más popular",
      color: "bg-apricot-wash/50 text-rust"
    },
    {
      title: "Control de Clientes & CRM",
      description: "Guarda perfiles detallados de clientes, preferencias de corte, fórmulas de tintes, fotos de estilos anteriores y fechas importantes para ofrecer un servicio premium.",
      icon: Users,
      badge: "Esencial",
      color: "bg-sky-wash/50 text-ink"
    },
    {
      title: "Reportes de Ventas & Comisiones",
      description: "Calcula comisiones para tus barberos automáticamente. Monitorea ingresos diarios, propinas, venta de productos y exporta reportes financieros listos para contabilidad.",
      icon: TrendingUp,
      badge: "Finanzas",
      color: "bg-emerald-50 text-emerald-800"
    },
    {
      title: "Gestión de Barberos y Turnos",
      description: "Define horarios de trabajo, descansos, vacaciones y bloquea horas específicas de forma intuitiva. Cada barbero tiene su propio panel para ver su agenda del día.",
      icon: Scissors,
      badge: "Equipo",
      color: "bg-purple-50 text-purple-800"
    }
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. Steep-Style Scroll assembly Showcase Section */}
      <ScrollAssembly />

      {/* 2. Brand Trust / Logos Section */}
      <section className="w-full py-16 border-t border-dove/20 bg-fog/30 flex flex-col items-center justify-center">
        <p className="text-xs font-bold text-dove uppercase tracking-widest text-center mb-8">
          Con la confianza de las mejores barberías del continente
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
          <span className="font-[family-name:var(--font-signifier)] text-xl font-bold tracking-tight text-ink">
            Dukes Barberia
          </span>
          <span className="font-[family-name:var(--font-signifier)] text-xl font-bold tracking-tight text-ink">
            Grizzly Club
          </span>
          <span className="font-[family-name:var(--font-signifier)] text-xl font-bold tracking-tight text-ink">
            Gentlemen Co.
          </span>
          <span className="font-[family-name:var(--font-signifier)] text-xl font-bold tracking-tight text-ink">
            The Vintage Cut
          </span>
        </div>
      </section>

      {/* 3. Core Value Proposition Grid (Features) */}
      <section className="w-full py-24 px-6 max-w-[1100px] mx-auto flex flex-col gap-16">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1 bg-ink text-pure-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            Características
          </span>
          <h2 className="font-[family-name:var(--font-signifier)] text-4xl sm:text-5xl font-normal leading-[1.1] tracking-tight text-ink">
            Todo lo que necesitas para escalar tu negocio en un solo lugar
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ash leading-relaxed">
            Hemos diseñado una herramienta potente pero increíblemente fácil de usar. Dedica menos tiempo al papeleo y más a lo que mejor haces.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {features.map((feat, index) => (
            <div 
              key={index}
              className="group relative bg-pure-white rounded-[28px] border border-dove/20 p-8 shadow-subtle hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`h-12 w-12 rounded-2xl ${feat.color} flex items-center justify-center`}>
                    <feat.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-dove border border-dove/20 px-2.5 py-1 rounded-full">
                    {feat.badge}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-ink tracking-tight group-hover:text-ink/80 transition-colors">
                  {feat.title}
                </h3>
                
                <p className="mt-3 text-sm font-medium text-ash leading-relaxed">
                  {feat.description}
                </p>
              </div>
              
              <div className="mt-8 pt-4 border-t border-dove/10 flex items-center justify-between text-xs font-bold text-ink group-hover:translate-x-1 transition-transform duration-300">
                <span>Saber más</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Editorial Call to Action (CTA) */}
      <section className="w-full py-20 px-6 max-w-[1100px] mx-auto mb-12">
        <div 
          className="relative w-full rounded-[36px] bg-ink text-pure-white p-8 sm:p-16 overflow-hidden flex flex-col items-center text-center justify-center border border-ink"
          style={{
            boxShadow: "0 30px 60px -15px rgba(23, 25, 28, 0.25)"
          }}
        >
          {/* Radial glow accent inside the dark box */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(251, 225, 209, 0.45), transparent 60%)"
            }}
          />

          <span className="relative inline-flex items-center gap-1.5 text-apricot-wash text-xs font-semibold px-3 py-1 rounded-full border border-apricot-wash/35 mb-6">
            <Sparkles className="h-3.5 w-3.5" /> Comienza en 3 minutos
          </span>
          
          <h2 className="relative max-w-2xl font-[family-name:var(--font-signifier)] text-4xl sm:text-5xl font-normal leading-[1.15] tracking-tight mb-6">
            Eleva el nivel de tu barbería hoy mismo
          </h2>
          
          <p className="relative max-w-lg text-dove text-[15px] sm:text-[16px] leading-relaxed mb-10 font-[400]">
            Prueba todas las funciones de forma gratuita durante 14 días. Sin contratos, sin tarjetas de crédito y con soporte personalizado para importar tus datos.
          </p>
          
          <div className="relative flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="rounded-full bg-pure-white px-8 py-3 text-[15px] font-bold text-ink transition-all hover:bg-pure-white/95 active:scale-95 shadow-md"
            >
              Comenzar prueba gratuita
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-dove/40 px-8 py-3 text-[15px] font-semibold text-pure-white transition-all hover:bg-pure-white/10 active:scale-95"
            >
              Hablar con ventas
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
