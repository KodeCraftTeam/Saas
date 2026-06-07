/**
 * features/auth/components/RegisterForm.tsx
 *
 * Formulario de registro para nuevos propietarios de barberías.
 *
 * Campos:
 * - Nombre (obligatorio)
 * - Apellido (obligatorio)
 * - Email (obligatorio, email válido)
 * - Nombre de la barbería (obligatorio)
 * - Contraseña (obligatorio, mínimo 8 caracteres, mayúscula + número)
 * - Confirmar contraseña (debe coincidir)
 *
 * Características:
 * - React Hook Form + validación con Zod
 * - Formulario de varios pasos o uno solo (a elección)
 * - Al registrarse: redirigir al dashboard
 *
 * Usa: Input, Button de @shared/components/ui
 */
