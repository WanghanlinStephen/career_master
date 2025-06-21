import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const SignIn = ({translations, setIsAuthenticated}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      setError('');
      const response = await axios.post('/login/', { email, password });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        setIsAuthenticated(true);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || '登录失败');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ 
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
        background: 'rgba(2, 8, 22, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: 2,
        border: '1px solid rgba(0, 255, 242, 0.3)',
      }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            color: '#00fff2',
            textAlign: 'center',
            mb: 4,
            fontWeight: 700,
            textShadow: '0 0 10px rgba(0, 255, 242, 0.3)',
          }}
        >
          {translations.signIn}
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{error}</Alert>}
        
        <TextField 
          label="Email" 
          fullWidth 
          margin="normal" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'rgba(255, 255, 255, 0.9)',
              backgroundColor: 'rgba(0, 255, 242, 0.05)',
              '& fieldset': {
                borderColor: 'rgba(0, 255, 242, 0.3)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(0, 255, 242, 0.5)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00fff2',
              },
            },
          }}
        />
        
        <TextField 
          label="Password" 
          type="password" 
          fullWidth 
          margin="normal" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'rgba(255, 255, 255, 0.9)',
              backgroundColor: 'rgba(0, 255, 242, 0.05)',
              '& fieldset': {
                borderColor: 'rgba(0, 255, 242, 0.3)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(0, 255, 242, 0.5)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00fff2',
              },
            },
          }}
        />
        
        <Box mt={3} width="100%">
          <Button 
            variant="contained" 
            fullWidth 
            onClick={handleSignIn}
            sx={{
              backgroundColor: '#00fff2',
              color: '#020816',
              '&:hover': {
                backgroundColor: 'rgba(0, 255, 242, 0.8)',
              },
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn; 