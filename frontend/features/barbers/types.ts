/**
 * features/barbers/types.ts
 *
 * Tipos de gestión de barberos/estilistas.
 *
 * Tipos a definir:
 *
 * Barber → {
 *   id: string
 *   tenantId: string
 *   userId: string
 *   firstName: string
 *   lastName: string
 *   email: string
 *   phone: string
 *   avatar?: string
 *   bio?: string
 *   specialties: string[]
 *   isActive: boolean
 *   schedule: BarberSchedule
 *   createdAt: string
 * }
 *
 * BarberSchedule → {
 *   workingDays: WorkingDay[]
 *   breaks: Break[]
 * }
 *
 * WorkingDay → {
 *   day: 'monday' | 'tuesday' | ... | 'sunday'
 *   enabled: boolean
 *   startTime: string    // "09:00"
 *   endTime: string      // "18:00"
 * }
 *
 * Break → { day: string; startTime: string; endTime: string }
 *
 * CreateBarberInput → { firstName, lastName, email, phone, bio?, specialties? }
 */
