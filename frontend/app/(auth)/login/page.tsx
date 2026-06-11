import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="space-y-8">
      {/* Encabezado con entrada animada escalonada */}
      <div className="space-y-2">
        <h2 className="animate-fade-in-up animation-delay-1 text-[22px] font-medium text-ink tracking-[-0.2px] leading-[1.25] font-[family-name:var(--font-signifier)]">
          Bienvenido de vuelta
        </h2>
        <p className="animate-fade-in-up animation-delay-2 text-[14px] text-graphite tracking-[-0.009em] leading-[1.5]">
          Ingresa tus credenciales para continuar
        </p>
      </div>

      <LoginForm />
    </div>
  );
}
