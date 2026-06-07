/**
 * features/appointments/components/AppointmentDetail.tsx
 *
 * Panel completo de detalle de cita.
 *
 * Props:
 * - appointment: Appointment
 * - onEdit: () => void
 * - onCancel: () => void
 * - onComplete: () => void
 *
 * Muestra: toda la información de la cita, detalles del cliente, del barbero, del servicio, línea de tiempo del estado.
 * Botones de acción: Editar, Cancelar, Marcar Completada, Marcar No-Show (según el estado actual y el rol).
 *
 * Usa: Card, Badge, Button, Avatar de @shared/components/ui
 */
