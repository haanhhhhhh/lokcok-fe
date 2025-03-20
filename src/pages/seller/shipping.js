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
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocalShipping as ShippingIcon,
  Print as PrintIcon,
  QrCode as QrCodeIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';

const mockShipments = [
  {
    id: "GH001",
    orderId: "DH001",
    trackingNumber: "SPXVN123456789",
    customer: {
      name: "Nguyễn Văn A",
      phone: "0901234567",
      address: "123 Đường ABC, Quận 1, TP.HCM",
    },
    items: [
      {
        name: "Áo thun oversize",
        quantity: 1,
      }
    ],
    carrier: "SPX Express",
    status: "pending",
    estimatedDelivery: "2024-03-20",
    createdAt: "2024-03-15T10:30:00",
  },
  {
    id: "GH002",
    orderId: "DH002",
    trackingNumber: "GHTKXH987654321",
    customer: {
      name: "Trần Thị B",
      phone: "0909876543",
      address: "456 Đường XYZ, Quận 2, TP.HCM",
    },
    items: [
      {
        name: "Túi xách mini",
        quantity: 1,
      }
    ],
    carrier: "GHTK Express",
    status: "in_transit",
    estimatedDelivery: "2024-03-19",
    createdAt: "2024-03-15T09:15:00",
  },
];

const statusColors = {
  pending: 'warning',
  in_transit: 'primary',
  delivered: 'success',
  failed: 'error',
  returned: 'error',
};

const statusLabels = {
  pending: 'Chờ lấy hàng',
  in_transit: 'Đang vận chuyển',
  delivered: 'Đã giao hàng',
  failed: 'Giao hàng thất bại',
  returned: 'Đã hoàn trả',
};

const carriers = [
  'SPX Express',
  'GHTK Express',
  'GHN Express',
  'J&T Express',
  'Viettel Post',
];

const ShippingPage = () => {
  const [shipments, setShipments] = useState(mockShipments);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCarrier, setFilterCarrier] = useState('');
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);

  const handleViewDetail = (shipment) => {
    setSelectedShipment(shipment);
    setOpenDetailDialog(true);
  };

  const handlePrintLabel = (shipment) => {
    // TODO: Implement print shipping label functionality
    console.log('Print label for shipment:', shipment.id);
  };

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = 
      shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.customer.phone.includes(searchQuery);
    const matchesStatus = !filterStatus || shipment.status === filterStatus;
    const matchesCarrier = !filterCarrier || shipment.carrier === filterCarrier;
    return matchesSearch && matchesStatus && matchesCarrier;
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Typography variant="h5" sx={{ mb: 4 }}>
          Quản lý giao hàng
        </Typography>

        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="Tìm kiếm theo mã vận đơn, tên hoặc SĐT..."
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
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Đơn vị vận chuyển</InputLabel>
                <Select
                  value={filterCarrier}
                  onChange={(e) => setFilterCarrier(e.target.value)}
                  label="Đơn vị vận chuyển"
                >
                  <MenuItem value="">Tất cả</MenuItem>
                  {carriers.map((carrier) => (
                    <MenuItem key={carrier} value={carrier}>
                      {carrier}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Shipments Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã vận đơn</TableCell>
                <TableCell>Khách hàng</TableCell>
                <TableCell>Đơn vị vận chuyển</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Ngày giao dự kiến</TableCell>
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredShipments.map((shipment) => (
                <TableRow key={shipment.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <QrCodeIcon color="action" fontSize="small" />
                      {shipment.trackingNumber}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {shipment.customer.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {shipment.customer.phone}
                    </Typography>
                  </TableCell>
                  <TableCell>{shipment.carrier}</TableCell>
                  <TableCell>
                    <Chip
                      label={statusLabels[shipment.status]}
                      color={statusColors[shipment.status]}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(shipment.estimatedDelivery).toLocaleDateString('vi-VN')}
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleViewDetail(shipment)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handlePrintLabel(shipment)}
                      >
                        <PrintIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Shipment Detail Dialog */}
        <Dialog
          open={openDetailDialog}
          onClose={() => setOpenDetailDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          {selectedShipment && (
            <>
              <DialogTitle>
                Chi tiết vận đơn #{selectedShipment.trackingNumber}
              </DialogTitle>
              <DialogContent>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Thông tin đơn hàng
                  </Typography>
                  <Typography>
                    Mã đơn hàng: {selectedShipment.orderId}
                  </Typography>
                  <Typography>
                    Đơn vị vận chuyển: {selectedShipment.carrier}
                  </Typography>
                  <Typography>
                    Ngày tạo: {new Date(selectedShipment.createdAt).toLocaleString('vi-VN')}
                  </Typography>
                  <Typography>
                    Ngày giao dự kiến: {new Date(selectedShipment.estimatedDelivery).toLocaleDateString('vi-VN')}
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Thông tin người nhận
                  </Typography>
                  <Typography>
                    Tên: {selectedShipment.customer.name}
                  </Typography>
                  <Typography>
                    SĐT: {selectedShipment.customer.phone}
                  </Typography>
                  <Typography>
                    Địa chỉ: {selectedShipment.customer.address}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Sản phẩm
                  </Typography>
                  {selectedShipment.items.map((item, index) => (
                    <Typography key={index}>
                      {item.name} x {item.quantity}
                    </Typography>
                  ))}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDetailDialog(false)}>
                  Đóng
                </Button>
                <Button
                  variant="contained"
                  startIcon={<PrintIcon />}
                  onClick={() => handlePrintLabel(selectedShipment)}
                >
                  In vận đơn
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default ShippingPage;