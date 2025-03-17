import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  IconButton,
  Divider
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import ClientLayout from '../../layouts/ClientLayout';

const EditProfilePage = () => {
  const [formData, setFormData] = useState({
    fullName: 'Nguyễn Văn A',
    email: 'example@email.com',
    phone: '0123456789',
    address: 'Hà Nội, Việt Nam',
    birthday: '1990-01-01'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý cập nhật thông tin
    console.log('Form submitted:', formData);
  };

  return (
    <ClientLayout>
      <Container maxWidth="md">
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 500 }}>
            Chỉnh sửa hồ sơ
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit}>
            {/* Avatar Section */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4
            }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src="/avatar-placeholder.jpg"
                  sx={{ 
                    width: 100,
                    height: 100,
                    mb: 1
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: 'white',
                    '&:hover': { bgcolor: 'grey.100' },
                    boxShadow: 1
                  }}
                  size="small"
                >
                  <PhotoCamera fontSize="small" />
                </IconButton>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Cho phép *.jpeg, *.jpg, *.png
                <br />
                Dung lượng tối đa 2MB
              </Typography>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Form Fields */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Họ và tên"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ngày sinh"
                  name="birthday"
                  type="date"
                  value={formData.birthday}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => window.history.back()}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Lưu thay đổi
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ClientLayout>
  );
};

export default EditProfilePage; 