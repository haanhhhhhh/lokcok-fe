import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box
} from '@mui/material';
import {
  People,
  ShoppingCart,
  AttachMoney,
  Inventory
} from '@mui/icons-material';

const Dashboard = () => {
  const stats = [
    { title: 'Tổng người dùng', value: '1,234', icon: <People /> },
    { title: 'Đơn hàng mới', value: '56', icon: <ShoppingCart /> },
    { title: 'Doanh thu hôm nay', value: '12,345,000đ', icon: <AttachMoney /> },
    { title: 'Sản phẩm chờ duyệt', value: '23', icon: <Inventory /> },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Bảng điều khiển
      </Typography>
      
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {stat.icon}
                  <Box sx={{ ml: 2 }}>
                    <Typography color="textSecondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h5">
                      {stat.value}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Đơn hàng gần đây
            </Typography>
            <List>
              {[1, 2, 3].map((item) => (
                <ListItem key={item}>
                  <ListItemIcon>
                    <ShoppingCart />
                  </ListItemIcon>
                  <ListItemText 
                    primary={`Đơn hàng #${item}000${item}`}
                    secondary={`Khách hàng: Người dùng ${item} - Giá trị: ${item},000,000đ`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              KOL/KOC chờ xác minh
            </Typography>
            <List>
              {[1, 2, 3].map((item) => (
                <ListItem key={item}>
                  <ListItemIcon>
                    <People />
                  </ListItemIcon>
                  <ListItemText 
                    primary={`KOL ${item}`}
                    secondary={`Followers: ${item}0K - Đang chờ xác minh`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 