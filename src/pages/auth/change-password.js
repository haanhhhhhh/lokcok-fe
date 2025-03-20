import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ChangePasswordPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Xóa thông báo lỗi khi người dùng bắt đầu nhập
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Mật khẩu mới và xác nhận mật khẩu không khớp');
      setLoading(false);
      return;
    }

    try {
      // TODO: Gọi API đổi mật khẩu
      // const response = await changePassword(formData);
      
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Đổi mật khẩu thành công!');
      // Reset form
      setFormData({
        newPassword: '',
        confirmPassword: '',
      });
      
      // Chuyển hướng về trang home sau 2 giây
      setTimeout(() => {
        router.push('/home');
      }, 2000);
    } catch (err) {
      setError('Đổi mật khẩu thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          mx: 2,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Lock sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Đổi mật khẩu
          </Typography>
          <Typography color="text.secondary">
            Vui lòng nhập mật khẩu mới
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Mật khẩu mới"
            name="newPassword"
            type={showNewPassword ? 'text' : 'password'}
            value={formData.newPassword}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <Button
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  sx={{ minWidth: 'auto', p: 1 }}
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </Button>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Xác nhận mật khẩu mới"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <Button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  sx={{ minWidth: 'auto', p: 1 }}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </Button>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Đổi mật khẩu'
            )}
          </Button>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link href="/profile" style={{ textDecoration: 'none' }}>
              <Button color="primary">Quay lại trang cá nhân</Button>
            </Link>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default ChangePasswordPage; 