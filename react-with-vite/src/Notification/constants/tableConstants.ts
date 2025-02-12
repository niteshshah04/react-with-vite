export const TABLE_COLUMNS = {
  id: { label: 'ID', sortable: false },
  stock: { label: 'Stock', sortable: false },
  time: { label: 'Time', sortable: true },
  message: { label: 'Message', sortable: false }
} as const;

export const ROWS_PER_PAGE_OPTIONS = [5, 10, 20]; 