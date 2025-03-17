import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import {
  TrendingUp,
  ShoppingBag,
  People,
  Star,
} from '@mui/icons-material';
import AdminLayout from '../../layouts/AdminLayout';

const mockData = {
  revenue: {
    total: 125000000,
    growth: 15.5,
    monthly: [
      { month: 'T1', value: 10000000 },
      { month: 'T2', value: 15000000 },
      { month: 'T3', value: 20000000 },
      { month: 'T4', value: 25000000 },
      { month: 'T5', value: 30000000 },
      { month: 'T6', value: 35000000 },
    ],
  },
  orders: {
    total: 1250,
    growth: 8.2,
    status: [
      { label: 'Hoàn thành', value: 75 },
      { label: 'Đang xử lý', value: 15 },
      { label: 'Đã hủy', value: 10 },
    ],
  },
  customers: {
    total: 8500,
    growth: 12.3,
    new: 450,
    returning: 8050,
  },
  products: {
    total: 2500,
    rating: 4.5,
    categories: [
      { label: 'Thời trang', value: 40 },
      { label: 'Điện tử', value: 30 },
      { label: 'Nhà cửa', value: 20 },
      { label: 'Khác', value: 10 },
    ],
  },
};

const AnalyticsPage = () => {
  return (
    <AdminLayout>
      <Box>
        <Typography variant="h4" gutterBottom>
          Phân tích dữ liệu
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingUp sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="h6">Doanh thu</Typography>
                </Box>
                <Typography variant="h4" gutterBottom>
                  ₫{mockData.revenue.total.toLocaleString()}
                </Typography>
                <Typography color="success.main" variant="body2">
                  +{mockData.revenue.growth}% so với tháng trước
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ShoppingBag sx={{ color: 'success.main', mr: 1 }} />
                  <Typography variant="h6">Đơn hàng</Typography>
                </Box>
                <Typography variant="h4" gutterBottom>
                  {mockData.orders.total}
                </Typography>
                <Typography color="success.main" variant="body2">
                  +{mockData.orders.growth}% so với tháng trước
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <People sx={{ color: 'info.main', mr: 1 }} />
                  <Typography variant="h6">Khách hàng</Typography>
                </Box>
                <Typography variant="h4" gutterBottom>
                  {mockData.customers.total}
                </Typography>
                <Typography color="success.main" variant="body2">
                  +{mockData.customers.growth}% so với tháng trước
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Star sx={{ color: 'warning.main', mr: 1 }} />
                  <Typography variant="h6">Đánh giá</Typography>
                </Box>
                <Typography variant="h4" gutterBottom>
                  {mockData.products.rating}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  Trung bình đánh giá sản phẩm
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Doanh thu theo tháng
              </Typography>
              <Box sx={{ height: 300, display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                {mockData.revenue.monthly.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      flex: 1,
                      height: `${(item.value / mockData.revenue.monthly[5].value) * 100}%`,
                      bgcolor: 'primary.main',
                      borderRadius: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      p: 1,
                    }}
                  >
                    <Typography variant="caption" color="white">
                      ₫{(item.value / 1000000).toFixed(1)}M
                    </Typography>
                    <Typography variant="caption" color="white">
                      {item.month}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Trạng thái đơn hàng
              </Typography>
              {mockData.orders.status.map((status, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">{status.label}</Typography>
                    <Typography variant="body2">{status.value}%</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={status.value}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              ))}
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Phân bố sản phẩm theo danh mục
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {mockData.products.categories.map((category, index) => (
                  <Box
                    key={index}
                    sx={{
                      flex: category.value,
                      height: 100,
                      bgcolor: `primary.${index % 3 === 0 ? 'main' : index % 3 === 1 ? 'light' : 'lighter'}`,
                      borderRadius: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="body2" color="white">
                      {category.label}
                    </Typography>
                    <Typography variant="h6" color="white">
                      {category.value}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default AnalyticsPage; 