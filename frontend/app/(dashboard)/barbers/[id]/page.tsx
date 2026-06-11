/**
 * app/(dashboard)/barbers/[id]/page.tsx
 *
 * Página de perfil del barbero.
 *
 * Muestra: información del barbero, editor de horario, estadísticas de citas.
 * Acciones: Editar perfil, Gestionar horario.
 *
 * Usa: BarberForm, ScheduleEditor de features/barbers
 */


export default function IdPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-bold text-neutral-900">IdPage</h1>
      <p className="text-sm text-neutral-600">Esta sección está en desarrollo.</p>
    </div>
  );
}
