"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { GoogleIcon } from "@/shared/components/icons/GoogleIcon";

const loginSchema = z.object({
  email: z.email("Ingresa un email válido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    try {
      console.log("Login:", data);
    } catch {
      // Error del servidor
    }
  }

  async function fetchGoogleToken() {
    window.location.href = "http://localhost:3001/api/auth/google";
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Botón de Google — delay 3 */}
      <div className="animate-fade-in-up animation-delay-3">
        <Button
          type="button"
          variant="outline"
          className="w-full gap-3"
          onClick={fetchGoogleToken}
        >
          <GoogleIcon className="h-[18px] w-[18px]" />
          Continuar con Google
        </Button>
      </div>

      {/* Separador — delay 4 */}
      <div className="animate-fade-in-up animation-delay-4 relative flex items-center">
        <div className="flex-1 border-t border-dove/20" />
        <span className="px-3 text-[12px] text-dove tracking-[-0.009em]">
          o continúa con
        </span>
        <div className="flex-1 border-t border-dove/20" />
      </div>

      {/* Campo Email — delay 5 */}
      <div className="animate-fade-in-up animation-delay-5 input-hover-glow">
        <Input
          label="Email"
          type="email"
          placeholder="tu@email.com"
          icon={Mail}
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      {/* Campo Contraseña con toggle — delay 6 */}
      <div className="animate-fade-in-up animation-delay-6">
        <div className="relative input-hover-glow">
          <Input
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            placeholder="Mínimo 8 caracteres"
            icon={Lock}
            error={errors.password?.message}
            {...register("password")}
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-[38px] text-dove hover:text-graphite transition-colors duration-200"
          >
            {showPassword ? (
              <EyeOff className="h-[18px] w-[18px]" />
            ) : (
              <Eye className="h-[18px] w-[18px]" />
            )}
          </button>
        </div>
      </div>

      {/* Botón — delay 7 */}
      <div className="animate-fade-in-up animation-delay-7 pt-2">
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="w-full btn-shimmer"
        >
          Iniciar sesión
        </Button>
      </div>

      {/* Link a registro — delay 8 */}
      <p className="animate-fade-in-up animation-delay-8 text-center text-[14px] text-graphite">
        ¿No tienes cuenta?{" "}
        <Link
          href="/register"
          className="font-medium text-ink hover:text-rust transition-colors duration-200"
        >
          Regístrate
        </Link>
      </p>
    </form>
  );
}
