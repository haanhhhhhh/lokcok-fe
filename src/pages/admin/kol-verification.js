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
} from '@mui/material';
import {
  VerifiedUser,
  CheckCircle,
  Cancel,
  Instagram,
  Facebook,
  YouTube,
  Twitter,
} from '@mui/icons-material';
import AdminLayout from '../../layouts/AdminLayout';

const mockVerificationRequests = [
  {
    id: 1,
    name: 'Nguyễn Thị A',
    email: 'nguyenthi.a@example.com',
    type: 'kol',
    followers: {
      instagram: 50000,
      facebook: 30000,
      youtube: 20000,
    },
    description: 'Chuyên gia về thời trang và làm đẹp với 5 năm kinh nghiệm',
    status: 'pending',
    submittedAt: '2024-03-15',
  },
  {
    id: 2,
    name: 'Trần Văn B',
    email: 'tranvan.b@example.com',
    type: 'koc',
    followers: {
      instagram: 15000,
      facebook: 10000,
      youtube: 5000,
    },
    description: 'Content creator về ẩm thực và du lịch',
    status: 'pending',
    submittedAt: '2024-03-14',
  },
];

const KolVerificationPage = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const handleApprove = (request) => {
    // Xử lý phê duyệt
    console.log('Approve request:', request.id);
  };

  const handleReject = (request) => {
    setSelectedRequest(request);
    setRejectDialogOpen(true);
  };

  const handleRejectConfirm = () => {
    // Xử lý từ chối với lý do
    console.log('Reject request:', selectedRequest.id, 'Reason:', rejectReason);
    setRejectDialogOpen(false);
    setRejectReason('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <AdminLayout>
      <Box>
        <Typography variant="h4" gutterBottom>
          Xác minh KOL/KOC
        </Typography>

        <Grid container spacing={3}>
          {mockVerificationRequests.map((request) => (
            <Grid item xs={12} md={6} key={request.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ width: 56, height: 56, mr: 2 }} />
                    <Box>
                      <Typography variant="h6">{request.name}</Typography>
                      <Typography color="text.secondary">{request.email}</Typography>
                    </Box>
                  </Box>

                  <Chip
                    label={request.type.toUpperCase()}
                    color="primary"
                    size="small"
                    sx={{ mb: 2 }}
                  />

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {request.description}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle2" gutterBottom>
                    Số lượng người theo dõi:
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Instagram sx={{ mr: 1, color: '#E4405F' }} />
                        <Typography variant="body2">
                          {request.followers.instagram.toLocaleString()}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Facebook sx={{ mr: 1, color: '#1877F2' }} />
                        <Typography variant="body2">
                          {request.followers.facebook.toLocaleString()}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <YouTube sx={{ mr: 1, color: '#FF0000' }} />
                        <Typography variant="body2">
                          {request.followers.youtube.toLocaleString()}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>

                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button
                    startIcon={<Cancel />}
                    color="error"
                    onClick={() => handleReject(request)}
                  >
                    Từ chối
                  </Button>
                  <Button
                    startIcon={<CheckCircle />}
                    color="success"
                    onClick={() => handleApprove(request)}
                  >
                    Phê duyệt
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)}>
          <DialogTitle>Từ chối yêu cầu xác minh</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Lý do từ chối"
              fullWidth
              multiline
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setRejectDialogOpen(false)}>Hủy</Button>
            <Button onClick={handleRejectConfirm} color="error">
              Xác nhận từ chối
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default KolVerificationPage; 