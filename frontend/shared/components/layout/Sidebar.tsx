/**
 * shared/components/layout/Sidebar.tsx
 *
 * Navegación lateral colapsable para el panel de control.
 *
 * Props:
 * - items: { label: string; icon: LucideIcon; href: string; active?: boolean }[]
 * - collapsed: boolean
 * - onToggle: () => void
 *
 * Características:
 * - Logo/nombre del inquilino en la parte superior
 * - Enlaces de navegación con íconos
 * - Resaltado del estado activo (color de fondo + borde izquierdo)
 * - Colapsable: muestra solo íconos cuando está colapsado, íconos + etiquetas cuando está expandido
 * - Botón de alternar en la parte inferior
 * - Móvil: se desliza desde la izquierda como superposición
 */
