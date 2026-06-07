/**
 * features/tenant/hooks/use-tenant.ts
 *
 * Hook para acceder al contexto del tenant actual desde TenantProvider.
 *
 * Uso:
 *   const { tenant, isLoading, error } = useTenant();
 *
 * Retorna: { tenant: Tenant | null, isLoading: boolean, error: string | null }
 *
 * Lanza error si se usa fuera de TenantProvider.
 */
