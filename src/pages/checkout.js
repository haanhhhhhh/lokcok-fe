import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Stack,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
  Avatar,
} from '@mui/material';
import {
  LocationOn,
  Payment,
  LocalOffer,
  Store,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import ClientLayout from '../layouts/ClientLayout';

// Mẫu dữ liệu đơn hàng
const orderItems = [
  {
    id: 1,
    shop: {
      id: 1,
      name: 'Shop ABC',
      avatar: '/shop1.jpg',
    },
    product: {
      id: 1,
      name: 'Áo thun basic',
      image: '/product1.jpg',
      price: 199000,
      originalPrice: 299000,
      variation: 'Trắng, L',
    },
    quantity: 2,
  },
  {
    id: 2,
    shop: {
      id: 2,
      name: 'Shop XYZ',
      avatar: '/shop2.jpg',
    },
    product: {
      id: 2,
      name: 'Quần jean nam',
      image: '/product2.jpg',
      price: 450000,
      originalPrice: 599000,
      variation: 'Xanh đậm, 32',
    },
    quantity: 1,
  },
];

const steps = ['Thông tin đơn hàng', 'Địa chỉ giao hàng', 'Phương thức thanh toán', 'Xác nhận đơn hàng'];

const CheckoutPage = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    address: '',
    ward: '',
    district: '',
    city: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [note, setNote] = useState('');

  // Tính tổng tiền
  const subtotal = orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = 30000;
  const total = subtotal + shippingFee;

  // Format giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handlePlaceOrder = () => {
    // Lưu thông tin đơn hàng vào localStorage
    const orderData = {
      items: orderItems,
      shippingAddress,
      paymentMethod,
      note,
      total,
      subtotal,
      shippingFee,
    };
    localStorage.setItem('orderData', JSON.stringify(orderData));
    
    // Chuyển hướng đến trang đặt hàng thành công
    router.push('/order-success');
  };

  const renderOrderSummary = () => (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Tóm tắt đơn hàng
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
    </Paper>
  );

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            {renderOrderSummary()}
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <LocalOffer color="primary" />
                <Typography variant="h6">Mã giảm giá</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="Nhập mã giảm giá"
                  sx={{ flex: 1 }}
                />
                <Button variant="outlined">Áp dụng</Button>
              </Box>
            </Paper>
          </>
        );
      case 1:
        return (
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <LocationOn color="primary" />
              <Typography variant="h6">Địa chỉ giao hàng</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Họ và tên"
                  value={shippingAddress.fullName}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Tỉnh/Thành phố"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Quận/Huyện"
                  value={shippingAddress.district}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, district: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Phường/Xã"
                  value={shippingAddress.ward}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, ward: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Ghi chú"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </Grid>
            </Grid>
          </Paper>
        );
      case 2:
        return (
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Payment color="primary" />
              <Typography variant="h6">Phương thức thanh toán</Typography>
            </Box>
            <FormControl component="fieldset">
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="cod"
                  control={<Radio />}
                  label="Thanh toán khi nhận hàng (COD)"
                />
                <FormControlLabel
                  value="bank"
                  control={<Radio />}
                  label="Chuyển khoản ngân hàng"
                />
                <FormControlLabel
                  value="momo"
                  control={<Radio />}
                  label="Ví MoMo"
                />
              </RadioGroup>
            </FormControl>
          </Paper>
        );
      case 3:
        return (
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Xác nhận đơn hàng
            </Typography>
            <Typography color="text.secondary" paragraph>
              Vui lòng kiểm tra lại thông tin đơn hàng trước khi xác nhận
            </Typography>
            {renderOrderSummary()}
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Địa chỉ giao hàng
              </Typography>
              <Typography>
                {shippingAddress.fullName} - {shippingAddress.phone}
              </Typography>
              <Typography>
                {shippingAddress.address}, {shippingAddress.ward}, {shippingAddress.district}, {shippingAddress.city}
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Phương thức thanh toán
              </Typography>
              <Typography>
                {paymentMethod === 'cod' && 'Thanh toán khi nhận hàng (COD)'}
                {paymentMethod === 'bank' && 'Chuyển khoản ngân hàng'}
                {paymentMethod === 'momo' && 'Ví MoMo'}
              </Typography>
            </Box>
          </Paper>
        );
      default:
        return null;
    }
  };

  return (
    <ClientLayout>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Typography variant="h4" gutterBottom>
          Thanh toán
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ minWidth: 120 }}
          >
            Quay lại
          </Button>
          <Button
            variant="contained"
            onClick={activeStep === steps.length - 1 ? handlePlaceOrder : handleNext}
            sx={{ minWidth: 120 }}
          >
            {activeStep === steps.length - 1 ? 'Đặt hàng' : 'Tiếp tục'}
          </Button>
        </Box>
      </Container>
    </ClientLayout>
  );
};

export default CheckoutPage; 