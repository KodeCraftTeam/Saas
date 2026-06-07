/**
 * features/auth/hooks/use-role.ts
 *
 * Hook para verificaciones de acceso basadas en roles.
 *
 * Uso:
 *   const { hasRole, isOwner, isBarber, isClient } = useRole();
 *   if (hasRole('owner')) { /* mostrar panel de administración */ }
 *
 * Retorna:
 * - hasRole: (role: Role | Role[]) => boolean
 * - isOwner: boolean
 * - isBarber: boolean
 * - isClient: boolean
 * - isSuperAdmin: boolean
 *
 * Lee el usuario del contexto de useAuth().
 */
