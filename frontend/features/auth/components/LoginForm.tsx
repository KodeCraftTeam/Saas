/**
 * features/auth/components/LoginForm.tsx
 *
 * Formulario de inicio de sesión con campos de email y contraseña.
 *
 * Características:
 * - React Hook Form + validación con Zod
 * - Campo de email (obligatorio, formato de email válido)
 * - Campo de contraseña (obligatorio, mínimo 8 caracteres)
 * - Botón de envío con estado de carga
 * - Mostrar mensaje de error
 * - Enlace a la página de registro
 * - Al iniciar sesión: redirigir al dashboard
 *
 * Usa: Input, Button de @shared/components/ui
 */

"use client";
// Se ejecuta en el navegador. Necesario porque usa hooks (useState, useForm) y eventos.

import { useState } from "react";
// useState → hook para guardar estado local (en este caso: si la contrasena se ve o no)

import { useForm } from "react-hook-form";
// useForm → hook que maneja todo el formulario: valores, validacion, errores, estado de envio

import { z } from "zod/v4";
// Zod → libreria para definir schemas de validacion. Define QUE datos esperas y sus reglas.

import { zodResolver } from "@hookform/resolvers/zod";
// Conecta Zod con React Hook Form. Le pasa las reglas de Zod al formulario automaticamente.

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
// Iconos de lucide: Mail para el campo email, Lock para contrasena, Eye/EyeOff para mostrar/ocultar

import Link from "next/link";
// Link de Next.js para navegacion interna sin recargar la pagina

import { Button } from "@/shared/components/ui/Button";
// Nuestro boton reutilizable con estilos Steep (pill shape, bg-ink)

import { Input } from "@/shared/components/ui/Input";
// Nuestro input reutilizable con estilos Steep (16px radius, borde dove sutil)

// Schema de validacion con Zod: define las reglas del formulario
const loginSchema = z.object({
  email: z.email("Ingresa un email valido"),
  // z.email() → valida que sea un email real. Si no, muestra "Ingresa un email valido"

  password: z.string().min(8, "Minimo 8 caracteres"),
  // z.string() → debe ser string. .min(8) → minimo 8 caracteres. Si no, muestra el mensaje.
});

// TypeScript infiere el tipo del formulario directamente del schema de Zod
// Esto crea: { email: string; password: string }
type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  // Estado local: controla si la contrasena se muestra como texto o con puntos
  const [showPassword, setShowPassword] = useState(false);
  // false = contrasena oculta (puntos), true = contrasena visible (texto)

  const {
    register,     // funcion para registrar cada input en el formulario
    handleSubmit, // funcion que envuelve onSubmit: primero valida, luego ejecuta
    formState: { errors, isSubmitting },
    // errors → objeto con los errores de cada campo: { email?: string, password?: string }
    // isSubmitting → true mientras la funcion onSubmit esta ejecutandose
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    // zodResolver conecta el schema de Zod con el formulario
    // Ahora handleSubmit valida automaticamente contra loginSchema antes de llamar onSubmit
  });

  async function onSubmit(data: LoginFormData) {
    // "data" ya esta validado por Zod. Aqui tiene la forma: { email: string, password: string }
    // Solo se ejecuta si la validacion paso
    try {
      // TODO: aqui va la llamada al backend (server action o API)
      console.log("Login:", data);
    } catch {
      // Si el backend devuelve error (credenciales incorrectas, etc.)
      // TODO: mostrar error del servidor
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* handleSubmit(onSubmit) → primero valida con Zod, si pasa llama a onSubmit */}
      {/* space-y-5 → separacion de 20px entre cada hijo */}

      {/* Campo Email */}
      <Input
        label="Email"
        type="email"
        placeholder="tu@email.com"
        icon={Mail}                         // icono del sobre a la izquierda
        error={errors.email?.message}       // si hay error de email, lo muestra debajo
        {...register("email")}              // registra el input en react-hook-form
        // register("email") pasa: onChange, onBlur, name, ref automaticamente
      />

      {/* Campo Contrasena con toggle de visibilidad */}
      <div className="relative">
        {/* relative para posicionar el boton del ojo de forma absoluta */}

        <Input
          label="Contrasena"
          type={showPassword ? "text" : "password"}
          // Si showPassword es true → se ve el texto. Si false → se ven puntos.
          placeholder="Minimo 8 caracteres"
          icon={Lock}                         // icono del candado a la izquierda
          error={errors.password?.message}    // si hay error de contrasena, lo muestra debajo
          {...register("password")}           // registra el input en react-hook-form
        />

        {/* Boton para mostrar/ocultar contrasena */}
        <button
          type="button"                       // type="button" para que NO envie el formulario
          tabIndex={-1}                       // lo saca del tab order (no se puede seleccionar con Tab)
          onClick={() => setShowPassword(!showPassword)}
          // toggle: si esta oculta la muestra, si esta visible la oculta
          className="absolute right-3.5 top-[38px] text-dove hover:text-graphite transition-colors"
          // absolute → posicionado dentro del relative del padre
          // right-3.5 → 14px desde la derecha (alineado con el padding del input)
          // top-[38px] → alineado verticalmente con el texto del input
          // text-dove → color sutil (#a3a6af), hover:text-graphite → se oscurece al pasar el mouse
        >
          {showPassword ? (
            <EyeOff className="h-[18px] w-[18px]" />
            // Ojo tachado: indica que al hacer click se OCULTARA
          ) : (
            <Eye className="h-[18px] w-[18px]" />
            // Ojo abierto: indica que al hacer click se MOSTRARA
          )}
        </button>
      </div>

      {/* Espacio extra antes del boton para respirar */}
      <div className="pt-2">
        <Button type="submit" isLoading={isSubmitting} className="w-full">
          {/* type="submit" → al hacer click se dispara handleSubmit */}
          {/* isLoading → si esta enviando, muestra el spinner automaticamente */}
          {/* w-full → ocupa todo el ancho */}
          Iniciar sesion
        </Button>
      </div>

      {/* Link a registro */}
      <p className="text-center text-[14px] text-graphite">
        {/* 14px = caption de Steep, text-graphite = texto terciario */}
        No tienes cuenta?{" "}
        <Link
          href="/register"
          className="font-medium text-ink hover:text-ink/70 transition-colors"
          // font-medium = weight 500, text-ink = color primario, hover baja a 70% opacidad
        >
          Registrate
        </Link>
      </p>
    </form>
  );
}