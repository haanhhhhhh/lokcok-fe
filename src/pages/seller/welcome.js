import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';

const SellerWelcomePage = () => {
  const router = useRouter();

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#f5f5f5',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          py: 1.5,
          borderBottom: '1px solid rgba(0,0,0,0.1)',
        }}
      >
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              color: 'white',
              fontWeight: 'bold',
              mr: 1,
            }}
          >
            <Box 
              component="img" 
              src="/favicon.ico" 
              alt="Logo" 
              sx={{ 
                width: 32, 
                height: 32, 
                mr: 1,
                display: { xs: 'none', sm: 'block' },
              }} 
            />
            LokCok
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'white',
              opacity: 0.9,
              borderLeft: { xs: 'none', sm: '1px solid rgba(255,255,255,0.5)' },
              pl: { xs: 0, sm: 2 },
            }}
          >
            Đăng ký trở thành Người bán LokCok
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container 
        component="main" 
        maxWidth="md" 
        sx={{ 
          py: { xs: 4, md: 8 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper 
          elevation={0} 
          sx={{ 
            width: '100%',
            p: { xs: 3, md: 6 },
            textAlign: 'center',
            borderRadius: 2,
          }}
        >
          <Box 
            sx={{ 
              width: { xs: 180, md: 240 }, 
              height: { xs: 180, md: 240 }, 
              mx: 'auto',
              mb: 4,
              position: 'relative',
            }}
          >
            <Box 
              component="img"
              src="/shop-register.png"
              alt="Shop Registration"
              onError={(e) => {
                // Fallback if image doesn't exist
                e.target.src = 'https://placehold.co/240x240?text=Shop+Registration';
              }}
              sx={{ 
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>
          
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Chào mừng đến với LokCok!
          </Typography>
          
          <Typography sx={{ mb: 4, color: 'text.secondary' }}>
            Vui lòng cung cấp thông tin để thiết lập tài khoản người bán trên LokCok
          </Typography>
          
          <Button 
            variant="contained" 
            size="large"
            onClick={() => router.push('/seller/register')}
            sx={{ 
              minWidth: 200,
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '1rem',
              borderRadius: 1,
            }}
          >
            Bắt đầu đăng ký
          </Button>
        </Paper>
      </Container>
      
      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          py: 2,
          bgcolor: '#fff',
          textAlign: 'center',
          borderTop: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary">
            © 2024 LokCok. Tất cả các quyền được bảo lưu.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default SellerWelcomePage; 