import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = ({translations, setIsAuthenticated}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSignIn = async () => {
    try {
      setError('');
      const response = await axios.post('https://www.auto-resume.site/login/', { email, password });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username); // ✅ 存储用户名
        setIsAuthenticated(true); // ✅ 更新 Navbar 状态
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || '登录失败');
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>{translations.signIn}</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Box mt={2}>
        <Button variant="contained" color="primary" fullWidth onClick={handleSignIn}>Sign In</Button>
      </Box>
    </Container>
  );
};

export default SignIn;
