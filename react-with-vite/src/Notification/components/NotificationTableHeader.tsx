import React, { useMemo } from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { TABLE_COLUMNS } from '../constants/tableConstants';

interface NotificationTableHeaderProps {
  orderBy: string;
  order: 'asc' | 'desc';
  handleSort: (col: string) => void;
}

export const NotificationTableHeader: React.FC<NotificationTableHeaderProps> = React.memo(({
  orderBy,
  order,
  handleSort
}) => {
  return useMemo(() => (
    <TableHead>
      <TableRow>
        {Object.entries(TABLE_COLUMNS).map(([key, config]) => (
          <TableCell
            key={key}
            sortDirection={orderBy === key ? order : false}
            onClick={() => config.sortable && handleSort(key)}
            sx={{ 
              cursor: config.sortable ? 'pointer' : 'default'
            }}
          >
            {config.sortable ? (
              <TableSortLabel
                active={orderBy === key}
                direction={orderBy === key ? order : 'asc'}
              >
                {config.label}
              </TableSortLabel>
            ) : (
              config.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  ), [orderBy, order, handleSort]);
});

NotificationTableHeader.displayName = 'NotificationTableHeader'; 