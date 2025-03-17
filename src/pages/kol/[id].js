import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Rating,
  TextField,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Share,
  Comment,
  ShoppingCart,
  Facebook,
  Instagram,
  YouTube,
  Twitter,
} from '@mui/icons-material';
import ClientLayout from '../../layouts/ClientLayout';
import Link from 'next/link';

// Mock data cho sản phẩm
const products = [
  {
    id: 1,
    name: 'Áo thun basic',
    image: '/product1.jpg',
    price: 199000,
    originalPrice: 299000,
    sold: 1200,
  },
  {
    id: 2,
    name: 'Đôi guột chuột sừng unicorn',
    image: '/product2.jpg',
    price: 399000,
    originalPrice: 499000,
    sold: 800,
  },
  {
    id: 3,
    name: 'Quần jean nam',
    image: '/product3.jpg',
    price: 399000,
    originalPrice: 499000,
    sold: 800,
  },

  {
    id: 4,
    name: 'Dép chân vàng 24k nghệ thuật ',
    image: '/product4.jpg',
    price: 399000,
    originalPrice: 499000,
    sold: 800,
  },
  {
    id: 5,
    name: 'Mũ bảo hiểm chân thật ',
    image: '/product5.jpg',
    price: 199000,
    originalPrice: 299000,
    sold: 1200,
  },
  {
    id: 6,
    name: 'mlem',
    image: '/product6.jpg',
    price: 399000,
    originalPrice: 499000,
    sold: 800,
  },
  {
    id: 7,
    name: 'áo thun cute',
    image: '/product7.jpg',
    price: 399000,
    originalPrice: 499000,
    sold: 800,
  },

  {
    id: 8,
    name: 'balo đi học cho bé ',
    image: '/product8.jpg',
    price: 399000,
    originalPrice: 499000,
    sold: 800,
  },
  
  // Thêm các sản phẩm khác...
];

// Mock data cho bài viết
const posts = [
  {
    id: 1,
    content: 'Đố ai đếm được lá rừng, đố ai khuyên được em ngừng yêu anh! 😍',
    images: ['/post1.jpg', ],
    likes: 1200,
    comments: 45,
    createdAt: '2024-03-17T10:00:00Z',
  },
  {
    id: 2,
    content: 'Gió đưa cành trúc la đà, anh thương người khác chắc là quên em ✨',
    images: ['/post3.jpg'],
    likes: 800,
    comments: 32,
    createdAt: '2024-03-16T15:30:00Z',
  },
  {
    id: 3,
    content: 'Đố ai đếm được lá rừng, đố ai khuyên được em ngừng yêu anh! 😍',
    images: ['/post3.jpg', ],
    likes: 1200,
    comments: 45,
    createdAt: '2024-03-17T10:00:00Z',
  },
  {
    id: 4,
    content: 'Đố ai đếm được lá rừng, đố ai khuyên được em ngừng yêu anh! 😍',
    images: ['/post4.jpg', ],
    likes: 1200,
    comments: 45,
    createdAt: '2024-03-17T10:00:00Z',
  },
  {
    id: 5,
    content: 'Đố ai đếm được lá rừng, đố ai khuyên được em ngừng yêu anh! 😍',
    images: ['/post5.jpg', ],
    likes: 1200,
    comments: 45,
    createdAt: '2024-03-17T10:00:00Z',
  },
  {
    id: 6,
    content: 'Đố ai đếm được lá rừng, đố ai khuyên được em ngừng yêu anh! 😍',
    images: ['/post6.jpg', ],
    likes: 1200,
    comments: 45,
    createdAt: '2024-03-17T10:00:00Z',
  },
  {
    id: 7,
    content: 'Đố ai đếm được lá rừng, đố ai khuyên được em ngừng yêu anh! 😍',
    images: ['/post7.jpg', ],
    likes: 1200,
    comments: 45,
    createdAt: '2024-03-17T10:00:00Z',
  },
  {
    id: 8,
    content: 'Đố ai đếm được lá rừng, đố ai khuyên được em ngừng yêu anh! 😍',
    images: ['/post8.jpg', ],
    likes: 1200,
    comments: 45,
    createdAt: '2024-03-17T10:00:00Z',
  },
  
  // Thêm các bài viết khác...
];

// Component hiển thị sản phẩm
const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <Card sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 3
      }
    }}>
      <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', flex: 1 }}>
        <Box sx={{ 
          position: 'relative',
          width: '100%',
          paddingTop: '100%', // Tạo tỷ lệ khung hình 1:1
          overflow: 'hidden'
        }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.2s'
            }}
          />
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'white',
              '&:hover': { bgcolor: 'grey.100' },
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLiked(!liked);
            }}
          >
            {liked ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
        </Box>
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              mb: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              height: '2.5em'
            }}
          >
            {product.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
            <Typography variant="h6" color="error.main">
              {formatPrice(product.price)}
            </Typography>
            {product.originalPrice && (
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                {formatPrice(product.originalPrice)}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating value={product.rating} precision={0.1} readOnly size="small" />
            <Typography variant="body2" color="text.secondary">
              ({product.sold} đã bán)
            </Typography>
          </Box>
        </CardContent>
      </Link>
    </Card>
  );
};

// Component hiển thị bài viết
const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {post.content}
        </Typography>
        <Grid container spacing={1}>
          {post.images.map((image, index) => (
            <Grid item xs={6} key={index}>
              <img
                src={image}
                alt={`Post ${index + 1}`}
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            startIcon={liked ? <Favorite color="error" /> : <FavoriteBorder />}
            onClick={() => setLiked(!liked)}
            sx={{ textTransform: 'none' }}
          >
            {post.likes} Thích
          </Button>
          <Button
            startIcon={<Comment />}
            sx={{ textTransform: 'none' }}
          >
            {post.comments} Bình luận
          </Button>
          <Button
            startIcon={<Share />}
            sx={{ textTransform: 'none' }}
          >
            Chia sẻ
          </Button>
        </Box>
        <Typography variant="caption" color="text.secondary">
          {formatDate(post.createdAt)}
        </Typography>
      </CardActions>
      <Divider />
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Viết bình luận..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          InputProps={{
            endAdornment: (
              <Button
                variant="contained"
                size="small"
                sx={{ textTransform: 'none' }}
                disabled={!comment}
              >
                Đăng
              </Button>
            ),
          }}
        />
      </Box>
    </Card>
  );
};

const KolProfilePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [following, setFollowing] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <ClientLayout>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* KOL Header */}
        <Paper sx={{ mb: 3, overflow: 'hidden' }}>
          {/* Cover Image */}
          <Box
            sx={{
              height: 200,
              bgcolor: 'grey.200',
              position: 'relative',
            }}
          >
            <img
              src="/cover-image.jpg"
              alt="Cover"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>

          {/* Profile Info */}
          <Box sx={{ p: 3, pb: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Avatar
                    src="/kol-avatar.jpg"
                    sx={{
                      width: 120,
                      height: 120,
                      border: '4px solid white',
                      marginTop: '-60px',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  />
                  <Box>
                    <Typography variant="h5" sx={{ mb: 1 }}>
                      Thúy Kiều
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                      <Typography variant="body2">
                        <strong>100K</strong> Người theo dõi
                      </Typography>
                      <Typography variant="body2">
                        <strong>50</strong> Sản phẩm
                      </Typography>
                      <Typography variant="body2">
                        <strong>4.8</strong>
                        <Rating value={4.8} readOnly size="small" sx={{ ml: 0.5 }} />
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Beauty Blogger | Fashion Influencer | Lifestyle Creator
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <IconButton size="small" color="primary">
                        <Facebook />
                      </IconButton>
                      <IconButton size="small" color="primary">
                        <Instagram />
                      </IconButton>
                      <IconButton size="small" color="primary">
                        <YouTube />
                      </IconButton>
                      <IconButton size="small" color="primary">
                        <Twitter />
                      </IconButton>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                <Button
                  variant={following ? "outlined" : "contained"}
                  color="primary"
                  onClick={() => setFollowing(!following)}
                  sx={{ textTransform: 'none', minWidth: 120 }}
                >
                  {following ? 'Đang theo dõi' : 'Theo dõi'}
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              px: 3,
            }}
          >
            <Tab label="Sản phẩm" sx={{ textTransform: 'none' }} />
            <Tab label="Bài viết" sx={{ textTransform: 'none' }} />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        <Box sx={{ mt: 3 }}>
          {activeTab === 0 ? (
            // Products Grid
            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          ) : (
            // Posts List
            <Box>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </ClientLayout>
  );
};

export default KolProfilePage; 