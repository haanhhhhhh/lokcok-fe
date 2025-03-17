import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Avatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  Gavel,
  CheckCircle,
  Cancel,
  Warning,
  Assignment,
  Chat,
} from '@mui/icons-material';
import AdminLayout from '../../layouts/AdminLayout';

const mockDisputes = [
  {
    id: 'DISP001',
    orderId: 'ORD001',
    customer: 'Nguyễn Văn A',
    seller: 'Shop Thời Trang A',
    type: 'quality',
    status: 'pending',
    description: 'Sản phẩm không đúng như mô tả, chất lượng kém',
    submittedAt: '2024-03-15',
    messages: [
      {
        sender: 'customer',
        content: 'Tôi đã nhận được sản phẩm nhưng không đúng như mô tả',
        timestamp: '2024-03-15 10:30',
      },
      {
        sender: 'seller',
        content: 'Chúng tôi sẽ kiểm tra và phản hồi sớm nhất',
        timestamp: '2024-03-15 11:00',
      },
    ],
  },
  {
    id: 'DISP002',
    orderId: 'ORD002',
    customer: 'Trần Thị B',
    seller: 'Shop Giày B',
    type: 'shipping',
    status: 'in_progress',
    description: 'Đơn hàng bị giao sai địa chỉ',
    submittedAt: '2024-03-14',
    messages: [
      {
        sender: 'customer',
        content: 'Đơn hàng của tôi bị giao sai địa chỉ',
        timestamp: '2024-03-14 15:45',
      },
    ],
  },
];

const steps = ['Chờ xử lý', 'Đang xử lý', 'Đã giải quyết'];

const DisputesPage = () => {
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [resolveDialogOpen, setResolveDialogOpen] = useState(false);
  const [resolution, setResolution] = useState('');

  const handleResolve = (dispute) => {
    setSelectedDispute(dispute);
    setResolveDialogOpen(true);
  };

  const handleResolveConfirm = () => {
    // Xử lý giải quyết tranh chấp
    console.log('Resolve dispute:', selectedDispute.id, 'Resolution:', resolution);
    setResolveDialogOpen(false);
    setResolution('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'in_progress':
        return 'info';
      case 'resolved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'in_progress':
        return 'Đang xử lý';
      case 'resolved':
        return 'Đã giải quyết';
      case 'rejected':
        return 'Từ chối';
      default:
        return status;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'quality':
        return 'Chất lượng sản phẩm';
      case 'shipping':
        return 'Vấn đề vận chuyển';
      case 'payment':
        return 'Vấn đề thanh toán';
      default:
        return type;
    }
  };

  return (
    <AdminLayout>
      <Box>
        <Typography variant="h4" gutterBottom>
          Xử lý tranh chấp
        </Typography>

        <Grid container spacing={3}>
          {mockDisputes.map((dispute) => (
            <Grid item xs={12} key={dispute.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                      <Typography variant="h6">Tranh chấp #{dispute.id}</Typography>
                      <Typography color="text.secondary">
                        Đơn hàng #{dispute.orderId}
                      </Typography>
                    </Box>
                    <Chip
                      label={getStatusLabel(dispute.status)}
                      color={getStatusColor(dispute.status)}
                      size="small"
                    />
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Khách hàng
                      </Typography>
                      <Typography variant="body1">{dispute.customer}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Người bán
                      </Typography>
                      <Typography variant="body1">{dispute.seller}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Loại tranh chấp
                      </Typography>
                      <Typography variant="body1">{getTypeLabel(dispute.type)}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Mô tả
                      </Typography>
                      <Typography variant="body1">{dispute.description}</Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle2" gutterBottom>
                    Lịch sử trao đổi
                  </Typography>
                  {dispute.messages.map((message, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        mb: 2,
                        flexDirection: message.sender === 'customer' ? 'row' : 'row-reverse',
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: message.sender === 'customer' ? 'primary.main' : 'secondary.main',
                          mr: message.sender === 'customer' ? 1 : 0,
                          ml: message.sender === 'customer' ? 0 : 1,
                        }}
                      >
                        {message.sender === 'customer' ? 'K' : 'S'}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {message.timestamp}
                        </Typography>
                        <Paper
                          sx={{
                            p: 1,
                            bgcolor: message.sender === 'customer' ? 'primary.light' : 'secondary.light',
                            color: message.sender === 'customer' ? 'primary.contrastText' : 'secondary.contrastText',
                          }}
                        >
                          {message.content}
                        </Paper>
                      </Box>
                    </Box>
                  ))}
                </CardContent>

                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button
                    startIcon={<Cancel />}
                    color="error"
                    onClick={() => handleResolve(dispute)}
                  >
                    Từ chối
                  </Button>
                  <Button
                    startIcon={<CheckCircle />}
                    color="success"
                    onClick={() => handleResolve(dispute)}
                  >
                    Giải quyết
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog
          open={resolveDialogOpen}
          onClose={() => setResolveDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Giải quyết tranh chấp</DialogTitle>
          <DialogContent>
            {selectedDispute && (
              <Box>
                <Stepper activeStep={1} sx={{ mb: 3 }}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                <Typography variant="subtitle2" gutterBottom>
                  Giải pháp
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  placeholder="Nhập giải pháp cho tranh chấp..."
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setResolveDialogOpen(false)}>Hủy</Button>
            <Button onClick={handleResolveConfirm} color="primary">
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default DisputesPage; 