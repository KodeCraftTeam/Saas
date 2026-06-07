/**
 * features/appointments/components/AppointmentCalendar.tsx
 *
 * Vista de calendario mostrando citas por día/semana.
 *
 * Props:
 * - appointments: Appointment[]
 * - onAppointmentClick: (appointment: Appointment) => void
 * - onDateClick: (date: Date) => void
 * - view: 'day' | 'week' (por defecto: 'week')
 *
 * Características:
 * - Vista semanal: 7 columnas, filas de tiempo
 * - Vista diaria: una sola columna, franjas horarias detalladas
 * - Color según el estado
 * - Clic en espacio vacío → crear nueva cita
 * - Clic en cita → ver detalles
 * - Navegación: día/semana anterior/siguiente
 *
 * Usa: date-fns para cálculos de fechas
 */
