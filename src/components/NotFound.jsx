import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = ({ translations }) => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 10 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <ErrorOutlineIcon sx={{ fontSize: 100, color: 'primary.main' }} />
        <Typography variant="h2" color="primary" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          {translations.pageNotFound}
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          {translations.pageNotFoundDescription}
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary" sx={{ mt: 2 }}>
          {translations.backToHome}
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
