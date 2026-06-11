/**
 * app/(dashboard)/services/page.tsx
 *
 * Página de catálogo de servicios.
 *
 * Características:
 * - Pestañas de filtro por categoría
 * - Cuadrícula de servicios con ServiceCard
 * - Botón "Agregar Servicio" en el header de la página
 * - Clic en servicio → editar
 *
 * Usa: ServiceList, ServiceCategoryFilter de features/services
 * Rol: solo dueño
 */


export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-bold text-neutral-900">ServicesPage</h1>
      <p className="text-sm text-neutral-600">Esta sección está en desarrollo.</p>
    </div>
  );
}
