/**
 * shared/hooks/use-click-outside.ts
 *
 * Llama a un manejador cuando se hace clic fuera de un elemento referenciado.
 *
 * Uso:
 *   const ref = useRef<HTMLDivElement>(null);
 *   useClickOutside(ref, () => setOpen(false));
 *
 * Firma: useClickOutside(ref: RefObject<HTMLElement>, handler: () => void): void
 */
