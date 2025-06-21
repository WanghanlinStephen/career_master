import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = ({ translations,setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [openSuccessModal, setOpenSuccessModal] = useState(false); // 🔥 控制成功弹窗
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      setError('');

      // **🔥 检查密码匹配**
      if (password !== confirmPassword) {
        setError('密码不匹配，请重新输入');
        return;
      }

      // **🔥 发送注册请求**
      const response = await axios.post(`https://www.auto-resume.site/register/`, {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        // **✅ 注册成功，自动登录**
        const loginResponse = await axios.post(`https://www.auto-resume.site/login/`, {
          email,
          password,
        });

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username); // ✅ 存储用户名
        
        // **🔥 显示注册成功弹窗**
        setOpenSuccessModal(true);
        setIsAuthenticated(true);

        // **🔥 3 秒后跳转**
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
      <Typography variant="h4" gutterBottom>{translations.signUp}</Typography>
      
      {error && <Alert severity="error">{error}</Alert>}
      
      <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
      <TextField label="Confirm Password" type="password" fullWidth margin="normal" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

      <Box mt={2}>
        <Button variant="contained" color="primary" fullWidth onClick={handleSignUp}>Sign Up</Button>
      </Box>

      {/* ✅ 注册成功的弹窗 */}
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
          bgcolor: 'background.paper',
          borderRadius: '10px',
          boxShadow: 24,
          p: 4,
          textAlign: 'center'
        }}>
          <Typography id="success-modal-title" variant="h5" sx={{ fontWeight: 'bold' }}>
            🎉 注册成功！
          </Typography>
          <Typography id="success-modal-description" sx={{ mt: 2 }}>
            即将跳转到主页，请稍等...
          </Typography>
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
              立即跳转
            </Button>
          </Box>
        </Box>
      </Modal>

    </Container>
  );
};

export default SignUp;
