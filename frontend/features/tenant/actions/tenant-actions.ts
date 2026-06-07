/**
 * features/tenant/actions/tenant-actions.ts
 *
 * Server Actions para operaciones del tenant.
 * Marcar con 'use server' al inicio.
 *
 * Acciones a implementar:
 *
 * getTenantBySlug(slug: string): Promise<Tenant>
 *   - Obtiene datos del tenant del backend por slug
 *   - Usado por middleware o layout para resolver el tenant desde el subdominio
 *
 * getTenantSettings(tenantId: string): Promise<TenantSettings>
 *   - Obtiene la configuración del tenant
 *
 * updateTenantSettings(tenantId: string, settings: Partial<TenantSettings>): Promise<Tenant>
 *   - Actualiza la configuración del tenant (solo propietario)
 */
