import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from '@mui/material';
import {
  Store as StoreIcon,
  ShoppingCart as OrderIcon,
  LocalShipping as ShippingIcon,
  LocalOffer as VoucherIcon,
  Article as PostIcon,
  Chat as ChatIcon,
  Add as AddIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';

const menuItems = [
  {
    title: 'Đăng bán sản phẩm',
    description: 'Thêm sản phẩm mới để thanh lý',
    icon: <AddIcon sx={{ fontSize: 40 }} />,
    path: '/seller/products/new',
    color: 'primary.main',
  },
  {
    title: 'Quản lý sản phẩm',
    description: 'Xem và cập nhật sản phẩm đang bán',
    icon: <StoreIcon sx={{ fontSize: 40 }} />,
    path: '/seller/products',
    color: '#1e88e5',
  },
  {
    title: 'Quản lý đơn hàng',
    description: 'Xử lý đơn hàng và theo dõi giao dịch',
    icon: <OrderIcon sx={{ fontSize: 40 }} />,
    path: '/seller/orders',
    color: '#43a047',
  },
  {
    title: 'Quản lý giao hàng',
    description: 'Cài đặt vận chuyển và theo dõi đơn',
    icon: <ShippingIcon sx={{ fontSize: 40 }} />,
    path: '/seller/shipping',
    color: '#fb8c00',
  },
  {
    title: 'Quản lý voucher',
    description: 'Tạo và quản lý mã giảm giá',
    icon: <VoucherIcon sx={{ fontSize: 40 }} />,
    path: '/seller/vouchers',
    color: '#e53935',
  },
  {
    title: 'Đăng bài & Fan',
    description: 'Đăng bài và tương tác với người theo dõi',
    icon: <PostIcon sx={{ fontSize: 40 }} />,
    path: '/seller/posts',
    color: '#8e24aa',
  },
  {
    title: 'Chat với người mua',
    description: 'Trò chuyện và hỗ trợ khách hàng',
    icon: <ChatIcon sx={{ fontSize: 40 }} />,
    path: '/seller/chat',
    color: '#00acc1',
  },
];

const SellerHome = () => {
  const router = useRouter();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 4 }}>
      <Container maxWidth="lg">
        {/* Welcome Section */}
        <Paper 
          sx={{ 
            p: 4, 
            mb: 4, 
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            color: 'white'
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                Chào mừng đến với Kênh Người Bán
              </Typography>
              <Typography variant="subtitle1">
                Bắt đầu thanh lý những món đồ của bạn và kết nối với người mua ngay hôm nay
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
              <Button 
                variant="contained" 
                size="large"
                sx={{ 
                  bgcolor: 'white', 
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)',
                  }
                }}
                onClick={() => router.push('/seller/products/new')}
              >
                Đăng bán ngay
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Menu Grid */}
        <Grid container spacing={3}>
          {menuItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  }
                }}
                onClick={() => router.push(item.path)}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      color: item.color
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <IconButton size="small" sx={{ color: item.color }}>
                    <ArrowForwardIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SellerHome; 