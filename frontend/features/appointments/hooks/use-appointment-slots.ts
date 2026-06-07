/**
 * features/appointments/hooks/use-appointment-slots.ts
 *
 * Hook para obtener horarios disponibles de un barbero en una fecha específica.
 *
 * Uso:
 *   const { slots, isLoading, selectedSlot, selectSlot } = useAppointmentSlots({
 *     barberId: '123',
 *     date: new Date(),
 *     serviceId: '456',
 *   });
 *
 * Características:
 * - Obtiene horarios disponibles de la API
 * - Tiene en cuenta las citas existentes (espacios libres)
 * - Tiene en cuenta los horarios de trabajo del barbero
 * - Retorna franjas horarias con estado de disponibilidad
 *
 * Retorna: { slots: TimeSlot[], isLoading, selectedSlot, selectSlot }
 */
