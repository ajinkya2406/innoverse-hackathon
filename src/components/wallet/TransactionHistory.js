import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip
} from '@mui/material';
import {
  formatCurrency,
  formatDate,
  formatTransactionType,
  formatTransactionStatus,
  getStatusColor
} from '../../utils/formatters';
import DataTable from '../common/DataTable';
import EmptyState from '../common/EmptyState';
import ReceiptIcon from '@mui/icons-material/Receipt';

const columns = [
  {
    id: 'date',
    label: 'Date',
    format: (value) => formatDate(value)
  },
  {
    id: 'type',
    label: 'Type',
    format: (value) => formatTransactionType(value)
  },
  {
    id: 'amount',
    label: 'Amount',
    align: 'right',
    format: (value, row) => {
      const isCredit = ['deposit', 'refund'].includes(row.type);
      return (
        <Typography
          color={isCredit ? 'success.main' : 'error.main'}
          fontWeight="medium"
        >
          {isCredit ? '+' : '-'}{formatCurrency(Math.abs(value))}
        </Typography>
      );
    }
  },
  {
    id: 'description',
    label: 'Description',
    format: (value) => value || '-'
  },
  {
    id: 'status',
    label: 'Status',
    align: 'center',
    format: (value) => (
      <Chip
        label={formatTransactionStatus(value)}
        color={getStatusColor(value)}
        size="small"
      />
    )
  }
];

const TransactionHistory = ({
  transactions,
  loading,
  page,
  totalCount,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange
}) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" component="div">
            Transaction History
          </Typography>
        </Box>
        <DataTable
          columns={columns}
          data={transactions}
          loading={loading}
          page={page}
          totalCount={totalCount}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          emptyStateProps={{
            title: 'No Transactions',
            description: 'You haven\'t made any transactions yet.',
            icon: ReceiptIcon
          }}
        />
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
