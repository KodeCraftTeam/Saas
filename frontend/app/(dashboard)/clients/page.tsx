/**
 * app/(dashboard)/clients/page.tsx
 *
 * Página de lista de clientes.
 *
 * Características:
 * - Barra de búsqueda
 * - Lista de clientes con ClientCard o tabla
 * - Botón "Agregar Cliente" en el header de la página
 * - Clic en cliente → navegar al perfil
 *
 * Usa: ClientList de features/clients
 */


export default function ClientsPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-bold text-neutral-900">ClientsPage</h1>
      <p className="text-sm text-neutral-600">Esta sección está en desarrollo.</p>
    </div>
  );
}
