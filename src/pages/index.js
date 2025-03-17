import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Rating,
  Stack,
  Avatar,
  Chip,
  IconButton,
} from '@mui/material';
import { Favorite, ShoppingCart } from '@mui/icons-material';
import GuestLayout from '../layouts/GuestLayout';
import BannerSlide from '../components/BannerSlide';

const featuredKOLs = [
  {
    id: 1,
    name: 'Thúy Kiều',
    avatar: '/kol1.jpg',
    category: 'Thời trang',
    followers: '1.2M',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Thúy Vân',
    avatar: '/kol2.jpg',
    category: 'Làm đẹp',
    followers: '800K',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Kim Trọng',
    avatar: '/kol3.jpg',
    category: 'Công nghệ',
    followers: '500K',
    rating: 4.5,
  },
];

const trendingProducts = [
  {
    id: 1,
    name: 'Áo thun basic',
    image: '/product1.jpg',
    price: '199.000đ',
    rating: 4.5,
    reviews: 128,
    kol: 'Thúy Kiều',
  },
  {
    id: 2,
    name: 'Son môi cao cấp',
    image: '/product2.jpg',
    price: '450.000đ',
    rating: 4.8,
    reviews: 256,
    kol: 'Thúy Vân',
  },
  {
    id: 3,
    name: 'Tai nghe không dây',
    image: '/product3.jpg',
    price: '2.990.000đ',
    rating: 4.6,
    reviews: 89,
    kol: 'Kim Trọng',
  },
];

const GuestHome = () => {
  return (
    <GuestLayout>
      <Container maxWidth="lg" sx={{ mt: -2 }}>
        <BannerSlide />
      </Container>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
          borderRadius: 2,
          backgroundImage: 'linear-gradient(45deg, primary.main, primary.dark)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h1" gutterBottom>
                Khám phá thế giới KOL
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.8 }}>
                Mua sắm thông minh với sự tư vấn từ những người có tầm ảnh hưởng hàng đầu
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ mr: 2 }}
              >
                Khám phá ngay
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
              >
                Tìm hiểu thêm
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Hero image placeholder */}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured KOLs Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          KOL nổi bật
        </Typography>
        <Grid container spacing={4}>
          {featuredKOLs.map((kol) => (
            <Grid item xs={12} sm={6} md={4} key={kol.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                }}
              >
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Avatar
                    src={kol.avatar}
                    alt={kol.name}
                    sx={{
                      width: 120,
                      height: 120,
                      mx: 'auto',
                      mb: 2,
                      border: 3,
                      borderColor: 'secondary.main',
                    }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {kol.name}
                  </Typography>
                  <Chip
                    label={kol.category}
                    color="secondary"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                    sx={{ mb: 2 }}
                  >
                    <Rating value={kol.rating} precision={0.1} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary">
                      ({kol.rating})
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {kol.followers} người theo dõi
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Trending Products Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Sản phẩm thịnh hành
        </Typography>
        <Grid container spacing={4}>
          {trendingProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h3">
                    {product.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    {product.price}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Rating value={product.rating} precision={0.1} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary">
                      ({product.reviews})
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Được giới thiệu bởi {product.kol}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<ShoppingCart />}
                    sx={{ mb: 1 }}
                  >
                    Thêm vào giỏ
                  </Button>
                  <IconButton
                    color="secondary"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'white',
                      '&:hover': { bgcolor: 'white' },
                    }}
                  >
                    <Favorite />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </GuestLayout>
  );
};

export default GuestHome; 