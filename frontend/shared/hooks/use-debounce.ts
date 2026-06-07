/**
 * shared/hooks/use-debounce.ts
 *
 * Retrasa un valor con un retardo configurable.
 *
 * Uso:
 *   const [search, setSearch] = useState('');
 *   const debouncedSearch = useDebounce(search, 300);
 *
 * Firma: useDebounce<T>(value: T, delay?: number): T
 * Retraso predeterminado: 300ms
 */
