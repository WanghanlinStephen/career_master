import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Divider,
  Alert,
  CircularProgress,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';

const ViewMyPlan = ({ translations }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState('');

  // Mock data for demonstration
  useEffect(() => {
    // Simulate loading plans from localStorage or backend
    setTimeout(() => {
      const mockPlans = [
        {
          id: 1,
          title: "Career Transition Plan to Product Operations",
          targetPosition: "Product Design - Product Operations",
          createdAt: "2024-01-15",
          status: "active",
          timeline: "6 months",
          estimatedSalary: "$80,000 - $120,000",
          steps: [
            "Month 1-2: Learn Python and machine learning fundamentals",
            "Month 3-4: Build AI projects and contribute to open source",
            "Month 5-6: Network with AI professionals and apply for positions"
          ],
          skillsToDevelop: ["Python", "Machine Learning", "Deep Learning", "Data Analysis"],
          progress: 65
        },
        {
          id: 2,
          title: "Career Transition Plan to Data Analyst",
          targetPosition: "Data Analysis - Data Analyst",
          createdAt: "2024-01-10",
          status: "completed",
          timeline: "4 months",
          estimatedSalary: "$70,000 - $100,000",
          steps: [
            "Month 1: Learn SQL and data visualization tools",
            "Month 2: Master Excel and basic statistics",
            "Month 3: Build portfolio projects",
            "Month 4: Apply for positions and interview preparation"
          ],
          skillsToDevelop: ["SQL", "Excel", "Tableau", "Python", "Statistics"],
          progress: 100
        }
      ];
      setPlans(mockPlans);
      setLoading(false);
    }, 1500);
  }, []);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleViewPlan = (planId) => {
    // Navigate to detailed plan view
    navigate(`/plan-details/${planId}`);
  };

  const handleDownloadPlan = (planId) => {
    // Implement download functionality
    console.log('Downloading plan:', planId);
  };

  const handleSharePlan = (planId) => {
    // Implement share functionality
    console.log('Sharing plan:', planId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#FF6B35';
      case 'completed':
        return '#4CAF50';
      case 'paused':
        return '#FF9800';
      default:
        return '#757575';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'paused':
        return 'Paused';
      default:
        return 'Unknown';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '60vh' 
        }}>
          <CircularProgress sx={{ color: '#FF6B35', mb: 2 }} />
          <Typography sx={{ color: '#FF6B35' }}>
            Loading your plans...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBackToHome}
            sx={{
              color: '#FF6B35',
              mr: 2,
              '&:hover': {
                backgroundColor: 'rgba(255, 107, 53, 0.1)',
              }
            }}
          >
            Back to Home
          </Button>
          <Typography 
            variant="h4" 
            sx={{ 
              color: '#FF6B35',
              fontWeight: 700,
              textShadow: '0 0 10px rgba(255, 107, 53, 0.3)',
            }}
          >
            My Career Transition Plans
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {plans.length === 0 ? (
          <Card sx={{ 
            backgroundColor: 'rgba(2, 8, 22, 0.95)',
            border: '1px solid rgba(255, 107, 53, 0.3)',
            borderRadius: 2,
            p: 4,
            textAlign: 'center'
          }}>
            <Typography variant="h6" sx={{ color: '#FF6B35', mb: 2 }}>
              No Plans Found
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
              You haven't created any career transition plans yet. Start planning your career transition now!
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/editor')}
              sx={{
                backgroundColor: '#FF6B35',
                color: '#020816',
                '&:hover': {
                  backgroundColor: 'rgba(255, 107, 53, 0.8)',
                }
              }}
            >
              Create Your First Plan
            </Button>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {plans.map((plan) => (
              <Grid item xs={12} md={6} key={plan.id}>
                <Card sx={{ 
                  backgroundColor: 'rgba(2, 8, 22, 0.95)',
                  border: '1px solid rgba(255, 107, 53, 0.3)',
                  borderRadius: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    borderColor: 'rgba(255, 107, 53, 0.5)',
                    boxShadow: '0 0 20px rgba(255, 107, 53, 0.2)',
                  }
                }}>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    {/* Plan Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" sx={{ color: '#FF6B35', fontWeight: 600 }}>
                        {plan.title}
                      </Typography>
                      <Chip
                        label={getStatusText(plan.status)}
                        sx={{
                          backgroundColor: getStatusColor(plan.status),
                          color: 'white',
                          fontSize: '0.75rem',
                          height: '24px'
                        }}
                      />
                    </Box>

                    {/* Target Position */}
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
                      <strong>Target Position:</strong> {plan.targetPosition}
                    </Typography>

                    {/* Progress Bar */}
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Progress
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#FF6B35' }}>
                          {plan.progress}%
                        </Typography>
                      </Box>
                      <Box sx={{ 
                        width: '100%', 
                        height: 8, 
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                        borderRadius: 4,
                        overflow: 'hidden'
                      }}>
                        <Box sx={{ 
                          width: `${plan.progress}%`, 
                          height: '100%', 
                          backgroundColor: '#FF6B35',
                          transition: 'width 0.3s ease'
                        }} />
                      </Box>
                    </Box>

                    {/* Plan Details */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                        <strong>Timeline:</strong> {plan.timeline}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                        <strong>Estimated Salary:</strong> {plan.estimatedSalary}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        <strong>Created:</strong> {plan.createdAt}
                      </Typography>
                    </Box>

                    {/* Skills */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                        <strong>Skills to Develop:</strong>
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {plan.skillsToDevelop.slice(0, 3).map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(255, 107, 53, 0.2)',
                              color: '#FF6B35',
                              fontSize: '0.7rem',
                              height: '20px'
                            }}
                          />
                        ))}
                        {plan.skillsToDevelop.length > 3 && (
                          <Chip
                            label={`+${plan.skillsToDevelop.length - 3} more`}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              color: 'rgba(255, 255, 255, 0.7)',
                              fontSize: '0.7rem',
                              height: '20px'
                            }}
                          />
                        )}
                      </Box>
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleViewPlan(plan.id)}
                        sx={{
                          backgroundColor: '#FF6B35',
                          color: '#020816',
                          flex: 1,
                          '&:hover': {
                            backgroundColor: 'rgba(255, 107, 53, 0.8)',
                          }
                        }}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<DownloadIcon />}
                        onClick={() => handleDownloadPlan(plan.id)}
                        sx={{
                          borderColor: 'rgba(255, 107, 53, 0.5)',
                          color: '#FF6B35',
                          '&:hover': {
                            borderColor: '#FF6B35',
                            backgroundColor: 'rgba(255, 107, 53, 0.1)',
                          }
                        }}
                      >
                        Download
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ShareIcon />}
                        onClick={() => handleSharePlan(plan.id)}
                        sx={{
                          borderColor: 'rgba(255, 107, 53, 0.5)',
                          color: '#FF6B35',
                          '&:hover': {
                            borderColor: '#FF6B35',
                            backgroundColor: 'rgba(255, 107, 53, 0.1)',
                          }
                        }}
                      >
                        Share
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default ViewMyPlan; 