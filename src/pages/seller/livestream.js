import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  TextField,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import {
  Videocam,
  VideocamOff,
  Send,
  Mic,
  MicOff,
  ArrowBack,
  ShoppingCart,
  Add,
  Settings,
  Share,
  MoreVert,
  Favorite,
  AddShoppingCart,
  ChatBubbleOutline,
  PeopleOutline,
} from '@mui/icons-material';
import { useRouter } from 'next/router';

const mockProducts = [
  {
    id: 1,
    name: 'Áo thun Oversize Logo',
    price: 350000,
    image: '/product1.jpg',
    stock: 25,
  },
  {
    id: 2,
    name: 'Quần jean Slim fit',
    price: 650000,
    image: '/product2.jpg',
    stock: 15,
  },
  {
    id: 3,
    name: 'Túi xách thời trang',
    price: 450000,
    image: '/product3.jpg',
    stock: 10,
  },
  {
    id: 4,
    name: 'Giày sneaker trắng',
    price: 850000,
    image: '/product4.jpg',
    stock: 8,
  },
];

const mockComments = [
  { id: 1, user: 'Nguyễn Văn A', avatar: '/avatar1.jpg', text: 'Sản phẩm này có màu xanh không ạ?', time: '2 phút trước' },
  { id: 2, user: 'Trần Thị B', avatar: '/avatar2.jpg', text: 'Đẹp quá chị ơi', time: '1 phút trước' },
  { id: 3, user: 'Lê Văn C', avatar: '/avatar3.jpg', text: 'Mình vừa đặt hàng rồi đó', time: '45 giây trước' },
  { id: 4, user: 'Phạm Thị D', avatar: '/avatar4.jpg', text: 'Cho mình hỏi ship về tỉnh mất mấy ngày ạ?', time: '30 giây trước' },
  { id: 5, user: 'Hoàng Văn E', avatar: '/avatar5.jpg', text: '❤️❤️❤️', time: '10 giây trước' },
];

const LivestreamPage = () => {
  const router = useRouter();
  const [isLive, setIsLive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState(mockComments);
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const [openProductDialog, setOpenProductDialog] = useState(false);

  const handleStartLive = () => {
    setIsLive(true);
  };

  const handleEndLive = () => {
    setIsLive(false);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleGoBack = () => {
    router.push('/seller/dashboard');
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newComment = {
        id: comments.length + 1,
        user: 'Thúy Kiều (Admin)',
        avatar: '/avatar-placeholder.jpg',
        text: message,
        time: 'Bây giờ',
      };
      setComments([...comments, newComment]);
      setMessage('');
    }
  };

  const handleFeatureProduct = (product) => {
    setFeaturedProduct(product);
    setOpenProductDialog(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      <Box sx={{ bgcolor: 'white', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', p: 2 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={handleGoBack} sx={{ mr: 1 }}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {isLive ? 'Đang phát trực tiếp' : 'Thiết lập livestream'}
              </Typography>
              {isLive && (
                <Chip 
                  label="TRỰC TIẾP" 
                  color="error" 
                  size="small" 
                  sx={{ ml: 1, fontWeight: 'bold', px: 1, py: 0.5 }}
                />
              )}
            </Box>
            <Box>
              {isLive ? (
                <Button 
                  variant="contained" 
                  color="error" 
                  startIcon={<VideocamOff />}
                  onClick={handleEndLive}
                >
                  Kết thúc
                </Button>
              ) : (
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<Videocam />}
                  onClick={handleStartLive}
                >
                  Bắt đầu phát
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
        <Grid container spacing={3}>
          {/* Livestream video area */}
          <Grid item xs={12} md={8}>
            <Paper 
              sx={{ 
                height: 500, 
                bgcolor: isLive ? 'black' : 'grey.900',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                overflow: 'hidden',
              }}
            >
              {isLive ? (
                <>
                  {/* Livestream content would go here - simplified for demo */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bgcolor: 'grey.800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h5">Camera Preview</Typography>
                  </Box>
                  
                  {/* Overlays */}
                  <Box 
                    sx={{ 
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Avatar 
                      src="/avatar-placeholder.jpg" 
                      sx={{ width: 40, height: 40, border: '2px solid white' }}
                    />
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Thúy Kiều Shop
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PeopleOutline fontSize="small" />
                          <Typography variant="caption" sx={{ ml: 0.5 }}>
                            352
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Favorite fontSize="small" />
                          <Typography variant="caption" sx={{ ml: 0.5 }}>
                            1.2k
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  
                  {/* Control buttons */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      left: 16,
                    }}
                  >
                    <IconButton onClick={handleToggleMute} color="inherit">
                      {isMuted ? <MicOff /> : <Mic />}
                    </IconButton>
                    <IconButton color="inherit">
                      <Settings />
                    </IconButton>
                    <IconButton color="inherit">
                      <Share />
                    </IconButton>
                  </Box>
                  
                  {/* Featured product */}
                  {featuredProduct && (
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        width: 300,
                        bgcolor: 'rgba(0,0,0,0.7)',
                        borderRadius: 1,
                        p: 1,
                      }}
                    >
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: 1,
                            overflow: 'hidden',
                            bgcolor: 'grey.100',
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={featuredProduct.image}
                            alt={featuredProduct.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.src = 'https://placehold.co/60x60?text=Product';
                            }}
                          />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" noWrap>
                            {featuredProduct.name}
                          </Typography>
                          <Typography variant="subtitle2" color="primary.main" sx={{ fontWeight: 'bold' }}>
                            {formatPrice(featuredProduct.price)}
                          </Typography>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<AddShoppingCart />}
                            sx={{ mt: 0.5 }}
                          >
                            Mua ngay
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </>
              ) : (
                <Box sx={{ textAlign: 'center' }}>
                  <Videocam sx={{ fontSize: 48, mb: 2, opacity: 0.7 }} />
                  <Typography variant="h6" gutterBottom>
                    Sẵn sàng để phát trực tiếp?
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.7, maxWidth: 400, mx: 'auto' }}>
                    Thiết lập thông tin livestream của bạn và nhấn "Bắt đầu phát" khi bạn đã sẵn sàng.
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<Videocam />}
                    onClick={handleStartLive}
                    sx={{ mt: 3 }}
                  >
                    Bắt đầu phát
                  </Button>
                </Box>
              )}
            </Paper>
            
            {isLive && (
              <Paper sx={{ mt: 2, p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Sản phẩm đang bán</Typography>
                  <Button 
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={() => setOpenProductDialog(true)}
                  >
                    Hiển thị sản phẩm
                  </Button>
                </Box>
                
                <Grid container spacing={2}>
                  {mockProducts.slice(0, 4).map((product) => (
                    <Grid item xs={6} sm={3} key={product.id}>
                      <Card 
                        sx={{ 
                          cursor: 'pointer',
                          transition: '0.3s',
                          '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 }
                        }}
                        onClick={() => handleFeatureProduct(product)}
                      >
                        <Box sx={{ position: 'relative', paddingTop: '100%' }}>
                          <CardMedia
                            component="img"
                            image={product.image}
                            alt={product.name}
                            sx={{ 
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                            onError={(e) => {
                              e.target.src = 'https://placehold.co/400?text=Product';
                            }}
                          />
                          {featuredProduct && featuredProduct.id === product.id && (
                            <Box
                              sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                bgcolor: 'rgba(25, 118, 210, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Typography variant="subtitle2" sx={{ color: 'white', bgcolor: 'primary.main', px: 1, py: 0.5, borderRadius: 1 }}>
                                Đang hiển thị
                              </Typography>
                            </Box>
                          )}
                        </Box>
                        <CardContent sx={{ p: 1 }}>
                          <Typography variant="body2" noWrap>
                            {product.name}
                          </Typography>
                          <Typography variant="subtitle2" color="primary.main">
                            {formatPrice(product.price)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            )}
          </Grid>
          
          {/* Chat and tools area */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Bình luận trực tiếp
                </Typography>
              </Box>
              
              <Box sx={{ flex: 1, overflowY: 'auto', p: 2, maxHeight: 400 }}>
                <List disablePadding>
                  {comments.map((comment) => (
                    <ListItem
                      key={comment.id}
                      alignItems="flex-start"
                      disableGutters
                      sx={{ mb: 1, px: 0 }}
                    >
                      <ListItemAvatar sx={{ minWidth: 40 }}>
                        <Avatar
                          src={comment.avatar}
                          sx={{ width: 32, height: 32 }}
                        >
                          {comment.user.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="subtitle2" component="span">
                              {comment.user}
                            </Typography>
                            {comment.user.includes('Admin') && (
                              <Chip
                                label="Admin"
                                size="small"
                                color="primary"
                                sx={{ ml: 1, height: 20, fontSize: '0.625rem' }}
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                              sx={{ display: 'block' }}
                            >
                              {comment.text}
                            </Typography>
                            <Typography
                              component="span"
                              variant="caption"
                              color="text.secondary"
                            >
                              {comment.time}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
              
              <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Nhập bình luận..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <IconButton color="primary" onClick={handleSendMessage}>
                    <Send />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
            
            {isLive && (
              <Paper sx={{ mt: 2, p: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Thống kê trực tiếp
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="primary.main">352</Typography>
                      <Typography variant="body2" color="text.secondary">Người xem</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="primary.main">1.2k</Typography>
                      <Typography variant="body2" color="text.secondary">Lượt thích</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="primary.main">35</Typography>
                      <Typography variant="body2" color="text.secondary">Đơn hàng</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Product selection dialog */}
      <Dialog open={openProductDialog} onClose={() => setOpenProductDialog(false)} maxWidth="md">
        <DialogTitle>Chọn sản phẩm để hiển thị</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {mockProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    transition: '0.3s',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 },
                    border: featuredProduct && featuredProduct.id === product.id ? '2px solid' : 'none',
                    borderColor: 'primary.main',
                  }}
                  onClick={() => handleFeatureProduct(product)}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/400?text=Product';
                    }}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" noWrap>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Còn lại: {product.stock} sản phẩm
                    </Typography>
                    <Typography variant="subtitle2" color="primary.main">
                      {formatPrice(product.price)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProductDialog(false)}>Đóng</Button>
          {featuredProduct && (
            <Button 
              variant="contained" 
              onClick={() => setOpenProductDialog(false)}
            >
              Xác nhận
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LivestreamPage; 