/**
 * app/(dashboard)/appointments/[id]/page.tsx
 *
 * Página de detalle de cita.
 *
 * Muestra: componente AppointmentDetail con información completa y botones de acción.
 * Acciones: Editar, Cancelar, Completar, No-Asistió (según estado y rol).
 *
 * Usa: AppointmentDetail de features/appointments
 */


export default function IdPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-bold text-neutral-900">IdPage</h1>
      <p className="text-sm text-neutral-600">Esta sección está en desarrollo.</p>
    </div>
  );
}
