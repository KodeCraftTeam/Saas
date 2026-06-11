import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="space-y-8">
      {/* Encabezado con entrada animada escalonada */}
      <div className="space-y-2">
        <h2 className="animate-fade-in-up animation-delay-1 text-[22px] font-medium text-ink tracking-[-0.2px] leading-[1.25] font-[family-name:var(--font-signifier)]">
          Crea tu cuenta
        </h2>
        <p className="animate-fade-in-up animation-delay-2 text-[14px] text-graphite tracking-[-0.009em] leading-[1.5]">
          Configura tu negocio en minutos
        </p>
      </div>

      <RegisterForm />
    </div>
  );
}
