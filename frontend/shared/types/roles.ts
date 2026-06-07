/**
 * shared/types/roles.ts
 *
 * Roles de usuario y permisos para el Barber SaaS.
 *
 * Roles:
 * - super_admin → Administrador de la plataforma (tú, el propietario del SaaS)
 * - owner       → Propietario de la barbería (administrador del inquilino)
 * - barber      → Estilista/barbero que trabaja en una tienda
 * - client      → Cliente que reserva citas
 *
 * Definir:
 * - Enum Role
 * - ROLE_HIERARCHY (para niveles de permisos)
 * - ROLE_LABELS (para visualización)
 * - Tipo Permission (si se necesita acceso granular)
 */
