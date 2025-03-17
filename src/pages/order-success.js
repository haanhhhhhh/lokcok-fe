import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  Divider,
  Avatar,
} from '@mui/material';
import {
  CheckCircle,
  Store,
  ShoppingBag,
  Home,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import ClientLayout from '../layouts/ClientLayout';

const OrderSuccessPage = () => {
  const router = useRouter();
  const orderItems = JSON.parse(localStorage.getItem('checkoutItems') || '[]');

  // Format giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  // Tính tổng tiền
  const subtotal = orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = 30000;
  const total = subtotal + shippingFee;

  return (
    <ClientLayout>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Box sx={{ mb: 4 }}>
            <CheckCircle
              color="success"
              sx={{ fontSize: 80, mb: 2 }}
            />
            <Typography variant="h4" gutterBottom>
              Đặt hàng thành công!
            </Typography>
            <Typography color="text.secondary">
              Cảm ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng của bạn sớm nhất có thể.
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ mb: 4, textAlign: 'left' }}>
            <Typography variant="h6" gutterBottom>
              Chi tiết đơn hàng
            </Typography>
            {orderItems.map((item) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Avatar src={item.shop.avatar} sx={{ width: 24, height: 24 }}>
                    <Store />
                  </Avatar>
                  <Typography variant="subtitle2">{item.shop.name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, pl: 4 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 1,
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2">{item.product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Phân loại: {item.product.variation}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Số lượng: {item.quantity}
                    </Typography>
                  </Box>
                  <Typography color="primary.main">
                    {formatPrice(item.product.price * item.quantity)}
                  </Typography>
                </Box>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Tạm tính</Typography>
                <Typography>{formatPrice(subtotal)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Phí vận chuyển</Typography>
                <Typography>{formatPrice(shippingFee)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="h6">Tổng cộng</Typography>
                <Typography variant="h6" color="primary.main">
                  {formatPrice(total)}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              startIcon={<Home />}
              onClick={() => router.push('/')}
              sx={{ minWidth: 200 }}
            >
              Về trang chủ
            </Button>
            <Button
              variant="outlined"
              startIcon={<ShoppingBag />}
              onClick={() => router.push('/profile/orders')}
              sx={{ minWidth: 200 }}
            >
              Xem đơn hàng
            </Button>
          </Stack>
        </Paper>
      </Container>
    </ClientLayout>
  );
};

export default OrderSuccessPage; 