import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useRouter } from 'next/router';

const SellerRegisterSuccessPage = () => {
  const router = useRouter();

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#f5f5f5',
      display: 'flex',
      flexDirection: 'column',
      py: 4
    }}>
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Đăng ký thành công!
          </Typography>
          <Typography color="text.secondary" paragraph>
            Cảm ơn bạn đã đăng ký trở thành Người bán LokCok. Chúng tôi sẽ xem xét hồ sơ của bạn và phản hồi trong vòng 3-5 ngày làm việc.
          </Typography>
          <Typography color="text.secondary" paragraph>
            Trong thời gian chờ duyệt, bạn có thể chuẩn bị các sản phẩm để đăng bán trên LokCok.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push('/seller/dashboard')}
              sx={{ minWidth: 200 }}
            >
              Vào Kênh người bán
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SellerRegisterSuccessPage; 