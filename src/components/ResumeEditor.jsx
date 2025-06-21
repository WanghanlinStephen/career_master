import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Container,
  Grid,
  TextField,
  Alert,
  Snackbar,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Paper,
  IconButton,
  Avatar,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';

// Job Categories List
const jobCategories = [
  {
    id: 'tech',
    name: 'Technology R&D',
    description: 'Includes various technology development and research positions',
    imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/jobs/tech.jpg',
    subCategories: [
      { value: 'frontend', name: 'Frontend Development' },
      { value: 'backend', name: 'Backend Development' },
      { value: 'fullstack', name: 'Full Stack Development' },
      { value: 'android', name: 'Android Development' },
      { value: 'ios', name: 'iOS Development' },
      { value: 'algorithm', name: 'Algorithm Engineer' },
      { value: 'ai', name: 'AI Engineer' },
      { value: 'data', name: 'Data Engineer' },
      { value: 'devops', name: 'DevOps Engineer' },
      { value: 'security', name: 'Security Engineer' },
      { value: 'test', name: 'Test Engineer' },
      { value: 'arch', name: 'Architect' },
    ]
  },
  {
    id: 'product',
    name: 'Product Design',
    description: 'Includes product management, user research, interaction design and other positions',
    imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/jobs/design.jpg',
    subCategories: [
      { value: 'pm', name: 'Product Manager' },
      { value: 'po', name: 'Product Operations' },
      { value: 'ue', name: 'UX Designer' },
      { value: 'ui', name: 'UI Designer' },
      { value: 'interaction', name: 'Interaction Designer' },
      { value: 'visual', name: 'Visual Designer' },
      { value: 'game', name: 'Game Designer' },
    ]
  },
  {
    id: 'data',
    name: 'Data Analysis',
    description: 'Includes data analysis, business intelligence, market research and other positions',
    imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/jobs/data.jpg',
    subCategories: [
      { value: 'data_analysis', name: 'Data Analyst' },
      { value: 'bi', name: 'Business Intelligence Analyst' },
      { value: 'market_research', name: 'Market Research' },
      { value: 'operation_analysis', name: 'Operations Analyst' },
      { value: 'quant', name: 'Quantitative Analyst' },
    ]
  },
  {
    id: 'operation',
    name: 'Operations & Marketing',
    description: 'Includes various operations, marketing, and sales positions',
    imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/jobs/marketing.jpg',
    subCategories: [
      { value: 'content_op', name: 'Content Operations' },
      { value: 'user_op', name: 'User Operations' },
      { value: 'activity_op', name: 'Activity Operations' },
      { value: 'community_op', name: 'Community Operations' },
      { value: 'marketing', name: 'Marketing' },
      { value: 'bd', name: 'Business Development' },
      { value: 'sales', name: 'Sales' },
    ]
  },
  {
    id: 'management',
    name: 'Management Positions',
    description: 'Includes project management, team management and other positions',
    imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/jobs/managment.jpg',
    subCategories: [
      { value: 'project_manager', name: 'Project Manager' },
      { value: 'tech_manager', name: 'Technical Manager' },
      { value: 'product_director', name: 'Product Director' },
      { value: 'operation_director', name: 'Operations Director' },
      { value: 'hr', name: 'HR' },
    ]
  },
  {
    id: 'others',
    name: 'Other Positions',
    description: 'Other professional positions',
    imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/jobs/other.jpg',
    subCategories: [
      { value: 'finance', name: 'Finance' },
      { value: 'legal', name: 'Legal' },
      { value: 'admin', name: 'Administration' },
      { value: 'customer_service', name: 'Customer Service' },
      { value: 'custom', name: 'Custom Position' },
    ]
  }
];

const steps = ['Select Position', 'Fill Additional Info', 'Smart Chat'];

const ResumeEditor = ({ translations }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [customJob, setCustomJob] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [file, setFile] = useState(null);
  const [customText, setCustomText] = useState('');
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showResumeForm, setShowResumeForm] = useState(false);
  const [progress, setProgress] = useState(0);

  // Chat related state
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I am your career transition planning assistant. Please tell me about your current career background, skills, and the target career you want to transition to. I will help you create a personalized transition plan.',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Add personal information form state
  const [formData, setFormData] = useState({
    timeCommitment: '',
    expectation: ''
  });

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI reply
    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // 1-3 seconds random delay
  };

  // Generate AI response
  const generateAIResponse = (userInput) => {
    const responses = [
      'Good, I have understood your background. Please tell me about your expected target career and specific position.',
      'Understood, this information is very helpful. How long do you hope to complete the career transition?',
      'Received! I am analyzing your skills and goals. What specific skills do you want to focus on developing?',
      'Great, I have understood your career goals. Please tell me about your expected salary range and work location.',
      'Very detailed information! I also need to understand some information about your learning ability and time arrangement.',
      'Thank you for providing this information! I am creating a personalized career transition plan for you.'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Handle enter key send
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  // Render message bubble
  const renderMessage = (message) => {
    const isUser = message.type === 'user';
    
    return (
      <Box
        key={message.id}
        sx={{
          display: 'flex',
          justifyContent: isUser ? 'flex-end' : 'flex-start',
          mb: 2,
          px: 2
        }}
      >
        <Box
          sx={{
            maxWidth: '70%',
            display: 'flex',
            flexDirection: isUser ? 'row-reverse' : 'row',
            alignItems: 'flex-start',
            gap: 1
          }}
        >
          <Avatar
            sx={{
              bgcolor: isUser ? '#FF6B35' : 'rgba(255, 107, 53, 0.2)',
              color: isUser ? 'white' : '#FF6B35',
              width: 32,
              height: 32,
              fontSize: '0.875rem'
            }}
          >
            {isUser ? 'U' : 'AI'}
          </Avatar>
          <Paper
            sx={{
              p: 2,
              backgroundColor: isUser 
                ? 'rgba(255, 107, 53, 0.1)' 
                : 'rgba(2, 8, 22, 0.8)',
              border: `1px solid ${isUser ? 'rgba(255, 107, 53, 0.3)' : 'rgba(255, 107, 53, 0.2)'}`,
              borderRadius: 2,
              color: 'white',
              wordBreak: 'break-word'
            }}
          >
            <Typography variant="body1">
              {message.content}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.6)',
                display: 'block',
                mt: 0.5
              }}
            >
              {message.timestamp.toLocaleTimeString()}
            </Typography>
          </Paper>
        </Box>
      </Box>
    );
  };

  // Render chat interface
  const renderChatInterface = () => {
    return (
      <Box sx={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
        {/* Chat Title */}
        <Box sx={{ 
          p: 2, 
          borderBottom: '1px solid rgba(255, 107, 53, 0.3)',
          backgroundColor: 'rgba(2, 8, 22, 0.9)'
        }}>
          <Typography variant="h6" sx={{ color: '#FF6B35', textAlign: 'center' }}>
            Career Transition Planning Assistant
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', mt: 1 }}>
            Please describe your career background and transition goals
          </Typography>
        </Box>

        {/* Message list */}
        <Box sx={{ 
          flex: 1, 
          overflowY: 'auto',
          backgroundColor: 'rgba(2, 8, 22, 0.95)',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255, 107, 53, 0.5)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(255, 107, 53, 0.1)',
            borderRadius: '4px',
          },
        }}>
          {messages.map(renderMessage)}
          
          {/* Typing indicator */}
          {isTyping && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2, px: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <Avatar
                  sx={{
                    bgcolor: 'rgba(255, 107, 53, 0.2)',
                    color: '#FF6B35',
                    width: 32,
                    height: 32,
                    fontSize: '0.875rem'
                  }}
                >
                  AI
                </Avatar>
                <Paper
                  sx={{
                    p: 2,
                    backgroundColor: 'rgba(2, 8, 22, 0.8)',
                    border: '1px solid rgba(255, 107, 53, 0.2)',
                    borderRadius: 2,
                    minWidth: '60px'
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: '#FF6B35',
                        animation: 'typing 1.4s infinite ease-in-out',
                        '&:nth-of-type(1)': { animationDelay: '0s' },
                        '&:nth-of-type(2)': { animationDelay: '0.2s' },
                        '&:nth-of-type(3)': { animationDelay: '0.4s' },
                        '@keyframes typing': {
                          '0%, 60%, 100%': {
                            transform: 'translateY(0)',
                            opacity: 0.4,
                          },
                          '30%': {
                            transform: 'translateY(-10px)',
                            opacity: 1,
                          },
                        },
                      }}
                    />
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: '#FF6B35',
                        animation: 'typing 1.4s infinite ease-in-out',
                        animationDelay: '0.2s',
                      }}
                    />
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: '#FF6B35',
                        animation: 'typing 1.4s infinite ease-in-out',
                        animationDelay: '0.4s',
                      }}
                    />
                  </Box>
                </Paper>
              </Box>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input box */}
        <Box sx={{ 
          p: 2, 
          borderTop: '1px solid rgba(255, 107, 53, 0.3)',
          backgroundColor: 'rgba(2, 8, 22, 0.9)'
        }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Please describe your career background, skills, target career and other information..."
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'rgba(255, 255, 255, 0.9)',
                  backgroundColor: 'rgba(255, 107, 53, 0.05)',
                  '& fieldset': {
                    borderColor: 'rgba(255, 107, 53, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 107, 53, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FF6B35',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'rgba(255, 255, 255, 0.9)',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.5)',
                  opacity: 1,
                },
              }}
            />
            <IconButton
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              sx={{
                backgroundColor: '#FF6B35',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 107, 53, 0.8)',
                },
                '&:disabled': {
                  backgroundColor: 'rgba(255, 107, 53, 0.3)',
                  color: 'rgba(255, 255, 255, 0.5)',
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    );
  };

  // Handle form input change
  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleFormSubmit = () => {
    // Convert form data to JSON format
    const resumeJson = {
      timeCommitment: formData.timeCommitment,
      expectation: formData.expectation
    };

    // Convert JSON object to string
    const resumeTextJson = JSON.stringify(resumeJson);
    setResumeText(resumeTextJson);
    setShowResumeForm(false);
  };

  // Render personal information form
  const renderResumeForm = () => {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#FF6B35' }}>
          Fill Additional Information
        </Typography>
        
        {/* Time Availability */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ color: '#FF6B35' }}>
            Estimated weekly time commitment
          </Typography>
          <TextField
            fullWidth
            label="e.g., 20 hours/week"
            value={formData.timeCommitment}
            onChange={(e) => handleFormChange('timeCommitment', e.target.value)}
            multiline
            rows={2}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                color: 'rgba(255, 255, 255, 0.9)',
                backgroundColor: 'rgba(255, 107, 53, 0.05)',
                '& fieldset': {
                  borderColor: 'rgba(255, 107, 53, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 107, 53, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FF6B35',
                },
              },
            }}
          />
        </Box>

        {/* Expectations */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ color: '#FF6B35' }}>
            Expectations
          </Typography>
          <TextField
            fullWidth
            label="e.g., what is your target company, what is your target compensation"
            value={formData.expectation}
            onChange={(e) => handleFormChange('expectation', e.target.value)}
            multiline
            rows={4}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                color: 'rgba(255, 255, 255, 0.9)',
                backgroundColor: 'rgba(255, 107, 53, 0.05)',
                '& fieldset': {
                  borderColor: 'rgba(255, 107, 53, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 107, 53, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FF6B35',
                },
              },
            }}
          />
        </Box>
      </Box>
    );
  };

  // Handle job selection
  const handleJobSelect = (categoryId, jobValue) => {
    setSelectedCategory(categoryId);
    setSelectedJob(jobValue);
    if (jobValue === 'custom') {
      setCustomJob('');
    }
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      // Check file type
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(uploadedFile.type)) {
        setSnackbar({
          open: true,
          message: 'Please upload a PDF or Word format file',
          severity: 'error'
        });
        return;
      }
      // Check file size (limit to 10MB)
      if (uploadedFile.size > 10 * 1024 * 1024) {
        setSnackbar({
          open: true,
          message: 'File size cannot exceed 10MB',
          severity: 'error'
        });
        return;
      }
      setFile(uploadedFile);
      setShowResumeForm(false);
      setSnackbar({
        open: true,
        message: 'File upload successful',
        severity: 'success'
      });
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const pollTaskStatus = async (taskId) => {
    try {
      const interval = setInterval(async () => {
        try {
          console.log(`Querying task status, Task ID: ${taskId}`);
          const res = await axios.get(`https://www.auto-resume.site/celery-task-status/${taskId}/`, {
            headers: { 
              'Accept': 'application/json'
            },
            timeout: 10000 // Set 10 seconds timeout
          });

          console.log(`🔍 Task status: ${res.data.status}`);

          if (res.data.status === "SUCCESS") {
            clearInterval(interval);
            setLoading(false);
            console.log('Task result:', res.data);
            navigate(`/result?html_url=${encodeURIComponent(res.data.result.html_url)}&preview_html_url=${encodeURIComponent(res.data.result.preview_html_url)}&json_resume=${encodeURIComponent(res.data.result.json_resume)}&theme=${encodeURIComponent(res.data.result.theme)}`);
          } else if (res.data.status === "FAILURE") {
            clearInterval(interval);
            setError(`Task failed: ${res.data.error}`);
            setLoading(false);
          } else if (res.data.status === "PROGRESS") {
            setProgress(res.data.progress);
          }
        } catch (error) {
          console.error('Polling request failed:', error);
          // Don't clear interval immediately, continue trying
        }
      }, 3000);

      // Set maximum polling time (5 minutes)
      setTimeout(() => {
        clearInterval(interval);
        if (loading) {
          setError('Task processing timed out, please refresh the page and try again');
          setLoading(false);
        }
      }, 300000);
    } catch (error) {
      console.error("Task status query failed:", error);
      setError("Unable to get task status");
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (activeStep === 1) {
      // Before entering the next step, convert form data to JSON format
      if (!file && !resumeText) {
        // Convert form data to JSON format
        const resumeJson = {
          timeCommitment: formData.timeCommitment,
          expectation: formData.expectation
        };

        // Convert JSON object to string
        const resumeTextJson = JSON.stringify(resumeJson);
        setResumeText(resumeTextJson);
      }
    }
    
    if (activeStep === steps.length - 1) {
      // Convert chat history to job description
      const chatContent = messages
        .filter(msg => msg.type === 'user')
        .map(msg => msg.content)
        .join('\n');
      setCustomText(chatContent);
      handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      navigate('/');
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // Generate a random wait time between 8-13 seconds
      const waitTime = Math.floor(Math.random() * 5000) + 8000; // 8000-13000 milliseconds
      
      // Simulate loading progress
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 10) + 1;
        if (currentProgress > 100) currentProgress = 100;
        setProgress(currentProgress);
      }, waitTime / 10);
      
      // Comment out the original backend call code
      /*
      const formData = new FormData();
      
      if (file) {
        formData.append('resume_file', file);
        formData.append('input_type', 'file');
      } else if (resumeText) {
        formData.append('resume_text', resumeText);
        formData.append('input_type', 'text');
      }
      
      if (selectedCategory) {
        formData.append('job_category', selectedCategory);
      }
      if (selectedJob) {
        formData.append('job_position', selectedJob);
      }
      if (customText) {
        formData.append('customized_info', customText);
      }

      const response = await axios.post('https://www.auto-resume.site/result/', formData);
      if (response.data.task_id) {
        pollTaskStatus(response.data.task_id);
      }
      */
      
      // Use setTimeout to simulate backend processing time
      setTimeout(() => {
        clearInterval(progressInterval);
        setProgress(100);
        setLoading(false);
        
        // Directly jump to result page, using a fixed image URL
        const mockImageUrl = 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/processed.png';
        navigate(`/result?preview_html_url=${encodeURIComponent(mockImageUrl)}`);
      }, waitTime);
      
    } catch (error) {
      setError('Submission failed, please try again');
      setLoading(false);
    }
  };

  // Render different step content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Select Target Position</Typography>
            <Grid container spacing={2}>
              {jobCategories.map((category) => (
                <Grid item xs={12} sm={6} md={4} key={category.id}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      border: selectedCategory === category.id ? '2px solid #FF6B35' : '1px solid rgba(255, 107, 53, 0.3)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'rgba(2, 8, 22, 0.95)',
                      backdropFilter: 'blur(10px)',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardMedia 
                      component="img" 
                      image={category.imageUrl} 
                      alt={category.name} 
                      sx={{ 
                        height: 120, 
                        objectFit: 'cover',
                        filter: 'brightness(0.9) contrast(1.1)'
                      }} 
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom sx={{ color: '#FF6B35' }}>{category.name}</Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {category.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {selectedCategory && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>Select Specific Position</Typography>
                <Grid container spacing={2}>
                  {jobCategories
                    .find(c => c.id === selectedCategory)
                    ?.subCategories.map((job) => (
                      <Grid item xs={12} sm={6} md={4} key={job.value}>
                        <Button
                          fullWidth
                          variant={selectedJob === job.value ? "contained" : "outlined"}
                          onClick={() => handleJobSelect(selectedCategory, job.value)}
                          sx={{
                            borderColor: 'rgba(255, 107, 53, 0.3)',
                            color: selectedJob === job.value ? '#020816' : '#FF6B35',
                            height: '48px',
                            '&:hover': {
                              borderColor: 'rgba(255, 107, 53, 0.5)',
                            }
                          }}
                        >
                          {job.name}
                        </Button>
                      </Grid>
                    ))}
                </Grid>
              </Box>
            )}
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Fill Additional Information
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={8}>
                <Card sx={{ 
                  backgroundColor: 'rgba(2, 8, 22, 0.8)',
                  border: '2px dashed rgba(255, 107, 53, 0.3)',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  mb: 3,
                  '&:hover': {
                    borderColor: 'rgba(255, 107, 53, 0.5)',
                    backgroundColor: 'rgba(255, 107, 53, 0.05)',
                  }
                }}>
                  <input
                    accept=".pdf,.doc,.docx"
                    style={{ display: 'none' }}
                    id="resume-file-upload"
                    type="file"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="resume-file-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      sx={{
                        borderColor: 'rgba(255, 107, 53, 0.5)',
                        color: '#FF6B35',
                        mb: 2,
                        '&:hover': {
                          borderColor: '#FF6B35',
                          backgroundColor: 'rgba(255, 107, 53, 0.1)',
                        }
                      }}
                    >
                      Choose File
                    </Button>
                  </label>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Supports PDF, Word formats, up to 10MB
                  </Typography>

                  {file && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body1" sx={{ color: '#FF6B35', mb: 1 }}>
                        Selected file: {file.name}
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={removeFile}
                        sx={{ 
                          borderColor: 'rgba(255, 0, 0, 0.5)',
                          color: '#ff4444',
                          '&:hover': {
                            borderColor: '#ff4444',
                            backgroundColor: 'rgba(255, 0, 0, 0.1)',
                          }
                        }}
                      >
                        Remove File
                      </Button>
                    </Box>
                  )}
                </Card>

                <Box sx={{ mt: 2 }}>
                  {renderResumeForm()}
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Smart Chat
            </Typography>
            <Card sx={{ 
              backgroundColor: 'rgba(2, 8, 22, 0.95)',
              border: '1px solid rgba(255, 107, 53, 0.3)',
              borderRadius: 2,
              overflow: 'hidden'
            }}>
              {renderChatInterface()}
            </Card>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            color: '#FF6B35',
            textAlign: 'center',
            mb: 4,
            fontWeight: 700,
            textShadow: '0 0 10px rgba(255, 107, 53, 0.3)',
          }}
        >
          Career Transition Planning
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {loading && (
          <Box display="flex" flexDirection="column" alignItems="center" my={4}>
            <CircularProgress sx={{ color: '#FF6B35', mb: 2 }} />
            <Typography sx={{ color: '#FF6B35' }}>
              {progress > 0 ? `Processing progress: ${progress}%` : 'Processing...'}
            </Typography>
          </Box>
        )}

        {getStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Previous Step
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={
              (activeStep === 0 && !selectedJob) ||
              loading
            }
            sx={{
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0'
              }
            }}
          >
            {activeStep === steps.length - 1 ? 'Generate Plan' : 'Next Step'}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ResumeEditor;
