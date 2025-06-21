import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';

const Proof = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        {/* Why Choose Us */}
        <Box sx={{ mb: 15, mt: 8 }}>
          <Typography 
            variant="h3" 
            align="center" 
            sx={{ 
              mb: 6,
              color: '#FF6B35',
              fontWeight: 700,
              textShadow: '0 0 10px rgba(255, 107, 53, 0.3)',
            }}
          >
            Why Choose Us
          </Typography>

          <Typography 
            variant="h5" 
            align="center" 
            sx={{ 
              mb: 6,
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            The choice of thousands of job seekers, AI-powered career transition planning experts
          </Typography>

          <Typography 
            variant="body1" 
            align="center" 
            sx={{ 
              mb: 8,
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '800px',
              mx: 'auto',
              fontSize: '1.1rem',
              lineHeight: 1.8
            }}
          >
            Our AI model is trained on extensive real career transition data, deeply understanding the requirements of various industries, and can accurately analyze your skill background to create personalized transition plans.
          </Typography>

          <Typography 
            variant="h4" 
            align="center" 
            sx={{ 
              mb: 6,
              color: '#FF6B35',
              fontWeight: 600,
            }}
          >
            Our Services
          </Typography>

          <Box 
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 4,
              flexWrap: 'wrap',
            }}
          >
            <Box
              sx={{
                width: '300px',
                p: 3,
                backgroundColor: 'rgba(2, 8, 22, 0.95)',
                borderRadius: 2,
                border: '1px solid rgba(255, 107, 53, 0.3)',
                boxShadow: '0 0 20px rgba(255, 107, 53, 0.2)',
              }}
            >
              <Typography 
                variant="h6" 
                align="center" 
                sx={{ 
                  mb: 2,
                  color: '#FF6B35',
                }}
              >
                Smart Career Planning
              </Typography>
              <Typography 
                variant="body1" 
                align="center" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                Intelligent analysis, one-click generation of personalized career transition plans
              </Typography>
            </Box>

            <Box
              sx={{
                width: '300px',
                p: 3,
                backgroundColor: 'rgba(2, 8, 22, 0.95)',
                borderRadius: 2,
                border: '1px solid rgba(255, 107, 53, 0.3)',
                boxShadow: '0 0 20px rgba(255, 107, 53, 0.2)',
              }}
            >
              <Typography 
                variant="h6" 
                align="center" 
                sx={{ 
                  mb: 2,
                  color: '#FF6B35',
                }}
              >
                Career Transition King
              </Typography>
              <Typography 
                variant="body1" 
                align="center" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                Industry information + free career planning = King, add customer service WeChat for free transition guidance.
              </Typography>
            </Box>

            <Box
              sx={{
                width: '300px',
                p: 3,
                backgroundColor: 'rgba(2, 8, 22, 0.95)',
                borderRadius: 2,
                border: '1px solid rgba(255, 107, 53, 0.3)',
                boxShadow: '0 0 20px rgba(255, 107, 53, 0.2)',
              }}
            >
              <Typography 
                variant="h6" 
                align="center" 
                sx={{ 
                  mb: 2,
                  color: '#FF6B35',
                }}
              >
                Deep Skill Analysis
              </Typography>
              <Typography 
                variant="body1" 
                align="center" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                Skill assessment, professional transition advice to help you succeed in career transition
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Proof; 