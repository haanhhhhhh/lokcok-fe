import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  IconButton,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';

const mockProducts = [
  {
    id: 1,
    name: "Áo thun oversize",
    price: 150000,
    originalPrice: 300000,
    description: "Áo thun oversize màu trắng, mặc 1 lần",
    status: "available",
    condition: "like_new",
    category: "Thời trang nữ",
    createdAt: "2024-03-15",
  },
  {
    id: 2,
    name: "Túi xách mini",
    price: 300000,
    originalPrice: 500000,
    description: "Túi xách mini màu hồng, còn mới 95%",
    status: "sold",
    condition: "very_good",
    category: "Túi xách",
    createdAt: "2024-03-14",
  },
  // Thêm các sản phẩm mẫu khác...
];

const ProductsPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenMenu = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  const handleEdit = () => {
    if (selectedProduct) {
      router.push(`/seller/products/${selectedProduct.id}/edit`);
    }
    handleCloseMenu();
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
    handleCloseMenu();
  };

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      setProducts(prev => prev.filter(p => p.id !== selectedProduct.id));
    }
    setOpenDeleteDialog(false);
    setSelectedProduct(null);
  };

  const handleToggleVisibility = () => {
    if (selectedProduct) {
      setProducts(prev => prev.map(p => 
        p.id === selectedProduct.id 
          ? { ...p, status: p.status === 'available' ? 'hidden' : 'available' }
          : p
      ));
    }
    handleCloseMenu();
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filterCategory || product.category === filterCategory;
    const matchesStatus = !filterStatus || product.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">
            Quản lý sản phẩm
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => router.push('/seller/products/new')}
          >
            Thêm sản phẩm
          </Button>
        </Box>

        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Danh mục</InputLabel>
                <Select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  label="Danh mục"
                >
                  <MenuItem value="">Tất cả</MenuItem>
                  <MenuItem value="Thời trang nữ">Thời trang nữ</MenuItem>
                  <MenuItem value="Thời trang nam">Thời trang nam</MenuItem>
                  <MenuItem value="Túi xách">Túi xách</MenuItem>
                  <MenuItem value="Giày dép">Giày dép</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Trạng thái</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  label="Trạng thái"
                >
                  <MenuItem value="">Tất cả</MenuItem>
                  <MenuItem value="available">Đang bán</MenuItem>
                  <MenuItem value="sold">Đã bán</MenuItem>
                  <MenuItem value="hidden">Đã ẩn</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Products Grid */}
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="div"
                  sx={{
                    height: 200,
                    bgcolor: '#eee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography color="text.secondary">
                    Hình ảnh sản phẩm
                  </Typography>
                </CardMedia>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                      {product.name}
                    </Typography>
                    <IconButton 
                      size="small"
                      onClick={(e) => handleOpenMenu(e, product)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {product.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" color="primary">
                      {product.price.toLocaleString('vi-VN')}đ
                    </Typography>
                    <Chip
                      label={
                        product.status === 'available' ? 'Đang bán' :
                        product.status === 'sold' ? 'Đã bán' : 'Đã ẩn'
                      }
                      color={
                        product.status === 'available' ? 'success' :
                        product.status === 'sold' ? 'default' : 'warning'
                      }
                      size="small"
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip 
                      label={product.category} 
                      size="small" 
                      variant="outlined"
                    />
                    <Chip 
                      label={
                        product.condition === 'like_new' ? 'Như mới' :
                        product.condition === 'very_good' ? 'Rất tốt' :
                        'Tốt'
                      }
                      size="small" 
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Product Actions Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleEdit}>
            <EditIcon sx={{ mr: 1 }} /> Chỉnh sửa
          </MenuItem>
          <MenuItem onClick={handleToggleVisibility}>
            {selectedProduct?.status === 'available' ? (
              <>
                <VisibilityOffIcon sx={{ mr: 1 }} /> Ẩn sản phẩm
              </>
            ) : (
              <>
                <VisibilityIcon sx={{ mr: 1 }} /> Hiện sản phẩm
              </>
            )}
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <DeleteIcon sx={{ mr: 1 }} /> Xóa
          </MenuItem>
        </Menu>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>
            Xác nhận xóa sản phẩm
          </DialogTitle>
          <DialogContent>
            <Typography>
              Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>
              Hủy
            </Button>
            <Button 
              onClick={handleConfirmDelete} 
              color="error" 
              variant="contained"
            >
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ProductsPage; 