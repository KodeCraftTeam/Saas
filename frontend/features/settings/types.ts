/**
 * features/settings/types.ts
 *
 * Tipos de configuración de la tienda.
 *
 * Tipos a definir:
 *
 * ShopSettings → {
 *   shopName: string
 *   phone: string
 *   email: string
 *   address: string
 *   timezone: string
 *   currency: string
 *   workingHours: WorkingHours
 *   bookingRules: BookingRules
 * }
 *
 * WorkingHours → {
 *   days: { day: string; enabled: boolean; open: string; close: string }[]
 * }
 *
 * BookingRules → {
 *   allowOnlineBooking: boolean
 *   advanceBookingDays: number
 *   cancellationHours: number
 *   requireDeposit: boolean
 *   depositAmount?: number
 * }
 *
 * BrandingSettings → {
 *   logo?: string
 *   primaryColor: string
 *   customDomain?: string
 * }
 */
