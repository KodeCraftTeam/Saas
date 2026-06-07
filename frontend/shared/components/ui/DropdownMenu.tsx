/**
 * shared/components/ui/DropdownMenu.tsx
 *
 * Menú desplegable de acciones activado por un clic.
 *
 * Props:
 * - trigger: ReactNode → elemento que abre el menú
 * - items: {
 *     label: string;
 *     icon?: LucideIcon;
 *     onClick: () => void;
 *     variant?: 'default' | 'danger';
 *   }[]
 *
 * Características:
 * - Posicionado debajo del trigger, alineado a la derecha
 * - Clic fuera para cerrar
 * - Navegación por teclado (ArrowUp/Down, Enter, Escape)
 * - La variante danger muestra texto rojo
 */
