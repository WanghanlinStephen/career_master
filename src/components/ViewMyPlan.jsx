import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  IconButton,
  Grid,
  Card,
  CardContent,
  Collapse
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const PLAN_TYPES = ['All Plans', 'Current Month', 'Current Week', "Today's Tasks"];

// Hierarchical plan structure where each level contains plans from the previous level
const mockPlans = {
  'All Plans': [
    // Master Career Plan (contains all monthly plans)
    { 
      id: 'career-master', 
      text: '🎯 BI Analyst Career Master Plan', 
      checked: false,
      hasSubPlans: true,
      level: 'master',
      subPlans: [
        { id: 'month-1-2', text: '📅 Months 1-2: Foundation Building', checked: false, level: 'monthly' },
        { id: 'month-3-4', text: '📅 Months 3-4: Advanced Analytics', checked: false, level: 'monthly' },
        { id: 'month-5-6', text: '📅 Months 5-6: Business Intelligence Tools', checked: false, level: 'monthly' },
        { id: 'month-7-8', text: '📅 Months 7-8: Domain Knowledge & Specialization', checked: false, level: 'monthly' },
        { id: 'month-9-10', text: '📅 Months 9-10: Advanced Skills & Tools', checked: false, level: 'monthly' },
        { id: 'month-11-12', text: '📅 Months 11-12: Career Preparation', checked: false, level: 'monthly' },
      ]
    },
    // Resume and Portfolio Plan
    { 
      id: 'resume-portfolio', 
      text: '📄 Resume & Portfolio Development', 
      checked: false,
      hasSubPlans: true,
      level: 'master',
      subPlans: [
        { id: 'resume-update', text: '📝 Update resume with BI keywords', checked: false, level: 'monthly' },
        { id: 'linkedin-update', text: '🔗 Update LinkedIn profile', checked: false, level: 'monthly' },
        { id: 'portfolio-website', text: '🌐 Create portfolio website', checked: false, level: 'monthly' },
      ]
    },
    // Networking Plan
    { 
      id: 'networking', 
      text: '🤝 Professional Networking Strategy', 
      checked: false,
      hasSubPlans: true,
      level: 'master',
      subPlans: [
        { id: 'meetups', text: '🎯 Attend industry meetups', checked: false, level: 'monthly' },
        { id: 'linkedin-connect', text: '🔗 Connect with professionals', checked: false, level: 'monthly' },
        { id: 'informational-interviews', text: '💬 Schedule informational interviews', checked: false, level: 'monthly' },
      ]
    },
  ],
  'Current Month': [
    // Current Month: Foundation Building (contains weekly plans for this month)
    { 
      id: 'current-month', 
      text: '📅 Current Month: Foundation Building (Months 1-2)', 
      checked: false,
      hasSubPlans: true,
      level: 'monthly',
      subPlans: [
        { id: 'week-1', text: '📊 Week 1: SQL Fundamentals', checked: false, level: 'weekly' },
        { id: 'week-2', text: '📊 Week 2: Data Visualization Basics', checked: false, level: 'weekly' },
        { id: 'week-3', text: '📊 Week 3: Excel Advanced Functions', checked: false, level: 'weekly' },
        { id: 'week-4', text: '📊 Week 4: SQL Projects & Certification', checked: false, level: 'weekly' },
      ]
    },
    // Current Month: Resume & Portfolio Goals
    { 
      id: 'resume-current-month', 
      text: '📄 Current Month: Resume & Portfolio Goals', 
      checked: false,
      hasSubPlans: true,
      level: 'monthly',
      subPlans: [
        { id: 'resume-week-1', text: '📝 Week 1: Resume keyword optimization', checked: false, level: 'weekly' },
        { id: 'resume-week-2', text: '🔗 Week 2: LinkedIn profile update', checked: false, level: 'weekly' },
        { id: 'resume-week-3', text: '🌐 Week 3: Portfolio website setup', checked: false, level: 'weekly' },
        { id: 'resume-week-4', text: '📊 Week 4: Portfolio content creation', checked: false, level: 'weekly' },
      ]
    },
  ],
  'Current Week': [
    // This Week: SQL Fundamentals (contains daily tasks for this week)
    { 
      id: 'this-week', 
      text: '📊 This Week: SQL Fundamentals', 
      checked: false,
      hasSubPlans: true,
      level: 'weekly',
      subPlans: [
        { id: 'day-1', text: '📚 SQL basics introduction', checked: false, level: 'daily' },
        { id: 'day-2', text: '📚 SELECT, FROM, WHERE clauses', checked: false, level: 'daily' },
        { id: 'day-3', text: '📚 JOIN operations (INNER, LEFT, RIGHT)', checked: false, level: 'daily' },
        { id: 'day-4', text: '📚 GROUP BY and aggregations', checked: false, level: 'daily' },
        { id: 'day-5', text: '📚 Practice exercises', checked: false, level: 'daily' },
        { id: 'day-6', text: '📚 Mini project', checked: false, level: 'daily' },
        { id: 'day-7', text: '📚 Review and assessment', checked: false, level: 'daily' },
      ]
    },
    // This Week: Resume Goals
    { 
      id: 'resume-this-week', 
      text: '📝 This Week: Resume keyword optimization', 
      checked: false,
      hasSubPlans: true,
      level: 'weekly',
      subPlans: [
        { id: 'resume-day-1', text: '📝 Research BI keywords', checked: false, level: 'daily' },
        { id: 'resume-day-2', text: '📝 Update experience section', checked: false, level: 'daily' },
        { id: 'resume-day-3', text: '📝 Add skills section', checked: false, level: 'daily' },
        { id: 'resume-day-4', text: '📝 Review and edit', checked: false, level: 'daily' },
        { id: 'resume-day-5', text: '📝 Get feedback', checked: false, level: 'daily' },
        { id: 'resume-day-6', text: '📝 Finalize resume', checked: false, level: 'daily' },
        { id: 'resume-day-7', text: '📝 Create multiple versions', checked: false, level: 'daily' },
      ]
    },
  ],
  "Today's Tasks": {
    'To-Do': [
      { id: 'today-1', text: '📚 Complete SQL lesson 1' },
      { id: 'today-2', text: '📊 Install Tableau Desktop' },
      { id: 'today-3', text: '📝 Research BI keywords for resume' },
      { id: 'today-4', text: '🔗 Update LinkedIn profile' },
      { id: 'today-5', text: '📚 Read SQL documentation' },
    ],
    'In-Process': [
      { id: 'today-6', text: '📊 Building customer dashboard' },
      { id: 'today-7', text: '📚 Learning DAX formulas' },
      { id: 'today-8', text: '📝 Resume keyword optimization' },
    ],
    'Done': [
      { id: 'today-9', text: '☕ Morning routine' },
      { id: 'today-10', text: '📧 Check emails' },
      { id: 'today-11', text: '⚙️ Setup development environment' },
      { id: 'today-12', text: '📚 Read SQL documentation' },
    ],
  },
};

const ViewMyPlan = () => {
  const [selectedType, setSelectedType] = useState('All Plans');
  const [plans, setPlans] = useState(mockPlans);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'agent', text: 'Hi! How can I help you with your plans today?' }
  ]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState(new Set());

  const handleToggle = (planId) => {
    if (selectedType === "Today's Tasks") return; // Don't handle checkbox for today's tasks
    
    setPlans((prev) => {
      const updated = { ...prev };
      updated[selectedType] = updated[selectedType].map((item) =>
        item.id === planId ? { ...item, checked: !item.checked } : item
      );
      return updated;
    });
  };

  const handleSubPlanToggle = (mainPlanId, subPlanId) => {
    setPlans((prev) => {
      const updated = { ...prev };
      updated[selectedType] = updated[selectedType].map((item) => {
        if (item.id === mainPlanId && item.subPlans) {
          return {
            ...item,
            subPlans: item.subPlans.map((subPlan) =>
              subPlan.id === subPlanId ? { ...subPlan, checked: !subPlan.checked } : subPlan
            )
          };
        }
        return item;
      });
      return updated;
    });
  };

  const handleExpandToggle = (planId) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(planId)) {
        newSet.delete(planId);
      } else {
        newSet.add(planId);
      }
      return newSet;
    });
  };

  const handleDragStart = (e, item, column) => {
    setDraggedItem({ ...item, sourceColumn: column });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    if (!draggedItem) return;

    setPlans((prev) => {
      const updated = { ...prev };
      const dailyPlans = { ...updated["Today's Tasks"] };
      
      // Remove from source column
      dailyPlans[draggedItem.sourceColumn] = dailyPlans[draggedItem.sourceColumn].filter(
        item => item.id !== draggedItem.id
      );
      
      // Add to target column
      dailyPlans[targetColumn] = [...dailyPlans[targetColumn], { id: draggedItem.id, text: draggedItem.text }];
      
      updated["Today's Tasks"] = dailyPlans;
      return updated;
    });
    
    setDraggedItem(null);
  };

  const handleSend = () => {
    if (!chatInput.trim()) return;
    setChatHistory((prev) => [
      ...prev,
      { sender: 'user', text: chatInput }
    ]);
    // Simulate agent reply
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { sender: 'agent', text: "I'm here to help! (This is a mock reply.)" }
      ]);
    }, 800);
    setChatInput('');
  };

  const renderDailyPlans = () => {
    const columns = [
      { 
        name: 'To-Do', 
        color: '#6366F1', 
        bgColor: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0.03) 100%)',
        icon: <AssignmentIcon sx={{ fontSize: 24, color: '#6366F1' }} />
      },
      { 
        name: 'In-Process', 
        color: '#F59E0B', 
        bgColor: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(245, 158, 11, 0.03) 100%)',
        icon: <PlayArrowIcon sx={{ fontSize: 24, color: '#F59E0B' }} />
      },
      { 
        name: 'Done', 
        color: '#10B981', 
        bgColor: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.03) 100%)',
        icon: <CheckCircleIcon sx={{ fontSize: 24, color: '#10B981' }} />
      }
    ];
    
    return (
      <Box sx={{ 
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.02) 0%, rgba(16, 185, 129, 0.02) 100%)',
        borderRadius: 4,
        p: 3,
        mb: 4
      }}>
        <Grid container spacing={4}>
          {columns.map((column) => (
            <Grid item xs={12} md={4} key={column.name}>
              <Card 
                sx={{ 
                  height: 450, 
                  background: column.bgColor,
                  border: `2px solid ${column.color}30`,
                  borderRadius: 3,
                  boxShadow: `0 8px 32px ${column.color}15`,
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 12px 40px ${column.color}25`,
                    borderColor: `${column.color}50`,
                  }
                }}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.name)}
              >
                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    mb: 3,
                    p: 2,
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${column.color}15 0%, ${column.color}08 100%)`,
                    border: `1px solid ${column.color}25`,
                    gap: 1
                  }}>
                    {column.icon}
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        color: column.color, 
                        fontWeight: 700,
                        textAlign: 'center',
                        textShadow: `0 2px 4px ${column.color}20`,
                        letterSpacing: '0.5px'
                      }}
                    >
                      {column.name}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ 
                    flex: 1, 
                    maxHeight: 320, 
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                      width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '3px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: `${column.color}40`,
                      borderRadius: '3px',
                      '&:hover': {
                        background: `${column.color}60`,
                      },
                    },
                  }}>
                    {plans["Today's Tasks"][column.name].map((item, index) => (
                      <Paper
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item, column.name)}
                        sx={{
                          p: 2.5,
                          mb: 2,
                          background: `linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)`,
                          border: `1px solid ${column.color}25`,
                          borderRadius: 2,
                          cursor: 'grab',
                          backdropFilter: 'blur(10px)',
                          transition: 'all 0.2s ease',
                          position: 'relative',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            background: `linear-gradient(135deg, ${column.color}12 0%, ${column.color}05 100%)`,
                            borderColor: `${column.color}40`,
                            boxShadow: `0 4px 12px ${column.color}15`,
                          },
                          '&:active': {
                            cursor: 'grabbing',
                            transform: 'scale(0.98)',
                          },
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '3px',
                            background: `linear-gradient(90deg, ${column.color} 0%, ${column.color}70 100%)`,
                            borderRadius: '2px 2px 0 0',
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: column.color,
                            boxShadow: `0 0 8px ${column.color}50`,
                            flexShrink: 0
                          }} />
                          <Typography sx={{ 
                            color: 'rgba(255, 255, 255, 0.95)',
                            fontWeight: 500,
                            fontSize: '0.95rem',
                            lineHeight: 1.4
                          }}>
                            {item.text}
                          </Typography>
                        </Box>
                      </Paper>
                    ))}
                    
                    {plans["Today's Tasks"][column.name].length === 0 && (
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 100,
                        color: `${column.color}50`,
                        fontStyle: 'italic'
                      }}>
                        <Typography variant="body2">
                          No tasks yet
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  
                  <Box sx={{
                    mt: 2,
                    p: 1.5,
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${column.color}08 0%, ${column.color}03 100%)`,
                    border: `1px solid ${column.color}15`,
                    textAlign: 'center'
                  }}>
                    <Typography variant="caption" sx={{ color: `${column.color}70`, fontWeight: 600 }}>
                      {plans["Today's Tasks"][column.name].length} task{plans["Today's Tasks"][column.name].length !== 1 ? 's' : ''}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderRegularPlans = () => {
    return (
      <Paper elevation={3} sx={{ 
        p: 4, 
        mb: 4, 
        minHeight: 320,
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.03) 0%, rgba(16, 185, 129, 0.03) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.1)',
        borderRadius: 3
      }}>
        <Typography variant="h5" sx={{ 
          color: '#6366F1', 
          mb: 3, 
          fontWeight: 700,
          textAlign: 'center',
          textShadow: '0 2px 4px rgba(99, 102, 241, 0.2)'
        }}>
          {selectedType}
        </Typography>
        <List>
          {plans[selectedType].map((item) => (
            <Box key={item.id}>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={item.checked}
                    tabIndex={-1}
                    onChange={() => handleToggle(item.id)}
                    sx={{ 
                      color: '#6366F1', 
                      '&.Mui-checked': { color: '#10B981' },
                      '&:hover': {
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                      }
                    }}
                  />
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    textDecoration: item.checked ? 'line-through' : 'none',
                    color: 'rgba(255, 255, 255, 0.9)',
                    '& .MuiListItemText-primary': {
                      fontSize: '1rem',
                      fontWeight: 500
                    }
                  }} 
                />
                {item.hasSubPlans && (
                  <IconButton
                    onClick={() => handleExpandToggle(item.id)}
                    sx={{ 
                      color: '#6366F1',
                      '&:hover': {
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                      }
                    }}
                  >
                    {expandedItems.has(item.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                )}
              </ListItem>
              
              {item.hasSubPlans && (
                <Collapse in={expandedItems.has(item.id)} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subPlans.map((subPlan) => (
                      <ListItem key={subPlan.id} sx={{ pl: 6, mb: 0.5 }}>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={subPlan.checked}
                            tabIndex={-1}
                            onChange={() => handleSubPlanToggle(item.id, subPlan.id)}
                            sx={{ 
                              color: '#F59E0B', 
                              '&.Mui-checked': { color: '#10B981' },
                              '&:hover': {
                                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                              }
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText 
                          primary={subPlan.text} 
                          sx={{ 
                            textDecoration: subPlan.checked ? 'line-through' : 'none',
                            color: 'rgba(255, 255, 255, 0.8)',
                            '& .MuiListItemText-primary': {
                              fontSize: '0.9rem',
                              fontWeight: 400
                            }
                          }} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </List>
      </Paper>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      pb: isChatOpen ? 20 : 4,
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.01) 0%, rgba(16, 185, 129, 0.01) 100%)'
    }}>
      {/* Top Menu */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 2, 
        mt: 4, 
        mb: 4,
        p: 2,
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)',
        borderRadius: 3,
        border: '1px solid rgba(99, 102, 241, 0.1)'
      }}>
        {PLAN_TYPES.map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? 'contained' : 'outlined'}
            onClick={() => setSelectedType(type)}
            sx={{
              backgroundColor: selectedType === type ? '#6366F1' : undefined,
              color: selectedType === type ? '#fff' : '#6366F1',
              borderColor: '#6366F1',
              fontWeight: 600,
              minWidth: 140,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '0.95rem',
              boxShadow: selectedType === type ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
              '&:hover': {
                backgroundColor: selectedType === type ? '#5B5BD6' : 'rgba(99, 102, 241, 0.1)',
                transform: 'translateY(-1px)',
                boxShadow: selectedType === type ? '0 6px 16px rgba(99, 102, 241, 0.4)' : '0 2px 8px rgba(99, 102, 241, 0.2)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            {type}
          </Button>
        ))}
      </Box>

      {/* Central Frame: Plans Display */}
      {selectedType === "Today's Tasks" ? renderDailyPlans() : renderRegularPlans()}

      {/* Chat Toggle Button */}
      <Box sx={{ 
        position: 'fixed', 
        bottom: 20, 
        right: 20, 
        zIndex: 1300 
      }}>
        <IconButton
          onClick={() => setIsChatOpen(!isChatOpen)}
          sx={{
            bgcolor: '#6366F1',
            color: '#ffffff',
            width: 56,
            height: 56,
            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
            '&:hover': {
              bgcolor: '#5B5BD6',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          {isChatOpen ? '✕' : '💬'}
        </IconButton>
      </Box>

      {/* Compact Chatbox */}
      {isChatOpen && (
        <Paper elevation={6} sx={{ 
          position: 'fixed', 
          bottom: 20, 
          right: 20, 
          width: 350,
          maxHeight: 400,
          bgcolor: '#ffffff', 
          zIndex: 1200,
          border: '2px solid #6366F1',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <Box sx={{ 
            p: 2, 
            bgcolor: '#6366F1', 
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              💬 Career Agent
            </Typography>
            <IconButton
              size="small"
              onClick={() => setIsChatOpen(false)}
              sx={{ color: '#ffffff', p: 0.5 }}
            >
              ✕
            </IconButton>
          </Box>
          
          <Box sx={{ 
            flex: 1,
            maxHeight: 250, 
            overflowY: 'auto', 
            p: 2,
            bgcolor: '#f8fafc',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f5f9',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#6366F1',
              borderRadius: '3px',
            },
          }}>
            {chatHistory.map((msg, idx) => (
              <Box key={idx} sx={{ 
                textAlign: msg.sender === 'user' ? 'right' : 'left', 
                mb: 1
              }}>
                <Box sx={{
                  display: 'inline-block',
                  maxWidth: '85%',
                  p: 1,
                  borderRadius: 2,
                  background: msg.sender === 'user' 
                    ? '#6366F1' 
                    : '#e2e8f0',
                  color: msg.sender === 'user' ? '#ffffff' : '#374151',
                  fontSize: '0.85rem',
                  lineHeight: 1.3
                }}>
                  <strong>{msg.sender === 'user' ? 'You' : 'Agent'}:</strong> {msg.text}
                </Box>
              </Box>
            ))}
          </Box>
          
          <Box sx={{ 
            p: 2, 
            borderTop: '1px solid #e2e8f0',
            bgcolor: '#ffffff'
          }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Type message..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                autoFocus
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    fontSize: '0.85rem',
                    backgroundColor: '#ffffff',
                    '&:hover fieldset': {
                      borderColor: '#6366F1',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#6366F1',
                      borderWidth: '2px',
                    },
                    '& input': {
                      color: '#374151',
                      fontSize: '0.85rem',
                      '&::placeholder': {
                        color: '#9ca3af',
                        opacity: 1,
                      },
                    },
                  },
                  '& .MuiInputBase-root': {
                    backgroundColor: '#ffffff',
                  },
                }}
              />
              <IconButton 
                size="small"
                onClick={handleSend} 
                disabled={!chatInput.trim()}
                sx={{ 
                  bgcolor: chatInput.trim() ? '#6366F1' : '#d1d5db', 
                  color: '#ffffff', 
                  width: 36,
                  height: 36,
                  '&:hover': { 
                    bgcolor: chatInput.trim() ? '#5B5BD6' : '#d1d5db',
                  },
                  '&:disabled': {
                    bgcolor: '#d1d5db',
                    color: '#9ca3af',
                  },
                }}
              >
                <SendIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default ViewMyPlan; 