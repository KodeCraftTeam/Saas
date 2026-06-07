/**
 * features/auth/actions/auth-actions.ts
 *
 * Server Actions para autenticación.
 * Marcar con 'use server' al inicio.
 *
 * Acciones a implementar:
 *
 * login(input: LoginInput): Promise<AuthSession>
 *   - Valida credenciales con el backend
 *   - Establece cookie httpOnly con JWT
 *   - Retorna la sesión con datos del usuario
 *
 * register(input: RegisterInput): Promise<AuthSession>
 *   - Crea nuevo tenant + usuario propietario
 *   - Establece cookie httpOnly
 *   - Retorna la sesión
 *
 * logout(): Promise<void>
 *   - Elimina la cookie httpOnly
 *   - Redirige a /login
 *
 * getSession(): Promise<AuthSession | null>
 *   - Lee el JWT de la cookie httpOnly
 *   - Valida el token con el backend
 *   - Retorna la sesión o null
 *
 * Nota: Usar cookies() de 'next/headers' para leer/escribir cookies en Server Actions.
 */
