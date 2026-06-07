/**
 * features/appointments/components/TimeSlotPicker.tsx
 *
 * Cuadrícula de horarios disponibles para reservar.
 *
 * Props:
 * - slots: TimeSlot[]
 * - selectedSlot: TimeSlot | null
 * - onSelect: (slot: TimeSlot) => void
 * - disabled?: boolean
 *
 * Características:
 * - Diseño en cuadrícula de botones de tiempo
 * - Horarios disponibles en estilo normal
 * - Horarios no disponibles en gris
 * - Horario seleccionado resaltado
 * - Agrupación mañana/tarde
 *
 * Usa: Button de @shared/components/ui, formatTime de @shared/lib/date-utils
 */
