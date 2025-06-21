import React, { useState, useRef } from 'react';
import { Container, Typography, Button, Box, CircularProgress, Paper, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const ResumeResult = ({ translations }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const previewUrl = queryParams.get('preview_html_url'); // 现在这是图片 URL
  const htmlUrl = queryParams.get('html_url'); // 🔥 真实 HTML 文件 URL
  const jsonResume = queryParams.get('json_resume');
  const theme = queryParams.get('theme');
  const qrCodeRef = useRef(null);
  
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [loadingWord, setLoadingWord] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  // **🔥 处理 PDF 下载**
  const handleDownloadPDF = async () => {
    try {
      setLoadingPDF(true);
      // 模拟下载延迟
      setTimeout(() => {
        setLoadingPDF(false);
        alert('PDF has been generated, but this is a front-end simulation mode');
      }, 2000);
      /*
      const formData = new FormData();
      formData.append('json_resume', JSON.stringify(jsonResume));
      formData.append('theme', theme);
      // const token = localStorage.getItem('token');
      // if (!token) {
      //   alert('请先登录再下载简历');
      //   setLoadingPDF(false);
      //   return;
      // }
      const response = await axios.post('https://www.auto-resume.site/download_pdf/', formData, {
        headers: {
          // 'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setLoadingPDF(false);

      if (response.data.pdf_url) {
        window.open(response.data.pdf_url, '_blank'); // 🔥 在新标签页打开 PDF 下载链接
      } else {
        alert('Download failed, please try again later');
      }
      */
    } catch (err) {
      console.error('PDF 下载失败:', err);
      alert('PDF 生成失败，请检查网络');
      setLoadingPDF(false);
    }
  };

  // 处理 Word 下载
  const handleDownloadWord = async () => {
    try {
      setLoadingWord(true);
      // 模拟下载延迟
      setTimeout(() => {
        setLoadingWord(false);
        alert('Word 文档已生成，但当前为前端模拟模式');
      }, 2000);
      /*
      const formData = new FormData();
      formData.append('json_resume', JSON.stringify(jsonResume));
      formData.append('theme', theme);
      // const token = localStorage.getItem('token');
      // if (!token) {
      //   alert('请先登录再下载简历');
      //   setLoadingWord(false);
      //   return;
      // }
      console.log('开始下载 Word，发送数据:', {
        json_resume: jsonResume,
        theme: theme
      });
      
      const response = await axios.post('https://www.auto-resume.site/download_word/', formData, {
        headers: {
          // 'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setLoadingWord(false);

      console.log('Word 下载响应:', response.data);

      if (response.data.word_url) {
        console.log('准备打开 Word 下载链接:', response.data.word_url);
        // 尝试使用 window.location.href 直接跳转
        window.location.href = response.data.word_url;
        // 如果上面的方法不行，尝试使用 window.open
        // window.open(response.data.word_url, '_blank');
        console.log("下载 Word 成功");
      } else {
        console.error('Word URL 不存在:', response.data);
        alert('下载失败，请稍后重试');
      }
      */
    } catch (err) {
      console.error('Word 下载失败:', err);
      console.error('错误详情:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      alert('Word 生成失败，请检查网络');
      setLoadingWord(false);
    }
  };

  // 处理下载按钮点击，显示二维码区域
  const handleDownloadClick = (type) => {
    if (type === 'pdf') {
      setLoadingPDF(true);
    } else {
      setLoadingWord(true);
    }
    
    // 短暂延迟后显示二维码并滚动到二维码区域
    setTimeout(() => {
      setShowQRCode(true);
      setLoadingPDF(false);
      setLoadingWord(false);
      
      // 滚动到二维码区域
      if (qrCodeRef.current) {
        qrCodeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 1000);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#FF6B35', textAlign: 'center', mb: 4 }}>
          {translations?.resultTitle || 'Your Career Transition Plan Has Been Generated'}
        </Typography>
      </Box>

      {/* 职业转型计划预览图片 */}
      <Box sx={{ 
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        mb: 4
      }}>
        <Box 
          component="img" 
          src={previewUrl} 
          alt="Generated Career Transition Plan" 
          sx={{ 
            maxWidth: '100%',
            height: 'auto',
            maxHeight: '800px'
          }} 
        />
        
        {/* 中间的二维码模块，无论是否显示，都将其放在DOM中以便定位 */}
        <Box 
          ref={qrCodeRef}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: showQRCode ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(2, 8, 22, 0.95)',
            padding: '30px',
            borderRadius: '12px',
            border: '2px solid #FF6B35',
            boxShadow: '0 0 30px rgba(255, 107, 53, 0.3)',
            width: '80%',
            maxWidth: '400px',
            zIndex: 10,
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#FF6B35', 
              mb: 2, 
              textAlign: 'center',
              fontWeight: 600
            }}
          >
            Career Transition King
          </Typography>
          
          <Divider sx={{ width: '100%', borderColor: 'rgba(255, 107, 53, 0.3)', my: 2 }} />
          
          <Box 
            component="img" 
            src="https://auto-resume-storage.s3.us-east-2.amazonaws.com/test.jpg" 
            alt="Customer Service QR Code" 
            sx={{ 
              width: '200px',
              height: '200px',
              mb: 2,
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }} 
          />
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'white', 
              textAlign: 'center',
              mb: 2
            }}
          >
            +WeChat Customer Service for Career Transition Guidance
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              textAlign: 'center',
              fontSize: '0.9rem'
            }}
          >
            Add customer service to receive industry internal materials, help you quickly achieve career transition
          </Typography>
          
          <Button
            variant="outlined"
            onClick={() => setShowQRCode(false)}
            sx={{
              mt: 3,
              borderColor: 'rgba(255, 107, 53, 0.5)',
              color: '#FF6B35',
              '&:hover': {
                borderColor: '#FF6B35',
                backgroundColor: 'rgba(255, 107, 53, 0.1)',
              }
            }}
          >
            Back to View Plan
          </Button>
        </Box>
      </Box>

      <Box mt={4} display="flex" justifyContent="center" gap={2}>
        <Button component={Link} to="/editor" variant="contained" color="primary">
          {translations?.returnToEdit || 'Continue Editing'}
        </Button>

        {/* PDF Download Button */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDownloadClick('pdf')}
          disabled={loadingPDF}
          sx={{
            backgroundColor: '#FF6B35',
            color: '#020816',
            '&:hover': {
              backgroundColor: 'rgba(255, 107, 53, 0.8)',
            },
          }}
        >
          {loadingPDF ? <CircularProgress size={24} /> : 'Download PDF'}
        </Button>

        {/* Word Download Button */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDownloadClick('word')}
          disabled={loadingWord}
          sx={{
            backgroundColor: '#FF6B35',
            color: '#020816',
            '&:hover': {
              backgroundColor: 'rgba(255, 107, 53, 0.8)',
            },
          }}
        >
          {loadingWord ? <CircularProgress size={24} /> : 'Download Word'}
        </Button>
      </Box>
    </Container>
  );
};

export default ResumeResult;
