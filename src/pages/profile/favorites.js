import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardMedia,
  CardContent,
  Button,
  Avatar,
  Rating,
  IconButton,
  Stack,
} from '@mui/material';
import {
  Person,
  ShoppingBag,
  Notifications,
  Favorite,
  LocalOffer,
  ShoppingCart,
  Delete,
} from '@mui/icons-material';
import ClientLayout from '../../layouts/ClientLayout';

const menuItems = [
  { icon: <Person />, text: 'Hồ sơ', path: '/profile' },
  { icon: <ShoppingBag />, text: 'Đơn mua', path: '/profile/orders' },
  { icon: <Notifications />, text: 'Thông báo', path: '/profile/notifications' },
  { icon: <Favorite />, text: 'Yêu thích', path: '/profile/favorites' },
  { icon: <LocalOffer />, text: 'Kho voucher', path: '/profile/vouchers' },
];

const favoriteProducts = [
  {
    id: 1,
    name: 'Áo thun basic',
    image: '/product1.jpg',
    price: '199.000đ',
    originalPrice: '299.000đ',
    discount: '33%',
    rating: 4.5,
    reviews: 128,
    seller: 'Shop ABC',
  },
  {
    id: 2,
    name: 'Quần jean nam',
    image: '/product2.jpg',
    price: '450.000đ',
    originalPrice: '599.000đ',
    discount: '25%',
    rating: 4.8,
    reviews: 256,
    seller: 'Shop XYZ',
  },
  {
    id: 3,
    name: 'Giày thể thao',
    image: '/product3.jpg',
    price: '799.000đ',
    originalPrice: '999.000đ',
    discount: '20%',
    rating: 4.7,
    reviews: 189,
    seller: 'Shop DEF',
  },
];

const FavoritesPage = () => {
  const [products, setProducts] = useState(favoriteProducts);

  const handleRemove = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <ClientLayout>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {/* Left Sidebar */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                mb: 2,
                pb: 2,
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}>
                <Avatar
                  src="/avatar-placeholder.jpg"
                  sx={{ width: 50, height: 50 }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Nguyễn Văn A
                  </Typography>
                </Box>
              </Box>
              <List>
                {menuItems.map((item, index) => (
                  <ListItem
                    key={index}
                    button
                    selected={index === 3}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      '&.Mui-selected': {
                        bgcolor: 'primary.lighter',
                        color: 'primary.main',
                        '& .MuiListItemIcon-root': {
                          color: 'primary.main',
                        },
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Sản phẩm yêu thích ({products.length})
              </Typography>

              {products.length === 0 ? (
                <Box
                  sx={{
                    py: 8,
                    textAlign: 'center',
                  }}
                >
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    Chưa có sản phẩm nào trong danh sách yêu thích
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: 'none' }}
                  >
                    Tiếp tục mua sắm
                  </Button>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'relative',
                          '&:hover': {
                            boxShadow: 6,
                          },
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => handleRemove(product.id)}
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: 'background.paper',
                            boxShadow: 1,
                            '&:hover': {
                              bgcolor: 'background.paper',
                              color: 'error.main',
                            },
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                        {product.discount && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 8,
                              left: 8,
                              bgcolor: 'error.main',
                              color: 'white',
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              fontSize: '0.75rem',
                            }}
                          >
                            -{product.discount}
                          </Box>
                        )}
                        <CardMedia
                          component="img"
                          height="200"
                          image={product.image}
                          alt={product.name}
                          sx={{
                            objectFit: 'cover',
                          }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              mb: 1,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              height: 40,
                            }}
                          >
                            {product.name}
                          </Typography>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <Typography color="primary.main" sx={{ fontWeight: 600 }}>
                              {product.price}
                            </Typography>
                            {product.originalPrice && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ textDecoration: 'line-through' }}
                              >
                                {product.originalPrice}
                              </Typography>
                            )}
                          </Stack>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <Rating value={product.rating} precision={0.1} readOnly size="small" />
                            <Typography variant="body2" color="text.secondary">
                              ({product.reviews})
                            </Typography>
                          </Stack>
                          <Typography variant="body2" color="text.secondary">
                            {product.seller}
                          </Typography>
                        </CardContent>
                        <Box sx={{ p: 2, pt: 0 }}>
                          <Button
                            variant="contained"
                            fullWidth
                            startIcon={<ShoppingCart />}
                            sx={{ textTransform: 'none' }}
                          >
                            Thêm vào giỏ
                          </Button>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ClientLayout>
  );
};

export default FavoritesPage; 