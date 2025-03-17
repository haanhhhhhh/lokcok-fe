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
  Tabs,
  Tab,
} from '@mui/material';
import { Favorite, ShoppingCart, TrendingUp, NewReleases, LocalOffer } from '@mui/icons-material';
import ClientLayout from '../layouts/ClientLayout';
import BannerSlide from '../components/BannerSlide';

const recommendedProducts = [
  {
    id: 1,
    name: 'Áo khoác denim',
    image: '/product4.jpg',
    price: '899.000đ',
    rating: 4.7,
    reviews: 156,
    kol: 'Thúy Kiều',
    discount: '15%',
  },
  {
    id: 2,
    name: 'Kem dưỡng da cao cấp',
    image: '/product5.jpg',
    price: '1.290.000đ',
    rating: 4.9,
    reviews: 203,
    kol: 'Thúy Vân',
    discount: '20%',
  },
  {
    id: 3,
    name: 'Smartwatch thể thao',
    image: '/product6.jpg',
    price: '3.490.000đ',
    rating: 4.8,
    reviews: 178,
    kol: 'Kim Trọng',
    discount: '10%',
  },
];

const followingKOLs = [
  {
    id: 1,
    name: 'Thúy Kiều',
    avatar: '/kol1.jpg',
    category: 'Thời trang',
    newPosts: 3,
    isLive: true,
  },
  {
    id: 2,
    name: 'Thúy Vân',
    avatar: '/kol2.jpg',
    category: 'Làm đẹp',
    newPosts: 5,
  },
  {
    id: 3,
    name: 'Kim Trọng',
    avatar: '/kol3.jpg',
    category: 'Công nghệ',
    newPosts: 2,
    isLive: true,
  },
];

const ClientHome = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ClientLayout>
      <Container maxWidth="lg" sx={{ mt: -2 }}>
        <BannerSlide />
      </Container>
      {/* Welcome Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 6,
          mb: 6,
          borderRadius: 2,
          backgroundImage: 'linear-gradient(45deg, primary.main, primary.dark)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                Chào mừng trở lại, Nguyễn Văn A!
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.8, mb: 3 }}>
                Có 5 KOL bạn theo dõi vừa đăng sản phẩm mới
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
              >
                Xem ngay
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Following KOLs Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          KOL bạn đang theo dõi
        </Typography>
        <Grid container spacing={2}>
          {followingKOLs.map((kol) => (
            <Grid item xs={12} sm={6} md={4} key={kol.id}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    src={kol.avatar}
                    alt={kol.name}
                    sx={{ width: 60, height: 60 }}
                  />
                  {kol.isLive && (
                    <Chip
                      label="LIVE"
                      color="error"
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: -8,
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    />
                  )}
                </Box>
                <Box sx={{ ml: 2, flexGrow: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {kol.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {kol.category}
                  </Typography>
                  {kol.newPosts > 0 && (
                    <Typography variant="body2" color="primary">
                      {kol.newPosts} bài đăng mới
                    </Typography>
                  )}
                </Box>
                <Button variant="outlined" size="small">
                  Xem trang
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Products Tabs Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ mb: 4 }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<TrendingUp />} label="Đề xuất cho bạn" />
          <Tab icon={<NewReleases />} label="Sản phẩm mới" />
          <Tab icon={<LocalOffer />} label="Đang giảm giá" />
          <Tab icon={<Favorite />} label="Yêu thích" />
        </Tabs>

        <Grid container spacing={4}>
          {recommendedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                }}
              >
                {product.discount && (
                  <Chip
                    label={`-${product.discount}`}
                    color="error"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      zIndex: 1,
                    }}
                  />
                )}
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
    </ClientLayout>
  );
};

export default ClientHome; 