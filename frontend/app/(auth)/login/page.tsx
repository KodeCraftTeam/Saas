/**
 * app/(auth)/login/page.tsx
 *
 * Página de inicio de sesión.
 *
 * Renderiza LoginForm de features/auth/components/LoginForm.
 * Enlace a la página de registro debajo del formulario.
 */
// app/(auth)/login/page.tsx
// Pagina de login. Es "server component" por defecto (no necesita "use client").
// Solo importa el LoginForm que SI es client component.

import { LoginForm } from "@/features/auth/components/LoginForm";
// Importa el formulario que ya tiene toda la logica: validacion, Zod, react-hook-form

export default function LoginPage() {
  return (
    <div className="space-y-8">
      {/* space-y-8 → 32px de separacion entre el titulo y el formulario */}

      {/* Encabezado */}
      <div className="space-y-2">
        {/* space-y-2 → 8px entre el titulo y el subtitulo */}

        <h2 className="text-[22px] font-medium text-ink tracking-[-0.2px] leading-[1.25]">
          {/* text-[22px] → step "subheading" de Steep */}
          {/* font-medium → weight 500 (Sohne) */}
          {/* text-ink → #17191c, el color primario de texto */}
          {/* tracking-[-0.2px] → letter-spacing del subheading de Steep */}
          {/* leading-[1.25] → line-height del subheading de Steep */}
          Bienvenido de vuelta
        </h2>

        <p className="text-[14px] text-graphite tracking-[-0.009em] leading-[1.5]">
          {/* text-[14px] → step "caption" de Steep */}
          {/* text-graphite → #777b86, texto terciario (sutil, no compite con el titulo) */}
          {/* tracking-[-0.009em] → letter-spacing de Sohne */}
          {/* leading-[1.5] → line-height del caption de Steep */}
          Ingresa tus credenciales para continuar
        </p>
      </div>

      {/* El formulario */}
      <LoginForm />
      {/* Este componente maneja todo: campos, validacion, errores, envio */}
    </div>
  );
}