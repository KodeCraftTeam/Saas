/**
 * shared/components/ui/Modal.tsx
 *
 * Diálogo superpuesto con controles de cierre.
 *
 * Props:
 * - isOpen: boolean
 * - onClose: () => void
 * - title: string
 * - children: ReactNode
 * - size: 'sm' | 'md' | 'lg' (predeterminado: 'md')
 *
 * Características:
 * - Fondo superpuesto con cierre al hacer clic
 * - Botón de cerrar (X) en el encabezado
 * - Tecla ESC para cerrar
 * - Renderizado basado en portal (createPortal a document.body)
 * - Gestión básica de enfoque
 */
