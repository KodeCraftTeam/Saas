/**
 * shared/lib/date-utils.ts
 *
 * Funciones de formato de fecha y utilidades usando date-fns.
 *
 * Funciones a implementar:
 * - formatDate(date) → "Jan 15, 2025"
 * - formatTime(date) → "2:30 PM"
 * - formatDateTime(date) → "Jan 15, 2025 at 2:30 PM"
 * - formatRelative(date) → "2 hours ago", "in 3 days"
 * - isToday(date), isTomorrow(date), isYesterday(date)
 * - getDayName(date) → "Monday"
 * - getTimeSlots(start, end, durationMinutes) → array of { start: Date, end: Date }
 *   Usado para generar bloques de tiempo de citas (ej., bloques de 30 min de 9am a 6pm)
 *
 * Dependencias: date-fns
 */
