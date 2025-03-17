import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Checkbox,
  IconButton,
  Button,
  Stack,
  TextField,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  Store,
  LocalOffer,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import ClientLayout from '../layouts/ClientLayout';

// Mẫu dữ liệu giỏ hàng
const initialCartItems = [
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
    selected: false,
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
    selected: false,
  },
];

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [voucher, setVoucher] = useState('');

  // Tính tổng tiền các sản phẩm được chọn
  const selectedTotal = cartItems
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Số lượng sản phẩm được chọn
  const selectedCount = cartItems
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.quantity, 0);

  // Kiểm tra xem tất cả sản phẩm có được chọn không
  const allSelected = cartItems.length > 0 && cartItems.every(item => item.selected);

  // Xử lý chọn/bỏ chọn tất cả
  const handleSelectAll = (event) => {
    setCartItems(cartItems.map(item => ({
      ...item,
      selected: event.target.checked,
    })));
  };

  // Xử lý chọn/bỏ chọn một sản phẩm
  const handleSelectItem = (itemId) => {
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, selected: !item.selected } : item
    ));
  };

  // Xử lý thay đổi số lượng
  const handleQuantityChange = (itemId, delta) => {
    setCartItems(cartItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  // Xử lý xóa sản phẩm
  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  // Format giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleCheckout = () => {
    // Lưu thông tin giỏ hàng vào localStorage hoặc state management
    localStorage.setItem('checkoutItems', JSON.stringify(cartItems.filter(item => item.selected)));
    router.push('/checkout');
  };

  return (
    <ClientLayout>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {cartItems.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Giỏ hàng của bạn còn trống
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: 'none' }}
              onClick={() => router.push('/')}
            >
              Mua sắm ngay
            </Button>
          </Paper>
        ) : (
          <Stack spacing={2}>
            {/* Header */}
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Checkbox
                  checked={allSelected}
                  onChange={handleSelectAll}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />
                <Typography sx={{ flex: 2 }}>Sản phẩm</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center' }}>Đơn giá</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center' }}>Số lượng</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center' }}>Số tiền</Typography>
                <Typography sx={{ width: 40, textAlign: 'center' }}>Thao tác</Typography>
              </Box>
            </Paper>

            {/* Cart Items */}
            {cartItems.map(item => (
              <Paper key={item.id} sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Checkbox
                    checked={item.selected}
                    onChange={() => handleSelectItem(item.id)}
                  />
                  <Avatar src={item.shop.avatar}>
                    <Store />
                  </Avatar>
                  <Typography variant="subtitle2">
                    {item.shop.name}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pl: 4 }}>
                  <Box sx={{ flex: 2, display: 'flex', gap: 2 }}>
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
                        src={item.product.image}
                        alt={item.product.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        {item.product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Phân loại: {item.product.variation}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1, textAlign: 'center' }}>
                    <Typography color="primary.main">
                      {formatPrice(item.product.price)}
                    </Typography>
                    {item.product.originalPrice && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textDecoration: 'line-through' }}
                      >
                        {formatPrice(item.product.originalPrice)}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ flex: 1, textAlign: 'center' }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      spacing={1}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        sx={{ border: 1, borderColor: 'divider' }}
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      <Typography sx={{ minWidth: 40, textAlign: 'center' }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, 1)}
                        sx={{ border: 1, borderColor: 'divider' }}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Box>
                  <Typography sx={{ flex: 1, textAlign: 'center', color: 'primary.main' }}>
                    {formatPrice(item.product.price * item.quantity)}
                  </Typography>
                  <Box sx={{ width: 40, textAlign: 'center' }}>
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveItem(item.id)}
                      sx={{ color: 'text.secondary' }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            ))}

            {/* Footer */}
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LocalOffer color="primary" />
                  <Typography>Voucher</Typography>
                  <TextField
                    size="small"
                    placeholder="Nhập mã voucher"
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                    sx={{ width: 200 }}
                  />
                  <Button
                    variant="outlined"
                    sx={{ textTransform: 'none' }}
                  >
                    Áp dụng
                  </Button>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Checkbox
                      checked={allSelected}
                      onChange={handleSelectAll}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                    />
                    <Typography>Chọn tất cả ({cartItems.length})</Typography>
                    <Button
                      color="inherit"
                      sx={{ textTransform: 'none' }}
                      onClick={() => setCartItems([])}
                    >
                      Xóa
                    </Button>
                    <Box sx={{ flex: 1 }} />
                    <Typography>
                      Tổng thanh toán ({selectedCount} sản phẩm):
                      <Typography
                        component="span"
                        color="primary.main"
                        sx={{ ml: 1, fontSize: '1.25rem', fontWeight: 500 }}
                      >
                        {formatPrice(selectedTotal)}
                      </Typography>
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={selectedCount === 0}
                      onClick={handleCheckout}
                      sx={{
                        textTransform: 'none',
                        minWidth: 150,
                      }}
                    >
                      Mua hàng
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Stack>
        )}
      </Container>
    </ClientLayout>
  );
};

export default CartPage; 