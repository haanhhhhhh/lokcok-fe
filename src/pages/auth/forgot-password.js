import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { ArrowBack, Send } from '@mui/icons-material';
import Link from 'next/link';
import GuestLayout from '../../layouts/GuestLayout';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // TODO: Implement API call to send reset password email
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      setSuccess(true);
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GuestLayout>
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* Logo hoặc Icon */}
          <Box sx={{ mb: 3 }}>
            <img
              src="/logo.png"
              alt="Logo"
              style={{ height: 60 }}
            />
          </Box>

          {/* Tiêu đề */}
          <Typography 
            variant="h5" 
            component="h1" 
            sx={{ 
              mb: 2,
              fontWeight: 600,
              textAlign: 'center'
            }}
          >
            Quên mật khẩu
          </Typography>

          {/* Mô tả */}
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 4,
              textAlign: 'center'
            }}
          >
            Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu
          </Typography>

          {/* Form */}
          <Box 
            component="form" 
            onSubmit={handleSubmit}
            sx={{ width: '100%' }}
          >
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {success ? (
              <Alert severity="success" sx={{ mb: 2 }}>
                Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn.
                Vui lòng kiểm tra hộp thư và làm theo hướng dẫn.
              </Alert>
            ) : (
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ mb: 3 }}
                placeholder="example@email.com"
                InputProps={{
                  startAdornment: <Send sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading || success}
              sx={{ mb: 2 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : success ? (
                'Đã gửi'
              ) : (
                'Gửi hướng dẫn'
              )}
            </Button>

            {/* Link quay lại đăng nhập */}
            <Box sx={{ textAlign: 'center' }}>
              <Link 
                href="/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                <ArrowBack sx={{ mr: 1, fontSize: 20 }} />
                Quay lại đăng nhập
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </GuestLayout>
  );
};

export default ForgotPasswordPage; 