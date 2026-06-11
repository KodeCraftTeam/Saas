"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, User, Store } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { GoogleIcon } from "@/shared/components/icons/GoogleIcon";

const registerSchema = z
  .object({
    name: z.string().min(2, "Mínimo 2 caracteres"),
    email: z.email("Ingresa un email válido"),
    shopName: z.string().min(2, "Ingresa el nombre de tu negocio"),
    password: z
      .string()
      .min(8, "Mínimo 8 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
      .regex(/[0-9]/, "Debe contener al menos un número"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormData) {
    try {
      console.log("Register:", data);
    } catch {
      // Error del servidor
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Botón de Google — delay 3 */}
      <div className="animate-fade-in-up animation-delay-3">
        <Button
          type="button"
          variant="outline"
          className="w-full gap-3"
          onClick={() => console.log("Google register")}
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

      {/* Nombre — delay 5 */}
      <div className="animate-fade-in-up animation-delay-5 input-hover-glow">
        <Input
          label="Nombre"
          type="text"
          placeholder="Tu nombre"
          icon={User}
          error={errors.name?.message}
          {...register("name")}
        />
      </div>

      {/* Email — delay 6 */}
      <div className="animate-fade-in-up animation-delay-6 input-hover-glow">
        <Input
          label="Email"
          type="email"
          placeholder="tu@email.com"
          icon={Mail}
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      {/* Nombre de la barbería — delay 7 */}
      <div className="animate-fade-in-up animation-delay-7 input-hover-glow">
        <Input
          label="Nombre de tu negocio"
          type="text"
          placeholder="Ej: Studio Lina"
          icon={Store}
          error={errors.shopName?.message}
          {...register("shopName")}
        />
      </div>

      {/* Contraseña — delay 8 */}
      <div className="animate-fade-in-up animation-delay-8">
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

      {/* Confirmar contraseña — delay 9 */}
      <div className="animate-fade-in-up animation-delay-9">
        <div className="relative input-hover-glow">
          <Input
            label="Confirmar contraseña"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Repite tu contraseña"
            icon={Lock}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3.5 top-[38px] text-dove hover:text-graphite transition-colors duration-200"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-[18px] w-[18px]" />
            ) : (
              <Eye className="h-[18px] w-[18px]" />
            )}
          </button>
        </div>
      </div>

      {/* Botón — animación extra después de los campos */}
      <div className="animate-fade-in-up pt-2" style={{ animationDelay: "0.60s" }}>
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="w-full btn-shimmer"
        >
          Crear cuenta
        </Button>
      </div>

      {/* Link a login */}
      <p
        className="animate-fade-in-up text-center text-[14px] text-graphite"
        style={{ animationDelay: "0.66s" }}
      >
        ¿Ya tienes cuenta?{" "}
        <Link
          href="/login"
          className="font-medium text-ink hover:text-rust transition-colors duration-200"
        >
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}
