/**
 * app/(dashboard)/appointments/new/page.tsx
 *
 * Página de nueva cita.
 *
 * Muestra: AppointmentForm en modo creación.
 * Al completar: redirigir a /appointments o /appointments/[id]
 *
 * Usa: AppointmentForm de features/appointments
 */


export default function NewPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-bold text-neutral-900">NewPage</h1>
      <p className="text-sm text-neutral-600">Esta sección está en desarrollo.</p>
    </div>
  );
}
