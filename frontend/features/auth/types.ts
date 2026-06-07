/**
 * features/auth/types.ts
 *
 * Tipos de autenticación y usuario.
 *
 * Tipos a definir:
 *
 * User → {
 *   id: string
 *   email: string
 *   firstName: string
 *   lastName: string
 *   avatar?: string
 *   role: Role              // de @shared/types/roles
 *   tenantId: string
 *   createdAt: string
 * }
 *
 * AuthSession → {
 *   user: User
 *   token: string
 *   expiresAt: string
 * }
 *
 * LoginInput → { email: string; password: string }
 * RegisterInput → { email: string; password: string; firstName: string; lastName: string; shopName: string }
 */
