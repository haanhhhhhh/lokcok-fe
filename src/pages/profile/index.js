import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  Button,
  Stack,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import {
  Person,
  ShoppingBag,
  Notifications,
  Favorite,
  LocalOffer,
  CameraAlt,
  Edit,
} from '@mui/icons-material';
import ClientLayout from '../../layouts/ClientLayout';
import { useRouter } from 'next/router';

const menuItems = [
  { icon: <Person />, text: 'Hồ sơ', path: '/profile' },
  { icon: <ShoppingBag />, text: 'Đơn mua', path: '/profile/orders' },
  { icon: <Notifications />, text: 'Thông báo', path: '/profile/notifications' },
  { icon: <Favorite />, text: 'Yêu thích', path: '/profile/favorites' },
  { icon: <LocalOffer />, text: 'Kho voucher', path: '/profile/vouchers' },
];

const ProfilePage = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    gender: 'male',
    birthday: '1990-01-01',
  });

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý cập nhật thông tin
    console.log('Updated profile:', profileData);
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
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    src="/avatar-placeholder.jpg"
                    sx={{ width: 50, height: 50 }}
                  />
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      bottom: -4,
                      right: -4,
                      bgcolor: 'grey.200',
                      '&:hover': { bgcolor: 'grey.300' },
                    }}
                  >
                    <CameraAlt fontSize="small" />
                  </IconButton>
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {profileData.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      cursor: 'pointer'
                    }}
                    onClick={() => router.push('/profile/edit')}
                  >
                    <Edit fontSize="small" />
                    Sửa hồ sơ
                  </Typography>
                </Box>
              </Box>
              <List>
                {menuItems.map((item, index) => (
                  <ListItem
                    key={index}
                    button
                    selected={router.pathname === item.path}
                    onClick={() => router.push(item.path)}
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
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Hồ Sơ Của Tôi
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Quản lý thông tin hồ sơ để bảo mật tài khoản
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={8}>
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        label="Tên"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                      />
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                      />
                      <TextField
                        fullWidth
                        label="Số điện thoại"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                      />
                      <FormControl>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Giới tính
                        </Typography>
                        <RadioGroup
                          row
                          name="gender"
                          value={profileData.gender}
                          onChange={handleInputChange}
                        >
                          <FormControlLabel 
                            value="male" 
                            control={<Radio />} 
                            label="Nam" 
                          />
                          <FormControlLabel 
                            value="female" 
                            control={<Radio />} 
                            label="Nữ" 
                          />
                          <FormControlLabel 
                            value="other" 
                            control={<Radio />} 
                            label="Khác" 
                          />
                        </RadioGroup>
                      </FormControl>
                      <TextField
                        fullWidth
                        label="Ngày sinh"
                        name="birthday"
                        type="date"
                        value={profileData.birthday}
                        onChange={handleInputChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <Box>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          sx={{ minWidth: 140 }}
                        >
                          Lưu
                        </Button>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        pt: 2,
                      }}
                    >
                      <Avatar
                        src="/avatar-placeholder.jpg"
                        sx={{ width: 100, height: 100 }}
                      />
                      <Button
                        variant="outlined"
                        startIcon={<CameraAlt />}
                        sx={{ textTransform: 'none' }}
                      >
                        Chọn ảnh
                      </Button>
                      <Typography variant="caption" color="text.secondary" align="center">
                        Dụng lượng file tối đa 1 MB
                        <br />
                        Định dạng: .JPEG, .PNG
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ClientLayout>
  );
};

export default ProfilePage; 