/**
 * shared/components/ui/Button.tsx
 *
 * Componente de botón principal con variantes y estado de carga.
 *
 * Props:
 * - variant: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' (predeterminado: 'primary')
 * - size: 'sm' | 'md' | 'lg' (predeterminado: 'md')
 * - isLoading: boolean → muestra ícono de spinner, deshabilita el botón
 * - disabled: boolean
 * - icon: LucideIcon → ícono opcional renderizado antes del contenido
 * - className: string
 * - children: ReactNode
 * - onClick, type y props estándar de botón
 *
 * Usa el patrón forwardRef para reenvío de referencias.
 * Usa cn() de @shared/lib/cn para combinar classNames.
 * Usa Loader2 de lucide-react para el spinner de carga.
 */
