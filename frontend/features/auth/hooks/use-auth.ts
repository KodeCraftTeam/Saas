/**
 * features/auth/hooks/use-auth.ts
 *
 * Hook para el estado de autenticación.
 *
 * Uso:
 *   const { user, isAuthenticated, isLoading, logout } = useAuth();
 *
 * Retorna:
 * - user: User | null
 * - isAuthenticated: boolean
 * - isLoading: boolean
 * - logout: () => Promise<void>
 *
 * Lee la sesión del contexto de AuthProvider.
 */
