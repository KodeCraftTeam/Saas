/**
 * app/(dashboard)/clients/[id]/page.tsx
 *
 * Página de perfil del cliente.
 *
 * Muestra: ClientProfile con información de contacto, estadísticas, historial de citas.
 * Acciones: Editar, Eliminar (con confirmación).
 *
 * Usa: ClientProfile de features/clients
 */


export default function IdPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-bold text-neutral-900">IdPage</h1>
      <p className="text-sm text-neutral-600">Esta sección está en desarrollo.</p>
    </div>
  );
}
