import React from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  InputBase,
  Paper,
  Chip,
  Avatar,
  Rating
} from '@mui/material';
import {
  Search,
  ShoppingCart,
  Favorite,
  LocalOffer,
  VerifiedUser
} from '@mui/icons-material';

const HomePage = () => {
  const featuredKOLs = [
    {
      name: 'Anna Trương',
      avatar: 'https://placeholder.com/150',
      followers: '500K',
      category: 'Fashion'
    },
    {
      name: 'Minh Hằng',
      avatar: 'https://placeholder.com/150',
      followers: '300K',
      category: 'Beauty'
    },
  ];

  const products = [
    {
      id: 1,
      name: 'Áo thun Limited Edition',
      image: 'https://i.pinimg.com/474x/1c/ee/a3/1ceea3ba63f2ac456b436991f2f0d5f9.jpg://placeholder.com/300',
      price: '599,000đ',
      seller: 'Anna Trương',
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      name: 'Túi xách cao cấp',
      image: 'https://placeholder.com/300',
      price: '1,299,000đ',
      seller: 'Minh Hằng',
      rating: 4.8,
      reviews: 256
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 4
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom>
                Mua sắm trực tiếp từ KOL yêu thích
              </Typography>
              <Typography variant="h6" paragraph>
                Khám phá bộ sưu tập độc quyền từ những người có ảnh hưởng hàng đầu
              </Typography>
              <Paper
                component="form"
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  width: 400,
                  bgcolor: 'white'
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Tìm kiếm sản phẩm hoặc KOL..."
                />
                <IconButton type="submit" sx={{ p: '10px' }}>
                  <Search />
                </IconButton>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured KOLs */}
      <Container maxWidth="lg">
        <Typography variant="h5" gutterBottom>
          KOL Nổi bật
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {featuredKOLs.map((kol, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={kol.avatar}
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6">
                        {kol.name}
                        <VerifiedUser
                          sx={{ width: 16, height: 16, ml: 1, color: 'primary.main' }}
                        />
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {kol.followers} followers
                      </Typography>
                    </Box>
                  </Box>
                  <Chip label={kol.category} size="small" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Products */}
        <Typography variant="h5" gutterBottom>
          Sản phẩm nổi bật
        </Typography>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Bởi {product.seller}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Rating value={product.rating} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({product.reviews})
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    {product.price}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      size="small"
                    >
                      Thêm vào giỏ
                    </Button>
                    <IconButton size="small" color="primary">
                      <Favorite />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage; 