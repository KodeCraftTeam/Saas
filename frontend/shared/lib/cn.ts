/**
 * shared/lib/cn.ts
 *
 * Utilidad para combinar nombres de clases. Combina clsx + tailwind-merge.
 *
 * Uso:
 *   import { cn } from '@shared/lib/cn'
 *   cn('px-4 py-2', isActive && 'bg-primary', className)
 *
 * Dependencias: clsx, tailwind-merge
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}