/**
 * shared/hooks/use-media-query.ts
 *
 * Retorna true si la media query CSS coincide. Seguro para SSR (retorna false en el servidor).
 *
 * Uso:
 *   const isMobile = useMediaQuery('(max-width: 768px)')
 *   const isDark = useMediaQuery('(prefers-color-scheme: dark)')
 *
 * Firma: useMediaQuery(query: string): boolean
 */
