/**
 * features/appointments/actions/appointment-actions.ts
 *
 * Server Actions para operaciones de citas.
 * Marcar con 'use server' al inicio.
 *
 * Acciones a implementar:
 *
 * createAppointment(data: CreateAppointmentInput): Promise<Appointment>
 *   - Valida la entrada con Zod
 *   - Verifica conflictos de horario
 *   - Crea la cita mediante la API
 *   - Revalida la lista de citas
 *
 * updateAppointment(id: string, data: Partial<CreateAppointmentInput>): Promise<Appointment>
 * cancelAppointment(id: string, reason?: string): Promise<Appointment>
 * completeAppointment(id: string): Promise<Appointment>
 * markNoShow(id: string): Promise<Appointment>
 *
 * getAppointments(filters: AppointmentFilter): Promise<PaginatedResponse<Appointment>>
 * getAppointmentById(id: string): Promise<Appointment>
 *
 * getAvailableSlots(barberId: string, date: string, serviceId: string): Promise<TimeSlot[]>
 */
