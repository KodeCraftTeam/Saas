/**
 * features/auth/components/AuthProvider.tsx
 *
 * Proveedor de React Context para el estado de autenticación.
 *
 * Props:
 * - children: ReactNode
 * - initialSession?: AuthSession → sesión opcional proporcionada por el servidor
 *
 * Características:
 * - Proporciona user, isAuthenticated, isLoading mediante contexto
 * - Obtiene la sesión al montar si no se proporciona
 * - Maneja la renovación del token
 * - Proporciona funciones login(), logout(), register()
 * - Se usa en (dashboard)/layout.tsx
 *
 * Valor del contexto: { user, isAuthenticated, isLoading, login, logout, register }
 */
