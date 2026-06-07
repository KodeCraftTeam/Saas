/**
 * features/tenant/components/TenantProvider.tsx
 *
 * Proveedor de React Context que hace disponible los datos del tenant a todos los componentes hijos.
 *
 * Props:
 * - children: ReactNode
 * - tenant?: Tenant → tenant inicial opcional (del servidor)
 *
 * Características:
 * - Obtiene datos del tenant al montar si no se proporciona
 * - Proporciona el tenant mediante contexto
 * - Maneja estados de carga y error
 * - Se usa en (dashboard)/layout.tsx para envolver todo el dashboard
 *
 * Valor del contexto: { tenant, isLoading, error }
 */
