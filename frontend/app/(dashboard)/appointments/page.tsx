/**
 * app/(dashboard)/appointments/page.tsx
 *
 * Página de citas con vista de calendario y lista.
 *
 * Características:
 * - Alternar entre vista de Calendario y vista de Lista
 * - Filtros: rango de fechas, barbero, estado
 * - Botón "Nueva Cita" en el header de la página
 * - Clic en cita → navegar al detalle
 *
 * Usa: AppointmentCalendar, AppointmentList de features/appointments
 * Usa: PageContainer, PageHeader de @shared/components/layout
 * Usa: Button de @shared/components/ui
 */


export default function AppointmentsPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-bold text-neutral-900">AppointmentsPage</h1>
      <p className="text-sm text-neutral-600">Esta sección está en desarrollo.</p>
    </div>
  );
}
