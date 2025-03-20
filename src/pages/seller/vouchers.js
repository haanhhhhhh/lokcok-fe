import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';

const mockVouchers = [
  {
    id: 'VC001',
    code: 'WELCOME50',
    type: 'percent',
    value: 50,
    minOrder: 100000,
    maxDiscount: 50000,
    quantity: 100,
    used: 20,
    startDate: '2024-03-15',
    endDate: '2024-04-15',
    status: 'active',
  },
  {
    id: 'VC002',
    code: 'FREESHIP',
    type: 'fixed',
    value: 30000,
    minOrder: 200000,
    maxDiscount: 30000,
    quantity: 50,
    used: 15,
    startDate: '2024-03-20',
    endDate: '2024-03-31',
    status: 'active',
  },
];

const VouchersPage = () => {
  const router = useRouter();
  const [vouchers, setVouchers] = useState(mockVouchers);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    type: 'percent',
    value: '',
    minOrder: '',
    maxDiscount: '',
    quantity: '',
    startDate: '',
    endDate: '',
  });

  const handleOpenDialog = (voucher = null) => {
    if (voucher) {
      setEditingVoucher(voucher);
      setFormData({
        code: voucher.code,
        type: voucher.type,
        value: voucher.value,
        minOrder: voucher.minOrder,
        maxDiscount: voucher.maxDiscount,
        quantity: voucher.quantity,
        startDate: voucher.startDate,
        endDate: voucher.endDate,
      });
    } else {
      setEditingVoucher(null);
      setFormData({
        code: '',
        type: 'percent',
        value: '',
        minOrder: '',
        maxDiscount: '',
        quantity: '',
        startDate: '',
        endDate: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingVoucher(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (editingVoucher) {
      setVouchers(prev => prev.map(v =>
        v.id === editingVoucher.id
          ? { ...editingVoucher, ...formData }
          : v
      ));
    } else {
      const newVoucher = {
        id: `VC${String(vouchers.length + 1).padStart(3, '0')}`,
        ...formData,
        used: 0,
        status: 'active',
      };
      setVouchers(prev => [...prev, newVoucher]);
    }
    handleCloseDialog();
  };

  const handleDelete = (voucherId) => {
    setVouchers(prev => prev.filter(v => v.id !== voucherId));
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">
            Quản lý voucher
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Tạo voucher
          </Button>
        </Box>

        {/* Vouchers Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã voucher</TableCell>
                <TableCell>Giá trị</TableCell>
                <TableCell>Đơn tối thiểu</TableCell>
                <TableCell>Giảm tối đa</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Thời gian</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vouchers.map((voucher) => (
                <TableRow key={voucher.id} hover>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {voucher.code}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      #{voucher.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {voucher.type === 'percent' 
                      ? `${voucher.value}%`
                      : `${voucher.value.toLocaleString('vi-VN')}đ`
                    }
                  </TableCell>
                  <TableCell>
                    {voucher.minOrder.toLocaleString('vi-VN')}đ
                  </TableCell>
                  <TableCell>
                    {voucher.maxDiscount.toLocaleString('vi-VN')}đ
                  </TableCell>
                  <TableCell>
                    <Typography>
                      Đã dùng: {voucher.used}/{voucher.quantity}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Còn lại: {voucher.quantity - voucher.used}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(voucher.startDate).toLocaleDateString('vi-VN')}
                    </Typography>
                    <Typography variant="body2">
                      đến {new Date(voucher.endDate).toLocaleDateString('vi-VN')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={voucher.status === 'active' ? 'Đang chạy' : 'Đã kết thúc'}
                      color={voucher.status === 'active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(voucher)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(voucher.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Create/Edit Voucher Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {editingVoucher ? 'Chỉnh sửa voucher' : 'Tạo voucher mới'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mã voucher"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Loại giảm giá</InputLabel>
                  <Select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    label="Loại giảm giá"
                  >
                    <MenuItem value="percent">Phần trăm</MenuItem>
                    <MenuItem value="fixed">Số tiền cố định</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Giá trị"
                  name="value"
                  type="number"
                  value={formData.value}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {formData.type === 'percent' ? '%' : 'đ'}
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Đơn hàng tối thiểu"
                  name="minOrder"
                  type="number"
                  value={formData.minOrder}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">đ</InputAdornment>,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Giảm tối đa"
                  name="maxDiscount"
                  type="number"
                  value={formData.maxDiscount}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">đ</InputAdornment>,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Số lượng"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ngày bắt đầu"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ngày kết thúc"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>
              Hủy
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
            >
              {editingVoucher ? 'Cập nhật' : 'Tạo'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default VouchersPage; 