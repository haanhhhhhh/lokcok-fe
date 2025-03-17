import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Divider,
  LinearProgress
} from '@mui/material';
import {
  ShoppingCart,
  AttachMoney,
  Visibility,
  LocalOffer,
  Person
} from '@mui/icons-material';

const SellerDashboard = () => {
  const stats = [
    { title: 'Doanh số hôm nay', value: '2,345,000đ', icon: <AttachMoney />, color: '#2196f3' },
    { title: 'Đơn hàng mới', value: '12', icon: <ShoppingCart />, color: '#4caf50' },
    { title: 'Lượt xem Shop', value: '1,234', icon: <Visibility />, color: '#ff9800' },
    { title: 'Followers', value: '45K', icon: <Person />, color: '#e91e63' },
  ];

  const recentOrders = [
    { id: '001', customer: 'Nguyễn Văn A', amount: '450,000đ', status: 'Đang giao' },
    { id: '002', customer: 'Trần Thị B', amount: '850,000đ', status: 'Đã giao' },
    { id: '003', customer: 'Lê Văn C', amount: '1,200,000đ', status: 'Chờ xác nhận' },
  ];

  const topProducts = [
    { name: 'Áo thun Limited', sales: 45, stock: 12 },
    { name: 'Túi xách cao cấp', sales: 38, stock: 5 },
    { name: 'Giày thể thao', sales: 32, stock: 8 },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Xin chào, KOL Anna!
          </Typography>
        </Grid>

        {/* Stats Cards */}
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: stat.color }}>
                    {stat.icon}
                  </Avatar>
                  <Box sx={{ ml: 2 }}>
                    <Typography color="textSecondary" variant="body2">
                      {stat.title}
                    </Typography>
                    <Typography variant="h6">
                      {stat.value}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Recent Orders */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Đơn hàng gần đây
            </Typography>
            <List>
              {recentOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <ListItem>
                    <ListItemText
                      primary={`Đơn hàng #${order.id}`}
                      secondary={`${order.customer} - ${order.amount}`}
                    />
                    <Typography variant="body2" color="textSecondary">
                      {order.status}
                    </Typography>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Button variant="outlined">Xem tất cả đơn hàng</Button>
            </Box>
          </Paper>
        </Grid>

        {/* Top Products */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Sản phẩm bán chạy
            </Typography>
            <List>
              {topProducts.map((product, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <LocalOffer />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={product.name}
                      secondary={`Đã bán: ${product.sales} | Còn lại: ${product.stock}`}
                    />
                    <LinearProgress 
                      variant="determinate" 
                      value={(product.sales / (product.sales + product.stock)) * 100}
                      sx={{ width: 100, ml: 2 }}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Button variant="outlined">Quản lý sản phẩm</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SellerDashboard; 