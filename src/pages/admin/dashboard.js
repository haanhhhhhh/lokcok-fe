import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  LinearProgress,
} from '@mui/material';
import {
  People,
  ShoppingBag,
  TrendingUp,
  Warning,
} from '@mui/icons-material';
import AdminLayout from '../../layouts/AdminLayout';

const StatCard = ({ title, value, icon, color, trend }) => (
  <Paper sx={{ p: 2 }}>
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        sx={{
          bgcolor: `${color}.lighter`,
          borderRadius: 1,
          p: 1,
          display: 'flex',
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography color="text.secondary" variant="body2">
          {title}
        </Typography>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <TrendingUp
            sx={{
              color: trend >= 0 ? 'success.main' : 'error.main',
              fontSize: 16,
            }}
          />
          <Typography
            variant="body2"
            color={trend >= 0 ? 'success.main' : 'error.main'}
          >
            {Math.abs(trend)}% so với tháng trước
          </Typography>
        </Stack>
      </Box>
    </Stack>
  </Paper>
);

const DashboardPage = () => {
  return (
    <AdminLayout>
      <Box>
        <Typography variant="h4" gutterBottom>
          Tổng quan
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Tổng người dùng"
              value="12,345"
              icon={<People sx={{ color: 'primary.main' }} />}
              color="primary"
              trend={12.5}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Đơn hàng mới"
              value="1,234"
              icon={<ShoppingBag sx={{ color: 'success.main' }} />}
              color="success"
              trend={8.2}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Doanh thu"
              value="₫123.4M"
              icon={<TrendingUp sx={{ color: 'warning.main' }} />}
              color="warning"
              trend={15.7}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Tranh chấp"
              value="23"
              icon={<Warning sx={{ color: 'error.main' }} />}
              color="error"
              trend={-5.2}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Doanh thu theo tháng
              </Typography>
              <Box sx={{ height: 300, display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                {[30, 45, 60, 75, 90, 85, 95, 100, 85, 75, 65, 55].map((value, index) => (
                  <Box
                    key={index}
                    sx={{
                      flex: 1,
                      height: `${value}%`,
                      bgcolor: 'primary.main',
                      borderRadius: 1,
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Trạng thái đơn hàng
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">Đang xử lý</Typography>
                    <Typography variant="body2">45%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={45} />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">Đang vận chuyển</Typography>
                    <Typography variant="body2">30%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={30} />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">Đã hoàn thành</Typography>
                    <Typography variant="body2">25%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={25} />
                </Box>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Hoạt động gần đây
              </Typography>
              <Stack spacing={2}>
                {[
                  { text: 'Đơn hàng #1234 đã được thanh toán', time: '5 phút trước' },
                  { text: 'KOL mới đăng ký: Nguyễn Văn A', time: '15 phút trước' },
                  { text: 'Tranh chấp #567 đã được giải quyết', time: '1 giờ trước' },
                  { text: 'Voucher mới được tạo: GIAM20', time: '2 giờ trước' },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 1,
                      borderBottom: index < 3 ? 1 : 0,
                      borderColor: 'divider',
                    }}
                  >
                    <Typography variant="body2">{item.text}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.time}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default DashboardPage; 