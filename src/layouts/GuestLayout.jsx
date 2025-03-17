import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  alpha
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart,
  Person,
  Category,
  LocalOffer,
  Help,
  Close,
  Facebook,
  Instagram,
  Notifications
} from '@mui/icons-material';
import Link from 'next/link';
import LoginModal from '../components/auth/LoginModal';
import RegisterModal from '../components/auth/RegisterModal';
import { useRouter } from 'next/router';

const GuestLayout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryMenuAnchor, setCategoryMenuAnchor] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const router = useRouter();

  const categories = [
    'Thời trang',
    'Mỹ phẩm',
    'Đồ điện tử',
    'Phụ kiện',
    'Đồ gia dụng',
    'Sách',
    'Thể thao',
    'Khác'
  ];

  const handleCategoryClick = (event) => {
    setCategoryMenuAnchor(event.currentTarget);
  };

  const handleCategoryClose = () => {
    setCategoryMenuAnchor(null);
  };

  const handleLoginClick = () => {
    setLoginModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleRegisterClick = () => {
    setRegisterModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleLoginClose = () => {
    setLoginModalOpen(false);
  };

  const handleRegisterClose = () => {
    setRegisterModalOpen(false);
  };

  const switchToRegister = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };

  const switchToLogin = () => {
    setRegisterModalOpen(false);
    setLoginModalOpen(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky" sx={{ bgcolor: 'primary.main', boxShadow: 'none' }}>
        {/* Top Bar */}
        <Box sx={{ 
          bgcolor: 'primary.dark',
          py: 1,
          px: 2,
          display: { xs: 'none', sm: 'block' }
        }}>
          <Container maxWidth="lg">
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: 'white'
            }}>
              {/* Left Links */}
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Link href="#" style={{ 
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.875rem'
                }}>
                  Kênh người bán
                </Link>
                <Link href="#" style={{ 
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.875rem'
                }}>
                  Tải ứng dụng
                </Link>
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '0.875rem'
                }}>
                  Kết nối
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" sx={{ color: 'white' }}>
                      <Facebook fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: 'white' }}>
                      <Instagram fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>

              {/* Right Links */}
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <Link href="#" style={{ 
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  fontSize: '0.875rem'
                }}>
                  <Notifications fontSize="small" />
                  Thông báo
                </Link>
                <Link href="#" style={{ 
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  fontSize: '0.875rem'
                }}>
                  <Help fontSize="small" />
                  Hỗ trợ
                </Link>
                <Button
                  color="inherit"
                  onClick={handleLoginClick}
                  sx={{ 
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    minWidth: 'auto',
                    padding: 0
                  }}
                >
                  Đăng nhập
                </Button>
                <Box sx={{ color: 'rgba(255,255,255,0.5)' }}>/</Box>
                <Button
                  color="inherit"
                  onClick={handleRegisterClick}
                  sx={{ 
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    minWidth: 'auto',
                    padding: 0
                  }}
                >
                  Đăng ký
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Main Bar */}
        <Container maxWidth="lg">
          <Toolbar sx={{ py: 2, px: { xs: 0, sm: 2 } }}>
            {/* Mobile Menu Icon */}
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileMenuOpen(true)}
              sx={{ display: { sm: 'none' }, mr: 1 }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <Link href="/" passHref style={{ 
              textDecoration: 'none',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              mr: 3
            }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '1.2rem', sm: '1.8rem' }
              }}>
                LokCok
              </Typography>
            </Link>

            {/* Search Bar */}
            <Paper
              component="form"
              sx={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                maxWidth: 840,
                borderRadius: 1,
                bgcolor: 'white',
                boxShadow: 'none',
                border: '2px solid',
                borderColor: 'secondary.main',
                '&:hover': {
                  borderColor: 'secondary.dark'
                }
              }}
            >
              <InputBase
                placeholder="Tìm sản phẩm, thương hiệu, KOL..."
                sx={{ 
                  flex: 1,
                  px: 2,
                  py: 1,
                  fontSize: '0.875rem'
                }}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton 
                type="submit"
                sx={{ 
                  p: 1,
                  mr: 0.5,
                  color: 'white',
                  bgcolor: 'secondary.main',
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'secondary.dark'
                  }
                }}
              >
                <SearchIcon />
              </IconButton>
            </Paper>

            {/* Cart Icon - Desktop */}
            <IconButton 
              color="inherit"
              onClick={() => router.push('/cart')}
              sx={{ 
                ml: 2,
                display: { xs: 'none', sm: 'flex' }
              }}
            >
              <Badge badgeContent={0} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Toolbar>

          {/* Popular Keywords */}
          <Box sx={{ 
            pb: 1.5,
            display: { xs: 'none', sm: 'flex' },
            gap: 2,
            color: 'rgba(255,255,255,0.8)',
            fontSize: '0.75rem'
          }}>
            <Link href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
              Áo Thun
            </Link>
            <Link href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
              Váy Đầm
            </Link>
            <Link href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
              Quần Jean
            </Link>
            <Link href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
              Áo Khoác
            </Link>
            <Link href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
              Túi Xách
            </Link>
          </Box>
        </Container>

        {/* Mobile Search Bar */}
        <Box sx={{ display: { xs: 'block', sm: 'none' }, p: 2, bgcolor: 'primary.dark' }}>
          <Paper
            component="form"
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 0.5,
              borderRadius: 1,
              border: '2px solid',
              borderColor: 'secondary.main'
            }}
          >
            <InputBase
              placeholder="Tìm sản phẩm, thương hiệu, KOL..."
              sx={{ flex: 1 }}
            />
            <IconButton type="submit" sx={{ color: 'secondary.main' }}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: { width: '80%', maxWidth: 300 }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Menu</Typography>
          <IconButton onClick={() => setMobileMenuOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <List>
          <ListItem button onClick={handleLoginClick}>
            <ListItemIcon><Person /></ListItemIcon>
            <ListItemText primary="Đăng nhập" />
          </ListItem>
          <ListItem button onClick={handleRegisterClick}>
            <ListItemIcon><Person /></ListItemIcon>
            <ListItemText primary="Đăng ký" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><Category /></ListItemIcon>
            <ListItemText primary="Danh mục" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><LocalOffer /></ListItemIcon>
            <ListItemText primary="Khuyến mãi" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><Help /></ListItemIcon>
            <ListItemText primary="Trợ giúp" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ py: 3, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 LokCok. All rights reserved.
          </Typography>
        </Container>
      </Box>

      {/* Login Modal */}
      <LoginModal
        open={loginModalOpen}
        onClose={handleLoginClose}
        onRegisterClick={switchToRegister}
      />

      {/* Register Modal */}
      <RegisterModal
        open={registerModalOpen}
        onClose={handleRegisterClose}
        onLoginClick={switchToLogin}
      />
    </Box>
  );
};

export default GuestLayout; 