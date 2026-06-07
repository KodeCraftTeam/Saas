/**
 * features/appointments/components/AppointmentList.tsx
 *
 * Vista de lista de citas con filtros.
 *
 * Props:
 * - appointments: Appointment[]
 * - onAppointmentClick: (appointment: Appointment) => void
 * - isLoading?: boolean
 *
 * Características:
 * - Barra de filtros: rango de fechas, barbero, estado
 * - Columnas ordenables: hora, cliente, barbero, servicio, estado
 * - Estado vacío cuando no hay resultados
 * - Esqueleto de carga
 *
 * Usa: Table, Badge, EmptyState, Spinner de @shared/components/ui
 */
