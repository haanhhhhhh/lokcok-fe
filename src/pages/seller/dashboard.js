import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  InputAdornment,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Store as StoreIcon,
  Inventory as InventoryIcon,
  LocalShipping as ShippingIcon,
  Close as CloseIcon,
  Upload as UploadIcon,
  ShoppingCart as OrderIcon,
  LocalOffer as VoucherIcon,
  Article as PostIcon,
  Chat as ChatIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';

const mockProducts = [
  {
    id: 1,
    name: "Áo thun oversize",
    price: 150000,
    description: "Áo thun oversize màu trắng, mặc 1 lần",
    status: "available",
  },
  {
    id: 2,
    name: "Túi xách mini",
    price: 300000,
    description: "Túi xách mini màu hồng, còn mới 95%",
    status: "sold",
  },
];

const menuItems = [
  {
    title: 'Tổng quan',
    icon: <DashboardIcon />,
    path: '/seller/dashboard',
  },
  {
    title: 'Đăng bán sản phẩm',
    icon: <AddIcon />,
    path: '/seller/products/new',
  },
  {
    title: 'Quản lý sản phẩm',
    icon: <StoreIcon />,
    path: '/seller/products',
  },
  {
    title: 'Quản lý đơn hàng',
    icon: <OrderIcon />,
    path: '/seller/orders',
  },
  {
    title: 'Quản lý giao hàng',
    icon: <ShippingIcon />,
    path: '/seller/shipping',
  },
  {
    title: 'Quản lý voucher',
    icon: <VoucherIcon />,
    path: '/seller/vouchers',
  },
  {
    title: 'Đăng bài & Fan',
    icon: <PostIcon />,
    path: '/seller/posts',
  },
  {
    title: 'Chat với người mua',
    icon: <ChatIcon />,
    path: '/seller/chat',
  },
];

const SellerDashboard = () => {
  const router = useRouter();
  const [products, setProducts] = useState(mockProducts);
  const [openDialog, setOpenDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
  });
  const [error, setError] = useState('');

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setNewProduct({
      name: '',
      price: '',
      description: '',
    });
    setError('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.description) {
      setError('Vui lòng điền đầy đủ thông tin sản phẩm');
      return;
    }

    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    setProducts(prev => [...prev, {
      ...newProduct,
      id: newId,
      status: 'available',
      price: Number(newProduct.price),
    }]);
    
    handleCloseDialog();
  };

  const stats = {
    totalProducts: products.length,
    availableProducts: products.filter(p => p.status === 'available').length,
    soldProducts: products.filter(p => p.status === 'sold').length,
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          width: 280,
          flexShrink: 0,
          bgcolor: 'white',
          borderRight: '1px solid #eee',
          height: '100vh',
          position: 'fixed',
          overflowY: 'auto',
        }}
      >
        <Box sx={{ p: 3, borderBottom: '1px solid #eee' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            LokCok
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kênh Người Bán
          </Typography>
        </Box>
        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.path}>
              {index > 0 && index % 3 === 0 && <Divider />}
              <ListItemButton
                selected={router.pathname === item.path}
                onClick={() => router.push(item.path)}
              >
                <ListItemIcon sx={{ color: router.pathname === item.path ? 'primary.main' : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Main content */}
      <Box sx={{ flexGrow: 1, ml: '280px', bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={3}>
            {/* Header */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DashboardIcon color="primary" />
                  Tổng quan
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleOpenDialog}
                >
                  Thêm sản phẩm
                </Button>
              </Box>
            </Grid>

            {/* Stats Cards */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Tổng số sản phẩm
                </Typography>
                <Typography variant="h4">
                  {stats.totalProducts}
                </Typography>
                <InventoryIcon color="primary" sx={{ mt: 1 }} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Sản phẩm còn hàng
                </Typography>
                <Typography variant="h4">
                  {stats.availableProducts}
                </Typography>
                <StoreIcon color="success" sx={{ mt: 1 }} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Đã bán
                </Typography>
                <Typography variant="h4">
                  {stats.soldProducts}
                </Typography>
                <ShippingIcon color="info" sx={{ mt: 1 }} />
              </Paper>
            </Grid>

            {/* Products List */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Sản phẩm gần đây
                </Typography>
                <Button 
                  endIcon={<AddIcon />}
                  onClick={() => router.push('/seller/products')}
                >
                  Xem tất cả
                </Button>
              </Box>
              <Grid container spacing={2}>
                {products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Card>
                      <Box sx={{ height: 200, bgcolor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <UploadIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
                      </Box>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography variant="h6" gutterBottom>
                            {product.name}
                          </Typography>
                          <Chip
                            label={product.status === 'available' ? 'Còn hàng' : 'Đã bán'}
                            color={product.status === 'available' ? 'success' : 'default'}
                            size="small"
                          />
                        </Box>
                        <Typography color="text.secondary" paragraph>
                          {product.description}
                        </Typography>
                        <Typography variant="h6" color="primary">
                          {product.price.toLocaleString('vi-VN')}đ
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          Chỉnh sửa
                        </Button>
                        <Button size="small" color="error">
                          Xóa
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>

        {/* Add Product Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            Thêm sản phẩm mới
            <IconButton
              onClick={handleCloseDialog}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Box sx={{ mt: 2 }}>
              <Box sx={{ border: '1px dashed grey', p: 3, textAlign: 'center', mb: 2 }}>
                <UploadIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography>
                  Tải lên ảnh sản phẩm
                </Typography>
                <Button variant="outlined" sx={{ mt: 2 }}>
                  Chọn ảnh
                </Button>
              </Box>
              <TextField
                fullWidth
                label="Tên sản phẩm"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Giá bán"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">đ</InputAdornment>,
                }}
              />
              <TextField
                fullWidth
                label="Mô tả sản phẩm"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                multiline
                rows={4}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Hủy</Button>
            <Button variant="contained" onClick={handleAddProduct}>
              Thêm sản phẩm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default SellerDashboard; 