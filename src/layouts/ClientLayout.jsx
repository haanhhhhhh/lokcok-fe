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
  Avatar,
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
  Favorite,
  Category,
  LocalOffer,
  Help,
  Person,
  Notifications,
  AccountCircle,
  Settings,
  ExitToApp,
  Close,
  Facebook,
  Instagram
} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ClientLayout = ({ children }) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryMenuAnchor, setCategoryMenuAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

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

  const handleUserMenuClick = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    // Xử lý đăng xuất ở đây
    router.push('/');
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
                <Box
                  sx={{ 
                    position: 'relative',
                    '&:hover': {
                      '& .NotificationMenu': {
                        display: 'block'
                      }
                    }
                  }}
                >
                  <Link href="/profile/notifications" style={{ 
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    fontSize: '0.875rem'
                  }}>
                    <Notifications fontSize="small" />
                    Thông báo
                    <Badge 
                      badgeContent={3} 
                      color="secondary"
                      sx={{ 
                        '& .MuiBadge-badge': {
                          right: -10,
                          top: -5
                        }
                      }}
                    />
                  </Link>
                  {/* Notifications Dropdown */}
                  <Box
                    className="NotificationMenu"
                    sx={{
                      display: 'none',
                      position: 'absolute',
                      top: '100%',
                      right: -50,
                      width: 400,
                      maxHeight: 500,
                      bgcolor: 'white',
                      borderRadius: 1,
                      boxShadow: '0 1px 3.125rem 0 rgba(0,0,0,.2)',
                      mt: 1,
                      zIndex: 1000,
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: -8,
                        right: 80,
                        width: 0,
                        height: 0,
                        borderLeft: '8px solid transparent',
                        borderRight: '8px solid transparent',
                        borderBottom: '8px solid white',
                      }
                    }}
                  >
                    <Box sx={{ 
                      p: 2, 
                      borderBottom: '1px solid',
                      borderColor: 'grey.200',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <Typography sx={{ fontWeight: 500, color: 'text.primary' }}>
                        Thông báo mới nhận
                      </Typography>
                      <Button 
                        sx={{ 
                          textTransform: 'none',
                          fontSize: '0.875rem',
                          minWidth: 'auto',
                          p: 0,
                          color: 'primary.main'
                        }}
                      >
                        Đánh dấu đã đọc tất cả
                      </Button>
                    </Box>
                    <Box sx={{ 
                      maxHeight: 400,
                      overflowY: 'auto',
                      '&::-webkit-scrollbar': {
                        width: '6px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(0,0,0,.2)',
                        borderRadius: '3px',
                      }
                    }}>
                      {/* Unread Notification */}
                      <Box sx={{ 
                        p: 2,
                        display: 'flex',
                        gap: 2,
                        bgcolor: 'action.hover',
                        borderBottom: '1px solid',
                        borderColor: 'grey.200',
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: 'action.selected'
                        }
                      }}>
                        <Avatar src="/kol1.jpg" sx={{ width: 48, height: 48 }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                            Thúy Kiều vừa đăng sản phẩm mới
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.813rem' }}>
                            Áo khoác denim mới nhất từ bộ sưu tập mùa đông
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                            1 giờ trước
                          </Typography>
                        </Box>
                      </Box>
                      {/* Read Notification */}
                      <Box sx={{ 
                        p: 2,
                        display: 'flex',
                        gap: 2,
                        borderBottom: '1px solid',
                        borderColor: 'grey.200',
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: 'action.hover'
                        }
                      }}>
                        <Avatar src="/kol2.jpg" sx={{ width: 48, height: 48 }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            Thúy Vân đang phát trực tiếp
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.813rem' }}>
                            Review các sản phẩm skincare mới nhất
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                            2 giờ trước
                          </Typography>
                        </Box>
                      </Box>
                      {/* More Notifications */}
                      <Box sx={{ 
                        p: 2,
                        display: 'flex',
                        gap: 2,
                        borderBottom: '1px solid',
                        borderColor: 'grey.200',
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: 'action.hover'
                        }
                      }}>
                        <Avatar sx={{ width: 48, height: 48, bgcolor: 'secondary.main' }}>
                          <LocalOffer />
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            Khuyến mãi đặc biệt
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.813rem' }}>
                            Giảm 50% cho đơn hàng đầu tiên
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                            1 ngày trước
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ 
                      p: 2,
                      borderTop: '1px solid',
                      borderColor: 'grey.200',
                      textAlign: 'center'
                    }}>
                      <Button 
                        fullWidth
                        sx={{ 
                          textTransform: 'none',
                          color: 'primary.main'
                        }}
                      >
                        Xem tất cả
                      </Button>
                    </Box>
                  </Box>
                </Box>
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
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                    position: 'relative',
                    '&:hover': {
                      '& .MuiBox-root': {
                        display: 'block'
                      }
                    }
                  }}
                >
                  <Avatar
                    src="/avatar-placeholder.jpg"
                    sx={{ width: 24, height: 24 }}
                  />
                  <Typography sx={{ fontSize: '0.875rem' }}>
                    Nguyễn Văn A
                  </Typography>
                  {/* Dropdown Menu */}
                  <Box
                    className="MuiBox-root"
                    sx={{
                      display: 'none',
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      width: 200,
                      bgcolor: 'white',
                      borderRadius: 1,
                      boxShadow: '0 1px 3.125rem 0 rgba(0,0,0,.2)',
                      mt: 1,
                      zIndex: 1000,
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: -8,
                        right: 24,
                        width: 0,
                        height: 0,
                        borderLeft: '8px solid transparent',
                        borderRight: '8px solid transparent',
                        borderBottom: '8px solid white',
                      }
                    }}
                  >
                    <List sx={{ py: 0 }}>
                      <ListItem 
                        button 
                        onClick={() => router.push('/profile')}
                        sx={{ 
                          py: 1.5,
                          '&:hover': { bgcolor: 'grey.100' }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Person fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Tài khoản của tôi" 
                          primaryTypographyProps={{ 
                            fontSize: '0.875rem',
                            color: 'text.primary'
                          }}
                        />
                      </ListItem>
                      <ListItem 
                        button 
                        onClick={() => router.push('/profile/edit')}
                        sx={{ 
                          py: 1.5,
                          '&:hover': { bgcolor: 'grey.100' }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Settings fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Sửa hồ sơ" 
                          primaryTypographyProps={{ 
                            fontSize: '0.875rem',
                            color: 'text.primary'
                          }}
                        />
                      </ListItem>
                      <ListItem 
                        button 
                        onClick={() => router.push('/profile/orders')}
                        sx={{ 
                          py: 1.5,
                          '&:hover': { bgcolor: 'grey.100' }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <ShoppingCart fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Đơn mua" 
                          primaryTypographyProps={{ 
                            fontSize: '0.875rem',
                            color: 'text.primary'
                          }}
                        />
                      </ListItem>
                      <ListItem 
                        button 
                        onClick={() => router.push('/profile/notifications')}
                        sx={{ 
                          py: 1.5,
                          '&:hover': { bgcolor: 'grey.100' }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Notifications fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Thông báo" 
                          primaryTypographyProps={{ 
                            fontSize: '0.875rem',
                            color: 'text.primary'
                          }}
                        />
                      </ListItem>
                      <ListItem 
                        button 
                        onClick={() => router.push('/profile/favorites')}
                        sx={{ 
                          py: 1.5,
                          '&:hover': { bgcolor: 'grey.100' }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Favorite fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Yêu thích" 
                          primaryTypographyProps={{ 
                            fontSize: '0.875rem',
                            color: 'text.primary'
                          }}
                        />
                      </ListItem>
                      <ListItem 
                        button 
                        onClick={() => router.push('/profile/vouchers')}
                        sx={{ 
                          py: 1.5,
                          '&:hover': { bgcolor: 'grey.100' }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <LocalOffer fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Kho voucher" 
                          primaryTypographyProps={{ 
                            fontSize: '0.875rem',
                            color: 'text.primary'
                          }}
                        />
                      </ListItem>
                      <Divider />
                      <ListItem 
                        button 
                        onClick={handleLogout}
                        sx={{ 
                          py: 1.5,
                          '&:hover': { bgcolor: 'grey.100' }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <ExitToApp fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Đăng xuất" 
                          primaryTypographyProps={{ 
                            fontSize: '0.875rem',
                            color: 'text.primary'
                          }}
                        />
                      </ListItem>
                    </List>
                  </Box>
                </Box>
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
            <Link href="/home" passHref style={{ 
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
              <Badge badgeContent={2} color="secondary">
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
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Avatar
            alt="User Avatar"
            src="/avatar-placeholder.jpg"
            sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
          />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Tèo Phạm
          </Typography>
          <Typography variant="body2" color="text.secondary">
            teodangiu@email.com
          </Typography>
        </Box>
        <Divider />
        <List>
          <ListItem button onClick={() => router.push('/profile')}>
            <ListItemIcon><Person /></ListItemIcon>
            <ListItemText primary="Trang cá nhân" />
          </ListItem>
          <ListItem button onClick={() => router.push('/profile/edit')}>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText primary="Sửa hồ sơ" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><Category /></ListItemIcon>
            <ListItemText primary="Danh mục" />
          </ListItem>
          <ListItem button onClick={() => router.push('/cart')}>
            <ListItemIcon><ShoppingCart /></ListItemIcon>
            <ListItemText primary="Giỏ hàng" />
            <Badge badgeContent={2} color="secondary" />
          </ListItem>
          <ListItem button onClick={() => router.push('/profile/favorites')}>
            <ListItemIcon><Favorite /></ListItemIcon>
            <ListItemText primary="Yêu thích" />
            <Badge badgeContent={5} color="secondary" />
          </ListItem>
          <ListItem button onClick={() => router.push('/profile/notifications')}>
            <ListItemIcon><Notifications /></ListItemIcon>
            <ListItemText primary="Thông báo" />
            <Badge badgeContent={3} color="secondary" />
          </ListItem>
          <ListItem button onClick={() => router.push('/profile/vouchers')}>
            <ListItemIcon><LocalOffer /></ListItemIcon>
            <ListItemText primary="Khuyến mãi" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><Help /></ListItemIcon>
            <ListItemText primary="Trợ giúp" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary="Đăng xuất" />
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
    </Box>
  );
};

export default ClientLayout; 