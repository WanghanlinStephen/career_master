import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, Link, Avatar, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const CustomNavbar = ({ language, toggleLanguage, translations, isAuthenticated, setIsAuthenticated }) => {
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // ✅ 头像菜单
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ✅ **头像菜单控制**
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate('/profile'); // ✅ 跳转到个人信息修改页面
    handleMenuClose();
  };

  const handleVIP = () => {
    navigate('/vip'); // ✅ 跳转到VIP充值页面
    handleMenuClose();
  }

  const handleLogout = () => {
    localStorage.removeItem('token'); // ✅ 清除 Token
    localStorage.removeItem('username'); // ✅ 清除用户名
    setIsAuthenticated(false); // ✅ 直接更新状态
    navigate('/'); // ✅ 返回首页
    handleMenuClose();
  };

  return (
    <NavBarWrapper>
      <StyledAppBar scrolled={scrolled}>
        <Toolbar sx={{ justifyContent: 'space-between', width: '100%' }}>
          {/* 左侧 语言切换按钮 */}
          <Box>
            <StyledButton variant="text" onClick={toggleLanguage}>
              {language === 'zh' ? 'Switch to English' : '切换到 中文'}
            </StyledButton>
          </Box>

          {/* 中央导航链接 */}
          <NavLinksContainer>
            <StyledLink href="#proof">{translations.barProof}</StyledLink>
            <StyledLink href="#help-center">{translations.barHelp}</StyledLink>
          </NavLinksContainer>

          {/* ✅ 用户已登录 -> 显示头像 */}
          {isAuthenticated ? (
            <Box>
              <AvatarButton onClick={handleMenuOpen}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                  U {/* 这里可以改成真实用户的首字母 */}
                </Avatar>
              </AvatarButton>

              {/* ✅ 头像下拉菜单 */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{ mt: 1 }}
              >
                <MenuItem onClick={handleProfileClick}>修改个人信息</MenuItem>
                <MenuItem onClick={handleVIP}>充值VIP</MenuItem>
                <MenuItem onClick={handleLogout}>退出登录</MenuItem>
              </Menu>
            </Box>
          ) : (
            // ✅ 用户未登录 -> 显示 Sign In / Sign Up 按钮
            <AuthButtonsContainer>
              <StyledButton variant="text" onClick={() => navigate('/signin')}>
                {translations.barSignin}
              </StyledButton>
              <StyledButton variant="contained" color="primary" onClick={() => navigate('/signup')}>
                {translations.barSignup}
              </StyledButton>
            </AuthButtonsContainer>
          )}
        </Toolbar>
      </StyledAppBar>
    </NavBarWrapper>
  );
};

const NavBarWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  top: '20px',
  left: '40%',
  transform: 'translateX(-50%)',
  width: '100%',
  zIndex: 1100,
});

const StyledAppBar = styled(AppBar)(({ scrolled }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // 半透明背景
  borderRadius: '20px', // 圆角边框
  width: scrolled ? '75%' : '90%', // 滚动时缩小宽度
  maxWidth: '1200px',
  boxShadow: 'none',
  transition: 'width 0.3s ease',
  margin: 'auto', // 确保它居中
}));

const NavLinksContainer = styled(Box)({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
  gap: '40px',
});

const AuthButtonsContainer = styled(Box)({
  display: 'flex',
  gap: '10px',
});

const StyledLink = styled(Link)({
  color: 'rgba(255, 255, 255, 0.5)', // 默认暗色
  textDecoration: 'none',
  fontSize: '18px',
  fontWeight: 'bold',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#FFFFFF',
  },
});

const StyledButton = styled(Button)({
  borderRadius: '20px',
  padding: '5px 20px',
  fontSize: '16px',
  textTransform: 'none',
});

const AvatarButton = styled(Box)({
  cursor: 'pointer',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.1)', // ✅ 悬停时放大
  },
});

export default CustomNavbar;
