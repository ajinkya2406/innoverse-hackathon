import React, { useEffect, useState } from 'react';
import { Container, Grid, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../components/common/PageHeader';
import WalletCard from '../components/wallet/WalletCard';
import TransactionHistory from '../components/wallet/TransactionHistory';
import AddMoneyDialog from '../components/wallet/AddMoneyDialog';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getWalletBalance, addMoney, getTransactions } from '../store/slices/walletSlice';
import { showSnackbar } from '../store/slices/uiSlice';

const WalletPage = () => {
  const dispatch = useDispatch();
  const [isAddMoneyDialogOpen, setIsAddMoneyDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const {
    balance,
    transactions,
    totalTransactions,
    loading
  } = useSelector((state) => state.wallet);

  useEffect(() => {
    dispatch(getWalletBalance());
    dispatch(getTransactions({ page: page + 1, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const handleAddMoney = async (values) => {
    try {
      await dispatch(addMoney(values)).unwrap();
      setIsAddMoneyDialogOpen(false);
      dispatch(showSnackbar({
        message: 'Money added to wallet successfully',
        severity: 'success'
      }));
    } catch (error) {
      dispatch(showSnackbar({
        message: error.message || 'Failed to add money',
        severity: 'error'
      }));
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading && !transactions.length) {
    return <LoadingSpinner />;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <PageHeader
          title="My Wallet"
          breadcrumbs={[{ text: 'Wallet', path: '/wallet' }]}
        />

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <WalletCard
              balance={balance}
              onAddMoney={() => setIsAddMoneyDialogOpen(true)}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <TransactionHistory
              transactions={transactions}
              loading={loading}
              page={page}
              totalCount={totalTransactions}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </Grid>
        </Grid>

        <AddMoneyDialog
          open={isAddMoneyDialogOpen}
          onClose={() => setIsAddMoneyDialogOpen(false)}
          onSubmit={handleAddMoney}
        />
      </Box>
    </Container>
  );
};

export default WalletPage;
