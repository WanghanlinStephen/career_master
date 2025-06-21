import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const SignUp = ({ translations, setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      setError('');

      if (password !== confirmPassword) {
        setError('密码不匹配，请重新输入');
        return;
      }

      const response = await axios.post('/register/', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        const loginResponse = await axios.post('/login/', {
          email,
          password,
        });

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        
        setOpenSuccessModal(true);
        setIsAuthenticated(true);

        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (err) {
      setError(err.response?.data?.error || '注册失败');
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
          {translations.signUp}
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{error}</Alert>}
        
        <TextField 
          label="Username" 
          fullWidth 
          margin="normal" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
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
        
        <TextField 
          label="Confirm Password" 
          type="password" 
          fullWidth 
          margin="normal" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)}
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
            onClick={handleSignUp}
            sx={{
              backgroundColor: '#00fff2',
              color: '#020816',
              '&:hover': {
                backgroundColor: 'rgba(0, 255, 242, 0.8)',
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>

      <Modal
        open={openSuccessModal}
        onClose={() => setOpenSuccessModal(false)}
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'rgba(2, 8, 22, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          border: '1px solid rgba(0, 255, 242, 0.3)',
          boxShadow: 24,
          p: 4,
          textAlign: 'center'
        }}>
          <Typography 
            id="success-modal-title" 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold',
              color: '#00fff2',
              mb: 2
            }}
          >
            🎉 注册成功！
          </Typography>
          <Typography 
            id="success-modal-description" 
            sx={{ 
              mt: 2,
              color: 'rgba(255, 255, 255, 0.9)'
            }}
          >
            即将跳转到主页，请稍等...
          </Typography>
          <Box mt={3}>
            <Button 
              variant="contained" 
              onClick={() => navigate('/')}
              sx={{
                backgroundColor: '#00fff2',
                color: '#020816',
                '&:hover': {
                  backgroundColor: 'rgba(0, 255, 242, 0.8)',
                },
              }}
            >
              立即跳转
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default SignUp; 