import React from 'react';
import { Typography, Box, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const PageHeader = ({ title, breadcrumbs = [] }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>
      {breadcrumbs.length > 0 && (
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return isLast ? (
              <Typography color="text.primary" key={index}>
                {crumb.text}
              </Typography>
            ) : (
              <Link
                component={RouterLink}
                to={crumb.path}
                color="inherit"
                key={index}
              >
                {crumb.text}
              </Link>
            );
          })}
        </Breadcrumbs>
      )}
    </Box>
  );
};

export default PageHeader;
