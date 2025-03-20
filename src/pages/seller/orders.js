import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from '@mui/material';
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  LocalShipping as ShippingIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';

const mockOrders = [
  {
    id: "DH001",
    customer: {
      name: "Nguyễn Văn A",
      phone: "0901234567",
      address: "123 Đường ABC, Quận 1, TP.HCM",
    },
    items: [
      {
        id: 1,
        name: "Áo thun oversize",
        price: 150000,
        quantity: 1,
      }
    ],
    total: 150000,
    status: "pending",
    createdAt: "2024-03-15T10:30:00",
    paymentMethod: "cod",
    shippingMethod: "standard",
  },
  {
    id: "DH002",
    customer: {
      name: "Trần Thị B",
      phone: "0909876543",
      address: "456 Đường XYZ, Quận 2, TP.HCM",
    },
    items: [
      {
        id: 2,
        name: "Túi xách mini",
        price: 300000,
        quantity: 1,
      }
    ],
    total: 300000,
    status: "processing",
    createdAt: "2024-03-15T09:15:00",
    paymentMethod: "banking",
    shippingMethod: "express",
  },
];

const statusColors = {
  pending: 'warning',
  processing: 'info',
  shipping: 'primary',
  completed: 'success',
  cancelled: 'error',
};

const statusLabels = {
  pending: 'Chờ xác nhận',
  processing: 'Đang xử lý',
  shipping: 'Đang giao',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
};

const OrdersPage = () => {
  const router = useRouter();
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const handleOpenMenu = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const handleViewDetail = () => {
    setOpenDetailDialog(true);
    handleCloseMenu();
  };

  const handleUpdateStatus = (newStatus) => {
    if (selectedOrder) {
      setOrders(prev => prev.map(order =>
        order.id === selectedOrder.id
          ? { ...order, status: newStatus }
          : order
      ));
    }
    handleCloseMenu();
  };

  const handleCancel = () => {
    setOpenCancelDialog(true);
    handleCloseMenu();
  };

  const handleConfirmCancel = () => {
    if (selectedOrder && cancelReason) {
      setOrders(prev => prev.map(order =>
        order.id === selectedOrder.id
          ? { ...order, status: 'cancelled', cancelReason }
          : order
      ));
      setOpenCancelDialog(false);
      setCancelReason('');
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.phone.includes(searchQuery);
    const matchesStatus = !filterStatus || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Typography variant="h5" sx={{ mb: 4 }}>
          Quản lý đơn hàng
        </Typography>

        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                placeholder="Tìm kiếm theo mã đơn, tên hoặc SĐT..."
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
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Trạng thái</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  label="Trạng thái"
                >
                  <MenuItem value="">Tất cả</MenuItem>
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Orders Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã đơn</TableCell>
                <TableCell>Khách hàng</TableCell>
                <TableCell>Sản phẩm</TableCell>
                <TableCell align="right">Tổng tiền</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thời gian</TableCell>
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {order.customer.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {order.customer.phone}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {order.items.map((item) => (
                      <Typography key={item.id} variant="body2">
                        {item.name} x {item.quantity}
                      </Typography>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    <Typography color="primary.main">
                      {order.total.toLocaleString('vi-VN')}đ
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={statusLabels[order.status]}
                      color={statusColors[order.status]}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleString('vi-VN')}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={(e) => handleOpenMenu(e, order)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Order Actions Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleViewDetail}>
            <VisibilityIcon sx={{ mr: 1 }} /> Xem chi tiết
          </MenuItem>
          {selectedOrder?.status === 'pending' && (
            <MenuItem onClick={() => handleUpdateStatus('processing')}>
              <CheckCircleIcon sx={{ mr: 1 }} /> Xác nhận đơn
            </MenuItem>
          )}
          {selectedOrder?.status === 'processing' && (
            <MenuItem onClick={() => handleUpdateStatus('shipping')}>
              <ShippingIcon sx={{ mr: 1 }} /> Bắt đầu giao hàng
            </MenuItem>
          )}
          {['pending', 'processing'].includes(selectedOrder?.status) && (
            <MenuItem onClick={handleCancel} sx={{ color: 'error.main' }}>
              <CancelIcon sx={{ mr: 1 }} /> Hủy đơn
            </MenuItem>
          )}
        </Menu>

        {/* Order Detail Dialog */}
        <Dialog
          open={openDetailDialog}
          onClose={() => setOpenDetailDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          {selectedOrder && (
            <>
              <DialogTitle>
                Chi tiết đơn hàng #{selectedOrder.id}
              </DialogTitle>
              <DialogContent>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Thông tin khách hàng
                  </Typography>
                  <Typography>
                    Tên: {selectedOrder.customer.name}
                  </Typography>
                  <Typography>
                    SĐT: {selectedOrder.customer.phone}
                  </Typography>
                  <Typography>
                    Địa chỉ: {selectedOrder.customer.address}
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Sản phẩm
                  </Typography>
                  {selectedOrder.items.map((item) => (
                    <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>
                        {item.name} x {item.quantity}
                      </Typography>
                      <Typography>
                        {item.price.toLocaleString('vi-VN')}đ
                      </Typography>
                    </Box>
                  ))}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="subtitle1">
                      Tổng cộng
                    </Typography>
                    <Typography variant="subtitle1" color="primary.main">
                      {selectedOrder.total.toLocaleString('vi-VN')}đ
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Thông tin thanh toán
                  </Typography>
                  <Typography>
                    Phương thức: {selectedOrder.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản'}
                  </Typography>
                  <Typography>
                    Vận chuyển: {selectedOrder.shippingMethod === 'standard' ? 'Tiêu chuẩn' : 'Nhanh'}
                  </Typography>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDetailDialog(false)}>
                  Đóng
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Cancel Order Dialog */}
        <Dialog
          open={openCancelDialog}
          onClose={() => setOpenCancelDialog(false)}
        >
          <DialogTitle>
            Xác nhận hủy đơn
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Lý do hủy"
              multiline
              rows={3}
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCancelDialog(false)}>
              Đóng
            </Button>
            <Button
              onClick={handleConfirmCancel}
              color="error"
              variant="contained"
              disabled={!cancelReason}
            >
              Xác nhận hủy
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default OrdersPage; 