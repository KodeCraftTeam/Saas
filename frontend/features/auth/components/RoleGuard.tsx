/**
 * features/auth/components/RoleGuard.tsx
 *
 * Renderiza hijos condicionalmente según el rol del usuario.
 *
 * Props:
 * - allowedRoles: Role[] → roles que pueden ver el contenido
 * - children: ReactNode → contenido a renderizar si está autorizado
 * - fallback?: ReactNode → contenido a renderizar si no está autorizado (por defecto: null)
 *
 * Uso:
 *   <RoleGuard allowedRoles={['owner', 'barber']}>
 *     <BarberScheduleEditor />
 *   </RoleGuard>
 *
 * Usa internamente el hook useRole().
 */
