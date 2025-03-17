import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search,
  Visibility,
  Payment,
  CreditCard,
  AccountBalance,
  LocalAtm,
} from '@mui/icons-material';
import AdminLayout from '../../layouts/AdminLayout';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

const mockPayments = [
  {
    id: 'PAY001',
    orderId: 'ORD001',
    customer: 'Nguyễn Văn A',
    amount: 1500000,
    method: 'credit_card',
    status: 'completed',
    date: '2024-03-15 10:30',
    transactionId: 'TRX123456',
  },
  {
    id: 'PAY002',
    orderId: 'ORD002',
    customer: 'Trần Thị B',
    amount: 2800000,
    method: 'bank_transfer',
    status: 'pending',
    date: '2024-03-15 11:45',
    transactionId: 'TRX123457',
  },
  {
    id: 'PAY003',
    orderId: 'ORD003',
    customer: 'Lê Văn C',
    amount: 950000,
    method: 'cash',
    status: 'completed',
    date: '2024-03-15 14:20',
    transactionId: 'TRX123458',
  },
];

const mockStats = {
  totalRevenue: 5250000,
  totalTransactions: 3,
  averageAmount: 1750000,
  completedPayments: 2,
  pendingPayments: 1,
  methods: {
    creditCard: 1,
    bankTransfer: 1,
    cash: 1,
  },
};

const PaymentsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setViewDialogOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành';
      case 'pending':
        return 'Chờ xử lý';
      case 'failed':
        return 'Thất bại';
      default:
        return status;
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'credit_card':
        return <CreditCard />;
      case 'bank_transfer':
        return <AccountBalance />;
      case 'cash':
        return <LocalAtm />;
      default:
        return <Payment />;
    }
  };

  const getMethodLabel = (method) => {
    switch (method) {
      case 'credit_card':
        return 'Thẻ tín dụng';
      case 'bank_transfer':
        return 'Chuyển khoản';
      case 'cash':
        return 'Tiền mặt';
      default:
        return method;
    }
  };

  return (
    <AdminLayout>
      <Box>
        <Typography variant="h4" gutterBottom>
          Quản lý thanh toán
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Tổng doanh thu
              </Typography>
              <Typography variant="h4">
                {formatCurrency(mockStats.totalRevenue)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Số giao dịch
              </Typography>
              <Typography variant="h4">{mockStats.totalTransactions}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Số tiền trung bình
              </Typography>
              <Typography variant="h4">
                {formatCurrency(mockStats.averageAmount)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Thanh toán hoàn thành
              </Typography>
              <Typography variant="h4">{mockStats.completedPayments}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2, mb: 3 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Tìm kiếm giao dịch..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Paper>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mã giao dịch</TableCell>
                    <TableCell>Đơn hàng</TableCell>
                    <TableCell>Khách hàng</TableCell>
                    <TableCell>Số tiền</TableCell>
                    <TableCell>Phương thức</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell>Ngày</TableCell>
                    <TableCell align="right">Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockPayments
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.id}</TableCell>
                        <TableCell>{payment.orderId}</TableCell>
                        <TableCell>{payment.customer}</TableCell>
                        <TableCell>{formatCurrency(payment.amount)}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {getMethodIcon(payment.method)}
                            <Typography sx={{ ml: 1 }}>
                              {getMethodLabel(payment.method)}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusLabel(payment.status)}
                            color={getStatusColor(payment.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => handleViewDetails(payment)}>
                            <Visibility />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={mockPayments.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Số hàng mỗi trang:"
              labelDisplayedRows={({ from, to, count }) => 
                `${from}-${to} trên ${count}`
              }
            />
          </Grid>
        </Grid>

        <Dialog
          open={viewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Chi tiết giao dịch</DialogTitle>
          <DialogContent>
            {selectedPayment && (
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Mã giao dịch
                    </Typography>
                    <Typography variant="body1">{selectedPayment.id}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Mã đơn hàng
                    </Typography>
                    <Typography variant="body1">{selectedPayment.orderId}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Khách hàng
                    </Typography>
                    <Typography variant="body1">{selectedPayment.customer}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Số tiền
                    </Typography>
                    <Typography variant="body1">
                      {formatCurrency(selectedPayment.amount)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Phương thức
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {getMethodIcon(selectedPayment.method)}
                      <Typography sx={{ ml: 1 }}>
                        {getMethodLabel(selectedPayment.method)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Trạng thái
                    </Typography>
                    <Chip
                      label={getStatusLabel(selectedPayment.status)}
                      color={getStatusColor(selectedPayment.status)}
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Mã giao dịch
                    </Typography>
                    <Typography variant="body1">{selectedPayment.transactionId}</Typography>
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewDialogOpen(false)}>Đóng</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default PaymentsPage; 