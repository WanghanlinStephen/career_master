import React from 'react';
import {
  Container,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import ChatIcon from '@mui/icons-material/Chat';
import EditIcon from '@mui/icons-material/Edit';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import TimelineIcon from '@mui/icons-material/Timeline';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

const UserGuide = () => {
  const steps = [
    {
      label: 'Select Target Position',
      description: 'Choose your target job from multiple career fields, and we will create a personalized transition plan based on the requirements of different positions.',
      tips: [
        'Choose the most suitable career category',
        'Select specific sub-positions',
        'If you cannot find a completely matching position, you can choose "Custom Position"'
      ],
      icon: <WorkIcon />
    },
    {
      label: 'Fill Additional Information',
      description: 'Provide your time availability and expectations to help AI better understand your needs and constraints.',
      tips: [
        'Estimated weekly time commitment',
        'Target expectations (such as work type, timeline)',
        'Personal skills and background information'
      ],
      icon: <EditIcon />
    },
    {
      label: 'Talk to AI Assistant',
      description: 'Through intelligent dialogue, describe your career goals, skill background, and transition needs in detail.',
      tips: [
        'Describe current career background and skills',
        'Explain specific requirements of target career',
        'Share your career development expectations'
      ],
      icon: <ChatIcon />
    },
    {
      label: 'Generate Career Transition Plan',
      description: 'The AI assistant will generate a personalized career transition plan based on your situation.',
      tips: [
        'Develop detailed skill development roadmap',
        'Plan time nodes and milestones',
        'Provide specific learning resource recommendations'
      ],
      icon: <AutoFixHighIcon />
    },
    {
      label: 'Start Executing Plan',
      description: 'Complete onboarding and start following the weekly and monthly career transition plan.',
      tips: [
        'Execute weekly tasks according to the plan',
        'Regularly evaluate progress and make adjustments',
        'Continuous learning and skill improvement'
      ],
      icon: <TimelineIcon />
    }
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#FF6B35', textAlign: 'center', mb: 4 }}>
        User Guide
      </Typography>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          AI-Powered Career Transition Planning
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Follow the steps below to get a personalized career transition plan and achieve your career goals
        </Typography>
      </Box>

      <Stepper orientation="vertical" sx={{ 
        '& .MuiStepLabel-label': { color: 'rgba(255, 255, 255, 0.9)' },
        '& .MuiStepLabel-label.Mui-active': { color: '#FF6B35' },
        '& .MuiStepIcon-root': { color: 'rgba(255, 255, 255, 0.4)' },
        '& .MuiStepIcon-root.Mui-active': { color: '#FF6B35' },
        '& .MuiStepConnector-line': { borderColor: 'rgba(255, 255, 255, 0.2)' }
      }}>
        {steps.map((step, index) => (
          <Step key={index} active={true}>
            <StepLabel icon={step.icon}>
              <Typography variant="h6" sx={{ color: '#FF6B35' }}>
                {step.label}
              </Typography>
            </StepLabel>
            <StepContent>
              <Box sx={{ mt: 2, mb: 3 }}>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 2 }}>
                  {step.description}
                </Typography>
                <Paper sx={{ 
                  p: 2, 
                  background: 'rgba(2, 8, 22, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}>
                  <List dense>
                    {step.tips.map((tip, idx) => (
                      <React.Fragment key={idx}>
                        <ListItem>
                          <ListItemIcon>
                            <TipsAndUpdatesIcon sx={{ color: '#FF6B35' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={tip} 
                            sx={{ 
                              '& .MuiListItemText-primary': { 
                                color: 'rgba(255, 255, 255, 0.9)' 
                              } 
                            }}
                          />
                        </ListItem>
                        {idx < step.tips.length - 1 && (
                          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                </Paper>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Container>
  );
};

export default UserGuide; 