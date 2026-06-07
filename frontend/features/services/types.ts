/**
 * features/services/types.ts
 *
 * Tipos de catálogo de servicios.
 *
 * Tipos a definir:
 *
 * Service → {
 *   id: string
 *   tenantId: string
 *   name: string           // "Haircut"
 *   description?: string
 *   duration: number       // minutes
 *   price: number          // in cents or dollars
 *   category?: string      // "Hair", "Beard", "Color"
 *   isActive: boolean
 *   createdAt: string
 * }
 *
 * CreateServiceInput → { name, description?, duration, price, category? }
 * ServiceCategory → { id: string; name: string; services: Service[] }
 */
