/**
 * features/appointments/types.ts
 *
 * Tipos de programación de citas.
 *
 * Tipos a definir:
 *
 * AppointmentStatus → 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show'
 *
 * Appointment → {
 *   id: string
 *   tenantId: string
 *   barberId: string
 *   clientId: string
 *   serviceId: string
 *   startTime: string       // ISO 8601
 *   endTime: string         // ISO 8601
 *   status: AppointmentStatus
 *   notes?: string
 *   price: number
 *   createdAt: string
 *   // Relaciones (se poblan cuando se necesitan)
 *   barber?: Barber
 *   client?: Client
 *   service?: Service
 * }
 *
 * TimeSlot → { start: Date; end: Date; available: boolean }
 * CreateAppointmentInput → { barberId, clientId, serviceId, startTime, notes? }
 * AppointmentFilter → { date?: string; barberId?: string; status?: AppointmentStatus; clientId?: string }
 */
