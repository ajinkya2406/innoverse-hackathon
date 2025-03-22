import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Typography
} from '@mui/material';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';

const DataTable = ({
  columns,
  data,
  loading,
  page,
  totalCount,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  emptyStateProps
}) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!data || data.length === 0) {
    return <EmptyState {...emptyStateProps} />;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="data table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.id || index}
              >
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align || 'left'}>
                      {column.format ? column.format(value, row) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Box>
  );
};

export default DataTable;
