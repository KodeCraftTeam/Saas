/**
 * shared/components/ui/Input.tsx
 *
 * Campo de texto con etiqueta, estado de error y soporte de ícono.
 *
 * Props:
 * - label: string → se muestra encima del campo
 * - error: string → mensaje de error mostrado debajo en rojo
 * - icon: LucideIcon → ícono opcional en el lado izquierdo
 * - className: string
 * - Todos los props estándar de <input> (type, placeholder, value, onChange, etc.)
 *
 * Estilos: anillo de enfoque, borde de error, estado deshabilitado.
 */

"use client";
// Se ejecuta en el navegador. Necesario porque el input maneja eventos del usuario.

import { forwardRef, type InputHTMLAttributes } from "react";
// forwardRef → permite que react-hook-form pase una ref directo al <input> HTML
// InputHTMLAttributes → todos los props nativos de <input> (type, placeholder, value, onChange, etc.)

import type { LucideIcon } from "lucide-react";
// LucideIcon → tipo para recibir cualquier icono de lucide (Mail, Lock, Eye, etc.)

import { cn } from "@/shared/lib/cn";
// cn() → combina clases Tailwind sin conflictos

// Props del input: hereda todo lo de un <input> HTML + nuestros props custom
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;      // texto que aparece encima del input
  error?: string;      // mensaje de error que aparece debajo en rojo
  icon?: LucideIcon;   // icono opcional en el lado izquierdo (Mail, Lock, etc.)
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon: Icon, className, id, ...props }, ref) => {
    // Genera un id unico para conectar el <label> con el <input> (accesibilidad)
    // Si no pasas id, lo crea a partir del label: "Email" → "email", "Tu nombre" → "tu-nombre"
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full space-y-2">
        {/* Label: solo se renderiza si lo pasas */}
        {label && (
          <label
            htmlFor={inputId}                    // conecta label con input via el id
            className="block text-[14px] font-medium text-graphite tracking-[-0.009em]"
            // 14px = step "caption" de Steep
            // text-graphite (#777b86) = tertiary text del sistema
            // tracking-[-0.009em] = letter-spacing de Sohne
          >
            {label}
          </label>
        )}

        <div className="relative">
          {/* Icono: solo se renderiza si lo pasas. Posicion absolute dentro del relative */}
          {Icon && (
            <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-dove" />
            // pointer-events-none → el icono no bloquea clicks al input
            // absolute left-3.5 top-1/2 → posicionado a la izquierda, centrado vertical
            // -translate-y-1/2 → ajuste fino para centrar perfecto
            // text-dove (#a3a6af) = placeholder color de Steep
          )}

          <input
            ref={ref}        // conecta la ref de react-hook-form al <input> real
            id={inputId}     // mismo id que el htmlFor del label
            className={cn(
              // Clases base (siempre aplican):
              "flex h-11 w-full"                              // 44px de alto, ancho completo
              + " rounded-[--radius-inputs]"                  // 16px radius (token de Steep para inputs)
              + " border border-dove/30"                      // borde Dove (#a3a6af) al 30% = muy sutil
              + " bg-pure-white"                              // fondo blanco
              + " px-4"                                       // padding horizontal 16px
              + " text-[15px] text-ink"                       // 15px = body de Sohne, color Ink (#17191c)
              + " transition-all duration-150"                // anima cambios en 150ms
              + " placeholder:text-dove"                      // placeholder en Dove = sutil, no compite con el label
              + " focus:border-ink/20"                        // en foco: borde se oscurece un poco
              + " focus:outline-none"                         // sin outline feo del navegador
              + " focus:ring-[3px] focus:ring-ink/5",         // anillo de foco muy sutil (Ink al 5%)
              Icon && "pl-11",          // si hay icono: padding izquierdo de 44px para que no se encime
              error &&                  // si hay error:
                "border-rust/40 focus:border-rust/40 focus:ring-rust/10",
            
              className                 // clases extra del padre
            )}
            {...props}   
          />
        </div>

        {/* Mensaje de error: solo se renderiza si lo pasas */}
        {error && (
          <p className="text-[13px] text-rust tracking-[-0.009em]">
            {/* 13px = un paso debajo del caption, text-rust = color de error */}
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
// Muestra "Input" en las DevTools de React en vez de "ForwardRef"