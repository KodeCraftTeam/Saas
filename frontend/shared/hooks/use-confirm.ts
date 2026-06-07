/**
 * shared/hooks/use-confirm.ts
 *
 * Gestor de estado del diálogo de confirmación. Retorna una Promise que se resuelve
 * cuando el usuario confirma o cancela.
 *
 * Uso:
 *   const { confirm, ConfirmDialog } = useConfirm();
 *   const handleDelete = async () => {
 *     const confirmed = await confirm('Are you sure?');
 *     if (confirmed) { /* delete *​/ }
 *   };
 *
 * Retorna: { confirm: (message: string) => Promise<boolean>, isOpen, message, onConfirm, onCancel }
 */
