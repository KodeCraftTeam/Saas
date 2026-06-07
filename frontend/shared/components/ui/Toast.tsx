/**
 * shared/components/ui/Toast.tsx
 *
 * Sistema de notificaciones toast.
 *
 * Componentes:
 * - ToastProvider → envuelve la aplicación, renderiza la pila de toasts
 * - useToast() hook → devuelve { toast, dismiss }
 *
 * Función toast:
 *   toast({ title: 'Saved!', variant: 'success' })
 *   toast({ title: 'Error', description: 'Something went wrong', variant: 'error' })
 *
 * Props:
 * - variant: 'success' | 'error' | 'info' | 'warning'
 * - title: string
 * - description?: string
 * - duration?: number (predeterminado: 3000ms)
 *
 * Características:
 * - Cierre automático después de la duración
 * - Apilamiento de múltiples toasts (esquina inferior derecha)
 * - Entrada/salida animada (deslizamiento desde la derecha)
 * - Cierre manual (botón X)
 */
