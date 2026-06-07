/**
 * shared/hooks/use-pagination.ts
 *
 * Gestor de estado de paginación con generación de números de página (incluyendo elipsis).
 *
 * Uso:
 *   const { currentPage, totalPages, goToPage, nextPage, prevPage, pages } = usePagination({
 *     totalItems: 100,
 *     itemsPerPage: 10,
 *     initialPage: 1,
 *   });
 *   // pages → [1, 2, 3, '...', 10]
 *
 * Firma: usePagination({ totalItems, itemsPerPage, initialPage }): PaginationState
 */
