/**
 * shared/hooks/use-copy-to-clipboard.ts
 *
 * Copia texto al portapapeles. isCopied se restablece después de 2 segundos.
 *
 * Uso:
 *   const { copy, isCopied } = useCopyToClipboard();
 *   <button onClick={() => copy('Hello')}>{isCopied ? 'Copied!' : 'Copy'}</button>
 *
 * Retorna: { copy: (text: string) => Promise<void>, isCopied: boolean }
 */
