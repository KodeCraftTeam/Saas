/**
 * shared/hooks/use-local-storage.ts
 *
 * Persiste el estado en localStorage. Seguro para SSR. Se sincroniza entre pestañas del navegador.
 *
 * Uso:
 *   const [theme, setTheme] = useLocalStorage('theme', 'light');
 *
 * Firma: useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void]
 */
