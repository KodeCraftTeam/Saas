/**
 * shared/components/feedback/ErrorBoundary.tsx
 *
 * Límite de errores de React. Captura errores de renderizado y muestra una UI de respaldo.
 *
 * Props:
 * - children: ReactNode
 * - fallback?: ReactNode → respaldo personalizado (por defecto usa ErrorFallback)
 *
 * Implementación: Componente de clase con getDerivedStateFromError + componentDidCatch.
 * En caso de error, renderiza ErrorFallback con el mensaje de error y un botón de reintentar.
 */
