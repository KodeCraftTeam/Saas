/**
 * app/book/[tenant]/page.tsx
 *
 * Página de reserva pública accesible por el slug del tenant.
 * No requiere autenticación.
 *
 * Flujo:
 * 1. Seleccionar servicio
 * 2. Seleccionar barbero
 * 3. Seleccionar fecha y horario
 * 4. Ingresar datos del cliente (nombre, teléfono, email)
 * 5. Confirmar reserva
 *
 * Características:
 * - Asistente de múltiples pasos (stepper en la parte superior)
 * - Marca del tenant aplicada
 * - Diseño mobile-first
 * - Al completar: mensaje de confirmación con detalles de la cita
 *
 * Usa: ServiceCard, BarberCard, TimeSlotPicker de features
 * Usa: AppointmentForm o asistente de reserva personalizado
 */


export default function TenantPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-bold text-neutral-900">TenantPage</h1>
      <p className="text-sm text-neutral-600">Esta sección está en desarrollo.</p>
    </div>
  );
}
