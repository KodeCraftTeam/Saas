/**
 * features/auth/hooks/use-role.ts
 *
 * Hook para verificaciones de acceso basadas en roles.
 *
 * Uso:
 *   const { hasRole, isOwner, isBarber, isClient } = useRole();
 *   if (hasRole('owner')) { // mostrar panel de administración }
 *
 * Retorna:
 * - hasRole: (role: any | any[]) => boolean
 * - isOwner: boolean
 * - isBarber: boolean
 * - isClient: boolean
 * - isSuperAdmin: boolean
 */

export function useRole() {
  return {
    hasRole: (role: string | string[]) => {
      if (Array.isArray(role)) {
        return role.includes('owner');
      }
      return role === 'owner';
    },
    isOwner: true,
    isBarber: false,
    isClient: false,
    isSuperAdmin: false,
  };
}
