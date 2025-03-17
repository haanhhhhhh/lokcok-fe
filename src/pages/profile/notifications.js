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
  Avatar,
  Divider,
  Button,
} from '@mui/material';
import {
  Person,
  ShoppingBag,
  Notifications,
  Favorite,
  LocalOffer,
  LocalShipping,
  Payment,
  Campaign,
  Discount,
} from '@mui/icons-material';
import ClientLayout from '../../layouts/ClientLayout';

const menuItems = [
  { icon: <Person />, text: 'Hồ sơ', path: '/profile' },
  { icon: <ShoppingBag />, text: 'Đơn mua', path: '/profile/orders' },
  { icon: <Notifications />, text: 'Thông báo', path: '/profile/notifications' },
  { icon: <Favorite />, text: 'Yêu thích', path: '/profile/favorites' },
  { icon: <LocalOffer />, text: 'Kho voucher', path: '/profile/vouchers' },
];

const notificationTabs = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Đơn hàng', value: 'order' },
  { label: 'Khuyến mãi', value: 'promotion' },
  { label: 'Cập nhật', value: 'update' },
];

const notifications = [
  {
    id: 1,
    type: 'order',
    title: 'Đơn hàng #123456 đã được giao thành công',
    description: 'Đơn hàng của bạn đã được giao thành công. Hãy đánh giá sản phẩm để nhận xu nhé!',
    time: '2 giờ trước',
    icon: <LocalShipping />,
    isRead: false,
  },
  {
    id: 2,
    type: 'promotion',
    title: 'Giảm 50% cho đơn hàng đầu tiên',
    description: 'Ưu đãi đặc biệt dành cho khách hàng mới. Đặt hàng ngay!',
    time: '1 ngày trước',
    icon: <Discount />,
    isRead: true,
  },
  {
    id: 3,
    type: 'update',
    title: 'Cập nhật chính sách vận chuyển',
    description: 'Chúng tôi đã cập nhật chính sách vận chuyển mới. Xem ngay!',
    time: '2 ngày trước',
    icon: <Campaign />,
    isRead: true,
  },
];

const NotificationsPage = () => {
  const [currentTab, setCurrentTab] = useState('all');

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const filteredNotifications = notifications.filter(
    (notification) => currentTab === 'all' || notification.type === currentTab
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
                    selected={index === 2}
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
                {notificationTabs.map((tab) => (
                  <Tab
                    key={tab.value}
                    label={tab.label}
                    value={tab.value}
                    sx={{ textTransform: 'none' }}
                  />
                ))}
              </Tabs>
            </Paper>

            {/* Notifications List */}
            <Paper>
              <List sx={{ p: 0 }}>
                {filteredNotifications.map((notification, index) => (
                  <React.Fragment key={notification.id}>
                    <ListItem
                      sx={{
                        py: 2,
                        px: 3,
                        bgcolor: notification.isRead ? 'transparent' : 'action.hover',
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 'auto',
                          mr: 2,
                          color: 'primary.main',
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: 'primary.lighter',
                            color: 'primary.main',
                          }}
                        >
                          {notification.icon}
                        </Avatar>
                      </ListItemIcon>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                          {notification.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          {notification.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {notification.time}
                        </Typography>
                      </Box>
                    </ListItem>
                    {index < filteredNotifications.length - 1 && (
                      <Divider />
                    )}
                  </React.Fragment>
                ))}
              </List>
              {filteredNotifications.length === 0 && (
                <Box
                  sx={{
                    py: 8,
                    textAlign: 'center',
                  }}
                >
                  <Typography color="text.secondary">
                    Không có thông báo nào
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ClientLayout>
  );
};

export default NotificationsPage; 