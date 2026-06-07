/**
 * features/dashboard/types.ts
 *
 * Tipos de datos del dashboard.
 *
 * Tipos a definir:
 *
 * DashboardStats → {
 *   todayAppointments: number
 *   weekAppointments: number
 *   totalClients: number
 *   totalBarbers: number
 *   revenueToday: number
 *   revenueWeek: number
 *   revenueMonth: number
 * }
 *
 * RecentActivity → {
 *   id: string
 *   type: 'appointment_created' | 'appointment_completed' | 'client_registered' | 'payment_received'
 *   message: string
 *   timestamp: string
 *   relatedId?: string
 * }
 */
