/**
 * app/(dashboard)/layout.tsx
 *
 * Layout principal del dashboard. EL archivo de layout más importante.
 *
 * Características:
 * - AuthProvider envolviendo todo (contexto de sesión)
 * - TenantProvider envolviendo todo (contexto de tenant)
 * - Sidebar con elementos de navegación según el rol del usuario:
 *   - Todos los roles: Dashboard, Citas
 *   - Dueño: + Clientes, Barberos, Servicios, Configuración
 *   - Barbero: + Clientes (solo lectura)
 *   - Cliente: solo Dashboard, Mis Citas
 * - Header con nombre del tenant, menú desplegable del usuario
 * - Guard de autenticación: redirigir a /login si no está autenticado
 * - Responsive móvil: sidebar como overlay en pantallas pequeñas
 *
 * Elementos de navegación:
 * - Dashboard (icono LayoutDashboard)
 * - Citas (icono Calendar)
 * - Clientes (icono Users) — solo dueño/barbero
 * - Barberos (icono Scissors) — solo dueño
 * - Servicios (icono List) — solo dueño
 * - Configuración (icono Settings) — solo dueño
 *
 * Usa: Sidebar, Header de @shared/components/layout
 * Usa: AuthProvider de features/auth
 * Usa: TenantProvider de features/tenant
 * Usa: RoleGuard de features/auth
 */
