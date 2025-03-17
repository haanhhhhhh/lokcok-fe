import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  InputAdornment,
  Link as MuiLink
} from '@mui/material';
import {
  Close,
  Facebook,
  Google,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import Link from 'next/link';

const LoginModal = ({ open, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý đăng nhập ở đây
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          position: 'relative'
        }
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'grey.500'
        }}
      >
        <Close />
      </IconButton>

      <DialogContent sx={{ p: 4, mt: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Đăng nhập
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            required
            autoFocus
          />
          
          <TextField
            fullWidth
            label="Mật khẩu"
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            Đăng nhập
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Link href="/auth/forgot-password" passHref>
              <MuiLink variant="body2" onClick={onClose}>
                Quên mật khẩu?
              </MuiLink>
            </Link>
            <Link href="/auth/register" passHref>
              <MuiLink variant="body2" onClick={onClose}>
                Chưa có tài khoản? Đăng ký ngay
              </MuiLink>
            </Link>
          </Box>

          <Divider sx={{ my: 3 }}>hoặc</Divider>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Facebook />}
              sx={{ py: 1 }}
            >
              Facebook
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              sx={{ py: 1 }}
            >
              Google
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal; 