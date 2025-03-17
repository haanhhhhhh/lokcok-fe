import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Chip,
  Divider,
  Stack,
  Avatar,
} from '@mui/material';
import {
  Person,
  ShoppingBag,
  Notifications,
  Favorite,
  LocalOffer,
  LocalShipping,
  Payment,
  Star,
} from '@mui/icons-material';
import ClientLayout from '../../layouts/ClientLayout';

const menuItems = [
  { icon: <Person />, text: 'Hồ sơ', path: '/profile' },
  { icon: <ShoppingBag />, text: 'Đơn mua', path: '/profile/orders' },
  { icon: <Notifications />, text: 'Thông báo', path: '/profile/notifications' },
  { icon: <Favorite />, text: 'Yêu thích', path: '/profile/favorites' },
  { icon: <LocalOffer />, text: 'Kho voucher', path: '/profile/vouchers' },
];

const orderTabs = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Chờ thanh toán', value: 'pending' },
  { label: 'Vận chuyển', value: 'shipping' },
  { label: 'Đang giao', value: 'delivering' },
  { label: 'Hoàn thành', value: 'completed' },
  { label: 'Đã hủy', value: 'cancelled' },
];

const orders = [
  {
    id: '123456',
    date: '15/03/2024',
    status: 'completed',
    items: [
      {
        id: 1,
        name: 'Áo thun basic',
        image: '/product1.jpg',
        price: '199.000đ',
        quantity: 2,
        variation: 'Trắng, L',
      }
    ],
    total: '398.000đ',
    seller: 'Shop ABC',
  },
  {
    id: '123457',
    date: '14/03/2024',
    status: 'shipping',
    items: [
      {
        id: 2,
        name: 'Quần jean nam',
        image: '/product2.jpg',
        price: '450.000đ',
        quantity: 1,
        variation: 'Xanh đậm, 32',
      }
    ],
    total: '450.000đ',
    seller: 'Shop XYZ',
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'shipping':
    case 'delivering':
      return 'info';
    case 'pending':
      return 'warning';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'completed':
      return 'Hoàn thành';
    case 'shipping':
      return 'Đang vận chuyển';
    case 'delivering':
      return 'Đang giao';
    case 'pending':
      return 'Chờ thanh toán';
    case 'cancelled':
      return 'Đã hủy';
    default:
      return status;
  }
};

const OrdersPage = () => {
  const [currentTab, setCurrentTab] = useState('all');

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <ClientLayout>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {/* Left Sidebar */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                mb: 2,
                pb: 2,
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}>
                <Avatar
                  src="/avatar-placeholder.jpg"
                  sx={{ width: 50, height: 50 }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Nguyễn Văn A
                  </Typography>
                </Box>
              </Box>
              <List>
                {menuItems.map((item, index) => (
                  <ListItem
                    key={index}
                    button
                    selected={index === 1}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      '&.Mui-selected': {
                        bgcolor: 'primary.lighter',
                        color: 'primary.main',
                        '& .MuiListItemIcon-root': {
                          color: 'primary.main',
                        },
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Paper sx={{ mb: 3 }}>
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  px: 2,
                  borderBottom: 1,
                  borderColor: 'divider',
                }}
              >
                {orderTabs.map((tab) => (
                  <Tab
                    key={tab.value}
                    label={tab.label}
                    value={tab.value}
                    sx={{ textTransform: 'none' }}
                  />
                ))}
              </Tabs>
            </Paper>

            {/* Orders List */}
            <Stack spacing={2}>
              {orders.map((order) => (
                <Paper key={order.id} sx={{ p: 2 }}>
                  {/* Order Header */}
                  <Box sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                    pb: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ShoppingBag fontSize="small" />
                      <Typography variant="subtitle2">
                        {order.seller}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Chip
                        label={getStatusText(order.status)}
                        color={getStatusColor(order.status)}
                        size="small"
                      />
                    </Box>
                  </Box>

                  {/* Order Items */}
                  {order.items.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: 'flex',
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 1,
                          overflow: 'hidden',
                          flexShrink: 0,
                          bgcolor: 'grey.100',
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          Phân loại: {item.variation}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          x{item.quantity}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography color="primary.main" sx={{ fontWeight: 500 }}>
                          {item.price}
                        </Typography>
                      </Box>
                    </Box>
                  ))}

                  {/* Order Footer */}
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {order.date}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Tổng số tiền:
                        <Typography
                          component="span"
                          color="primary.main"
                          sx={{ fontWeight: 600, ml: 1 }}
                        >
                          {order.total}
                        </Typography>
                      </Typography>
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        {order.status === 'completed' && (
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Star />}
                            sx={{ textTransform: 'none' }}
                          >
                            Đánh giá
                          </Button>
                        )}
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ textTransform: 'none' }}
                        >
                          Mua lại
                        </Button>
                      </Stack>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </ClientLayout>
  );
};

export default OrdersPage; 