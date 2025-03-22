import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Box,
  Tabs,
  Tab,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../components/common/PageHeader';
import TokenCard from '../components/meals/TokenCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getMyTokens, cancelToken } from '../store/slices/mealSlice';
import { showSnackbar } from '../store/slices/uiSlice';

const TokensPage = () => {
  const dispatch = useDispatch();
  const { tokens, loading, error } = useSelector((state) => state.meals);

  const [activeTab, setActiveTab] = useState(0);
  const [tokenToCancel, setTokenToCancel] = useState(null);

  useEffect(() => {
    dispatch(getMyTokens());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCancelClick = (token) => {
    setTokenToCancel(token);
  };

  const handleCancelConfirm = async () => {
    try {
      await dispatch(cancelToken(tokenToCancel._id)).unwrap();
      setTokenToCancel(null);
      dispatch(showSnackbar({
        message: 'Token cancelled successfully',
        severity: 'success'
      }));
    } catch (error) {
      dispatch(showSnackbar({
        message: error.message || 'Failed to cancel token',
        severity: 'error'
      }));
    }
  };

  const activeTokens = tokens.filter(token => token.status === 'active');
  const pastTokens = tokens.filter(token => token.status !== 'active');

  const renderTokens = (tokenList) => {
    if (tokenList.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No tokens found
          </Typography>
        </Box>
      );
    }

    return (
      <Grid container spacing={3}>
        {tokenList.map((token) => (
          <Grid item key={token._id} xs={12} sm={6} md={4}>
            <TokenCard
              token={token}
              onCancel={token.status === 'active' ? handleCancelClick : undefined}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <PageHeader
          title="My Tokens"
          breadcrumbs={[{ text: 'My Tokens' }]}
        />

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="token tabs"
          >
            <Tab
              label={`Active Tokens (${activeTokens.length})`}
              id="tokens-tab-0"
            />
            <Tab
              label={`Past Tokens (${pastTokens.length})`}
              id="tokens-tab-1"
            />
          </Tabs>
        </Box>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <Box role="tabpanel" hidden={activeTab !== 0}>
            {activeTab === 0 ? renderTokens(activeTokens) : renderTokens(pastTokens)}
          </Box>
        )}

        {/* Cancel Token Dialog */}
        <Dialog
          open={Boolean(tokenToCancel)}
          onClose={() => setTokenToCancel(null)}
        >
          <DialogTitle>Cancel Token</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to cancel this token? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setTokenToCancel(null)}>
              No, Keep Token
            </Button>
            <Button
              onClick={handleCancelConfirm}
              color="error"
              variant="contained"
            >
              Yes, Cancel Token
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default TokensPage;
