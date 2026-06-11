/**
 * app/(dashboard)/barbers/page.tsx
 *
 * Página de lista de barberos.
 *
 * Características:
 * - Lista/cuadrícula de barberos con BarberCard
 * - Botón "Agregar Barbero" en el header de la página
 * - Clic en barbero → navegar al perfil
 *
 * Usa: BarberList de features/barbers
 * Rol: solo dueño
 */


export default function BarbersPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-bold text-neutral-900">BarbersPage</h1>
      <p className="text-sm text-neutral-600">Esta sección está en desarrollo.</p>
    </div>
  );
}
