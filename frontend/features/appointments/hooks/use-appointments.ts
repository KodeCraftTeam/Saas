/**
 * features/appointments/hooks/use-appointments.ts
 *
 * Hook para obtener y gestionar citas.
 *
 * Uso:
 *   const { appointments, isLoading, error, refetch, filters, setFilters } = useAppointments();
 *
 * Características:
 * - Obtiene citas de la API (vía Server Action o llamada directa)
 * - Soporta filtrado por fecha, barbero, estado, cliente
 * - Soporte de paginación
 * - Auto-recarga al cambiar filtros
 *
 * Retorna: { appointments, isLoading, error, refetch, filters, setFilters, total, page, totalPages }
 */
