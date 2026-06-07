/**
 * shared/types/api.ts
 *
 * Tipos de respuesta API genéricos usados en toda la aplicación.
 *
 * Tipos a definir:
 *
 * ApiResponse<T>        → { data: T; message?: string; success: boolean }
 * PaginatedResponse<T>  → { data: T[]; total: number; page: number; limit: number; totalPages: number }
 * ApiError              → { statusCode: number; message: string; errors?: Record<string, string[]> }
 */
