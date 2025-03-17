import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Avatar,
  Tabs,
  Tab,
  Stack,
} from '@mui/material';
import {
  Person,
  ShoppingBag,
  Notifications,
  Favorite,
  LocalOffer,
  AccessTime,
  Store,
} from '@mui/icons-material';
import ClientLayout from '../../layouts/ClientLayout';

const menuItems = [
  { icon: <Person />, text: 'Hồ sơ', path: '/profile' },
  { icon: <ShoppingBag />, text: 'Đơn mua', path: '/profile/orders' },
  { icon: <Notifications />, text: 'Thông báo', path: '/profile/notifications' },
  { icon: <Favorite />, text: 'Yêu thích', path: '/profile/favorites' },
  { icon: <LocalOffer />, text: 'Kho voucher', path: '/profile/vouchers' },
];

const voucherTabs = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Mới nhất', value: 'new' },
  { label: 'Phổ biến', value: 'popular' },
  { label: 'Sắp hết hạn', value: 'expiring' },
];

const vouchers = [
  {
    id: 1,
    code: 'NEWUSER50',
    title: 'Giảm 50% cho đơn hàng đầu tiên',
    description: 'Áp dụng cho tất cả sản phẩm',
    minSpend: '100.000đ',
    maxDiscount: '100.000đ',
    expiry: '31/03/2024',
    type: 'new',
    shop: 'Shop ABC',
    shopAvatar: '/shop1.jpg',
  },
  {
    id: 2,
    code: 'FREESHIP',
    title: 'Miễn phí vận chuyển',
    description: 'Áp dụng cho đơn hàng từ 200.000đ',
    minSpend: '200.000đ',
    maxDiscount: '30.000đ',
    expiry: '20/03/2024',
    type: 'expiring',
    shop: 'Shop XYZ',
    shopAvatar: '/shop2.jpg',
  },
  {
    id: 3,
    code: 'SALE30',
    title: 'Giảm 30% cho danh mục thời trang',
    description: 'Áp dụng cho sản phẩm trong danh mục thời trang',
    minSpend: '300.000đ',
    maxDiscount: '200.000đ',
    expiry: '15/04/2024',
    type: 'popular',
    shop: 'Shop DEF',
    shopAvatar: '/shop3.jpg',
  },
];

const VouchersPage = () => {
  const [currentTab, setCurrentTab] = useState('all');

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const filteredVouchers = vouchers.filter(
    (voucher) => currentTab === 'all' || voucher.type === currentTab
  );

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
                    selected={index === 4}
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
                {voucherTabs.map((tab) => (
                  <Tab
                    key={tab.value}
                    label={tab.label}
                    value={tab.value}
                    sx={{ textTransform: 'none' }}
                  />
                ))}
              </Tabs>
            </Paper>

            {/* Vouchers List */}
            <Stack spacing={2}>
              {filteredVouchers.map((voucher) => (
                <Paper
                  key={voucher.id}
                  sx={{
                    p: 0,
                    display: 'flex',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 6,
                      height: '70%',
                      bgcolor: 'primary.main',
                      borderTopRightRadius: 3,
                      borderBottomRightRadius: 3,
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      flex: 1,
                      display: 'flex',
                      gap: 2,
                      borderRight: '2px dashed',
                      borderColor: 'divider',
                    }}
                  >
                    <Avatar src={voucher.shopAvatar} sx={{ width: 48, height: 48 }}>
                      <Store />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="subtitle2">
                          {voucher.shop}
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
                        {voucher.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {voucher.description}
                      </Typography>
                      <Stack direction="row" spacing={2}>
                        <Typography variant="body2" color="text.secondary">
                          Đơn tối thiểu {voucher.minSpend}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Giảm tối đa {voucher.maxDiscount}
                        </Typography>
                      </Stack>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                        <AccessTime fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          HSD: {voucher.expiry}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      p: 2,
                      width: 150,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      bgcolor: 'grey.50',
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'primary.main',
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      Mã: {voucher.code}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ textTransform: 'none' }}
                    >
                      Lưu
                    </Button>
                  </Box>
                </Paper>
              ))}
              {filteredVouchers.length === 0 && (
                <Box
                  sx={{
                    py: 8,
                    textAlign: 'center',
                  }}
                >
                  <Typography color="text.secondary">
                    Không có voucher nào
                  </Typography>
                </Box>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </ClientLayout>
  );
};

export default VouchersPage; 