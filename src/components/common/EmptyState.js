import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmptyState = ({
  title,
  description,
  actionText,
  actionPath,
  icon: Icon
}) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        textAlign: 'center'
      }}
    >
      {Icon && (
        <Icon
          sx={{
            fontSize: 64,
            color: 'text.secondary',
            mb: 2
          }}
        />
      )}
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {description}
      </Typography>
      {actionText && actionPath && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(actionPath)}
        >
          {actionText}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
