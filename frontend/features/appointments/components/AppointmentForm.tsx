/**
 * features/appointments/components/AppointmentForm.tsx
 *
 * Formulario para crear o editar una cita.
 *
 * Props:
 * - appointment?: Appointment → modo edición si se proporciona
 * - onSubmit: (data: CreateAppointmentInput) => Promise<void>
 * - onCancel: () => void
 *
 * Campos:
 * - Selector de cliente (búsqueda + desplegable)
 * - Selector de servicio
 * - Selector de barbero
 * - Selector de fecha
 * - Selector de horario (usa el componente TimeSlotPicker)
 * - Notas (textarea opcional)
 *
 * Características:
 * - React Hook Form + validación con Zod
 * - Horarios dinámicos según selección de barbero + fecha
 * - Mostrar precio según el servicio seleccionado
 * - Estado de carga al enviar
 *
 * Usa: Input, Select, Button, Card de @shared/components/ui
 */
