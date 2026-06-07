/**
 * features/tenant/types.ts
 *
 * Tipos de multi-tenencia.
 *
 * Tipos a definir:
 *
 * Tenant → {
 *   id: string
 *   name: string           // "Barbería Don José"
 *   slug: string           // "don-jose" (usado en subdominio)
 *   logo?: string          // URL de la imagen del logo
 *   primaryColor?: string  // Color de marca en hex
 *   phone?: string
 *   email?: string
 *   address?: string
 *   timezone: string
 *   createdAt: string
 *   isActive: boolean
 * }
 *
 * TenantSettings → horarios de trabajo, reglas de reservas, etc.
 * TenantBranding → logo, colores, dominio personalizado
 */
