/**
 * shared/lib/api-client.ts
 *
 * Cliente HTTP tipado para comunicarse con el backend NestJS.
 *
 * Qué implementar:
 * - Función genérica apiClient<T>(url, options) usando fetch
 * - Adjuntar automáticamente el encabezado Content-Type: application/json
 * - Adjuntar automáticamente el encabezado Authorization: Bearer <token> desde cookies
 * - Adjuntar automáticamente el encabezado X-Tenant-ID si hay contexto de inquilino disponible
 * - Parsear respuestas JSON con genéricos de TypeScript
 * - Manejar errores: parsear el cuerpo del error, lanzar ApiError tipado
 * - Exportar funciones auxiliares: api.get<T>(), api.post<T>(), api.put<T>(), api.patch<T>(), api.delete<T>()
 *
 * El backend se ejecuta en http://localhost:3001 en desarrollo.
 * En producción, las llamadas API pasan por /api/* (proxy mediante reescrituras de Next.js).
 *
 * Tipos a usar de @shared/types/api: ApiResponse<T>, ApiError
 */
