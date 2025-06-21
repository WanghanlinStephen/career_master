import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';

const Profile = ({ translations }) => {
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  // 🔥 获取用户信息
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://www.auto-resume.site/profile/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData({ username: response.data.username, email: response.data.email });
    } catch (err) {
      setError('获取用户信息失败');
    }
  };

  // 🔥 提交修改
  const handleUpdate = async () => {
    try {
      setMessage('');
      setError('');

      const token = localStorage.getItem('token');
      const data = { username: userData.username, email: userData.email };

      // **🔹 只有当用户输入了新密码时，才要求提供旧密码**
      if (password) {
        if (!oldPassword) {
          setError('请输入旧密码以修改密码');
          return;
        }
        data.password = password;
        data.old_password = oldPassword; // 🔥 发送旧密码验证
      }

      const response = await axios.put('https://www.auto-resume.site/profile/', data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setMessage('用户信息更新成功');
        localStorage.setItem('username', userData.username); // ✅ 更新用户名缓存
      }
    } catch (err) {
      setError(err.response?.data?.error || '更新失败，请重试');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>{translations.profileTitle}</Typography>

      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="用户名"
        fullWidth
        margin="normal"
        value={userData.username}
        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
      />
      <TextField
        label="邮箱"
        fullWidth
        margin="normal"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />

      {/* 🔥 旧密码输入框（只有修改密码时需要填写） */}
      <TextField
        label="旧密码 (修改密码时必填)"
        type="password"
        fullWidth
        margin="normal"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />

      <TextField
        label="新密码 (可选)"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Box mt={2}>
        <Button variant="contained" color="primary" fullWidth onClick={handleUpdate}>
          更新信息
        </Button>
      </Box>
    </Container>
  );
};

export default Profile;
