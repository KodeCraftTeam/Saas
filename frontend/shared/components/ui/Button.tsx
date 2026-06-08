/**
 * shared/components/ui/Button.tsx
 *
 * Componente de botón principal con variantes y estado de carga.
 *
 * Props:
 * - variant: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' (predeterminado: 'primary')
 * - size: 'sm' | 'md' | 'lg' (predeterminado: 'md')
 * - isLoading: boolean → muestra ícono de spinner, deshabilita el botón
 * - disabled: boolean
 * - icon: LucideIcon → ícono opcional renderizado antes del contenido
 * - className: string
 * - children: ReactNode
 * - onClick, type y props estándar de botón
 *
 * Usa el patrón forwardRef para reenvío de referencias.
 * Usa cn() de @shared/lib/cn para combinar classNames.
 * Usa Loader2 de lucide-react para el spinner de carga.
 */

"use client";
// Next.js renderiza este componente en el navegador (no en el servidor).
// Necesario porque usamos interactividad: clicks, estados, animaciones.

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
// forwardRef → permite pasar una ref desde el padre hasta el <button> HTML real
// ButtonHTMLAttributes → todos los props nativos de <button> (onClick, type, disabled, etc.)
// ReactNode → cualquier cosa renderizable: texto, JSX, null

import { Loader2, type LucideIcon } from "lucide-react";
// Loader2 → icono de circulo girando (spinner de carga)
// LucideIcon → tipo/interfaz que describe la forma de cualquier icono de lucide

import { cn } from "@/shared/lib/cn";
// cn() → combina clases Tailwind sin conflictos (clsx + tailwind-merge)

// Solo acepta estos 4 estilos de color
type Variant = "primary" | "secondary" | "ghost" | "outline";

// Solo acepta estos 3 tamanios
type Size = "sm" | "md" | "lg";

// Props del boton: hereda todo lo de un <button> HTML + nuestros props custom
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;   // estilo de color (default: "primary")
  size?: Size;         // tamanio (default: "md")
  isLoading?: boolean; // si true: muestra spinner y desactiva el boton
  icon?: LucideIcon;   // icono opcional antes del texto
  children: ReactNode; // contenido del boton (lo unico obligatorio)
}

// Cada variante mapea a clases de Tailwind con los tokens de Steep
const variantStyles: Record<Variant, string> = {
  primary:
    "bg-ink text-pure-white hover:bg-ink/90",
    // Ink (#17191c) = near-black de Steep, texto blanco. El unico boton con fondo oscuro.

  secondary:
    "bg-fog text-ink hover:bg-fog/80",
    // Fog (#f7f7f8) = gris clarito, texto oscuro. Para acciones secundarias.

  ghost:
    "bg-transparent text-ash hover:bg-fog hover:text-ink",
    // Sin fondo. Solo aparece al pasar el mouse. Para toolbars o menus.

  outline:
    "border border-dove/40 bg-pure-white text-ink hover:bg-fog",
    // Borde Dove (#a3a6af) al 40% = muy sutil. Fondo blanco.
};

// Cada tamanio define alto, padding horizontal y tamanio de letra
const sizeStyles: Record<Size, string> = {
  sm: "h-8 px-4 text-[13px]",   // 32px alto, 16px padding, 13px letra
  md: "h-10 px-5 text-[15px]",  // 40px alto, 20px padding, 15px letra (el body de Steep)
  lg: "h-11 px-6 text-[15px]",  // 44px alto, 24px padding, 15px letra
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",  // si no pasas variant, usa "primary"
      size = "md",          // si no pasas size, usa "md"
      isLoading = false,    // si no pasas isLoading, empieza en false
      icon: Icon,           // renombrado a mayuscula para que JSX lo trate como componente
      className,            // clases extra que pases desde afuera
      children,             // contenido del boton
      disabled,             // si el padre quiere desactivarlo
      ...props              // todo lo demas: onClick, type, aria-label, etc.
    },
    ref                     // la ref que viene del componente padre
  ) => {
    return (
      <button
        ref={ref}                                          // conecta la ref al <button> real
        disabled={disabled || isLoading}                   // desactivado si el padre dice O si esta cargando
        className={cn(
          // Clases base (siempre aplican):
          "inline-flex items-center justify-center"        // flexbox centrado
          + " gap-2"                                       // 8px entre icono y texto
          + " rounded-[--radius-buttons]"                  // 9999px = pill shape (forma capsula de Steep)
          + " font-medium"                                 // weight 500
          + " tracking-[-0.009em]"                         // letter-spacing de Sohne
          + " transition-all duration-150"                 // anima cualquier cambio en 150ms
          + " focus-visible:outline-none"                  // sin outline feo
          + " focus-visible:ring-2 focus-visible:ring-dove" // anillo de foco color Dove (#a3a6af)
          + " focus-visible:ring-offset-2"                 // separacion del anillo
          + " disabled:pointer-events-none"                // desactiva clicks cuando esta disabled
          + " disabled:opacity-40",                        // baja opacidad al 40% cuando esta disabled
          variantStyles[variant],  // el color (ink, fog, ghost, outline)
          sizeStyles[size],        // el tamanio (alto, padding, letra)
          className                // clases extra del padre (va al final para poder sobreescribir)
        )}
        {...props}  // esparce onClick, type, aria-label, etc. en el <button>
      >
        {/* Si esta cargando → spinner. Si tiene icono → el icono. Si no → nada. */}
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : Icon ? (
          <Icon className="h-4 w-4" />
        ) : null}
        {children}  {/* el texto o contenido siempre se renderiza */}
      </button>
    );
  }
);

Button.displayName = "Button";
// Muestra "Button" en las DevTools de React en vez de "ForwardRef"