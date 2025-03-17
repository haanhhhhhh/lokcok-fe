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
  Favorite,
  Category,
  LocalOffer,
  Help,
  Close
} from '@mui/icons-material';
import Link from 'next/link';
import LoginModal from '../components/auth/LoginModal';
import RegisterModal from '../components/auth/RegisterModal';

const MainLayout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryMenuAnchor, setCategoryMenuAnchor] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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
      <AppBar position="sticky">
        <Toolbar sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleMobileMenu}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Link href="/" passHref style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="h6" sx={{ flexShrink: 0 }}>
              KOL Market
            </Typography>
          </Link>

          {/* Categories Button */}
          <Button
            color="inherit"
            onClick={handleCategoryClick}
            sx={{ 
              display: { xs: 'none', sm: 'flex' },
              textTransform: 'none'
            }}
          >
            <Category sx={{ mr: 1 }} />
            Danh mục
          </Button>
          <Menu
            anchorEl={categoryMenuAnchor}
            open={Boolean(categoryMenuAnchor)}
            onClose={handleCategoryClose}
            PaperProps={{
              sx: { width: 200 }
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category} onClick={handleCategoryClose}>
                {category}
              </MenuItem>
            ))}
          </Menu>

          {/* Search Bar */}
          <Paper
            component="form"
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: 1,
              px: 2,
              py: 0.5,
              mx: 2,
              borderRadius: 2,
              bgcolor: alpha('#FDF5E6', 0.15),
              '&:hover': {
                bgcolor: alpha('#FDF5E6', 0.25),
              },
              display: { xs: 'none', sm: 'flex' }
            }}
          >
            <InputBase
              placeholder="Tìm kiếm sản phẩm, KOL..."
              sx={{ 
                flex: 1,
                color: 'inherit',
                '& input': {
                  color: '#FDF5E6',
                  '&::placeholder': {
                    color: 'rgba(253, 245, 230, 0.7)',
                    opacity: 1
                  }
                }
              }}
            />
            <IconButton type="submit" sx={{ color: '#FDF5E6', p: '10px' }}>
              <SearchIcon />
            </IconButton>
          </Paper>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1, alignItems: 'center' }}>
            <Link href="/cart" passHref style={{ textDecoration: 'none', color: '#FDF5E6' }}>
              <IconButton sx={{ color: '#FDF5E6' }}>
                <Badge badgeContent={3} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Link>
            <Link href="/wishlist" passHref style={{ textDecoration: 'none', color: '#FDF5E6' }}>
              <IconButton sx={{ color: '#FDF5E6' }}>
                <Badge badgeContent={5} color="secondary">
                  <Favorite />
                </Badge>
              </IconButton>
            </Link>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleLoginClick}
                sx={{ 
                  textTransform: 'none',
                  borderColor: 'rgba(253, 245, 230, 0.5)',
                  color: '#FDF5E6',
                  '&:hover': {
                    borderColor: '#FDF5E6',
                    backgroundColor: 'rgba(253, 245, 230, 0.1)'
                  }
                }}
              >
                Đăng nhập
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleRegisterClick}
                sx={{ 
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#E3CAA5'
                  }
                }}
              >
                Đăng ký
              </Button>
            </Box>
          </Box>
        </Toolbar>

        {/* Mobile Search Bar */}
        <Box sx={{ display: { xs: 'block', sm: 'none' }, p: 2, bgcolor: 'primary.dark' }}>
          <Paper
            component="form"
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 0.5,
              borderRadius: 2,
              backgroundColor: '#FDF5E6'
            }}
          >
            <InputBase
              placeholder="Tìm kiếm sản phẩm, KOL..."
              sx={{ 
                flex: 1,
                '& input': {
                  color: 'text.primary'
                }
              }}
            />
            <IconButton type="submit">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        PaperProps={{
          sx: { width: '80%', maxWidth: 300 }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Menu</Typography>
          <IconButton onClick={toggleMobileMenu}>
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
            <ListItemIcon><ShoppingCart /></ListItemIcon>
            <ListItemText primary="Giỏ hàng" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><Favorite /></ListItemIcon>
            <ListItemText primary="Yêu thích" />
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
            © 2024 KOL Market. All rights reserved.
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

export default MainLayout; 