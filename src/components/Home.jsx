import React from 'react';
import { Container, Typography, Button, Box, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Proof from './Proof';

const Home = ({ translations }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          pt: 8,
          textAlign: 'center'
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            color: '#FF6B35',
            fontWeight: 700,
            mb: 4,
            fontSize: { xs: '2.5rem', md: '3.75rem' },
            textShadow: '0 0 10px rgba(255, 107, 53, 0.5)',
            lineHeight: 1.2,
          }}
        >
          AI-Powered
          <br />
          Career Transition Planning
        </Typography>

        <Typography
          variant="h5"
          sx={{
            mb: 6,
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: { xs: '1.2rem', md: '1.5rem' },
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          Create personalized career transition plans
          <br />
          to achieve your professional goals
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: 2, 
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/editor')}
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              py: 2,
              px: 6,
              backgroundColor: '#FF6B35',
              color: '#020816',
              minWidth: { xs: '200px', sm: '180px' },
              '&:hover': {
                backgroundColor: 'rgba(255, 107, 53, 0.8)',
              }
            }}
          >
            {translations.startButton}
          </Button>
          
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/view-my-plan')}
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              py: 2,
              px: 6,
              borderColor: 'rgba(255, 107, 53, 0.5)',
              color: '#FF6B35',
              minWidth: { xs: '200px', sm: '180px' },
              '&:hover': {
                borderColor: '#FF6B35',
                backgroundColor: 'rgba(255, 107, 53, 0.1)',
              }
            }}
          >
            {translations.viewMyPlanButton}
          </Button>
        </Box>
      </Box>

      <Box sx={{ mt: 12 }}>
        <Proof />
      </Box>
    </Container>
  );
};

export default Home;
