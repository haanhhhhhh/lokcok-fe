import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Rating,
  Divider,
  TextField,
  IconButton,
  Tabs,
  Tab,
  Paper,
  Breadcrumbs,
  Link as MuiLink,
  Stack,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  List as MuiList,
  ListItem as MuiListItem,
  ListItemText as MuiListItemText,
  ListItemAvatar as MuiListItemAvatar,
  Avatar,
} from '@mui/material';
import {
  Add,
  Remove,
  Favorite,
  FavoriteBorder,
  Share,
  ShoppingCart,
  LocalShipping,
  Shield,
  Reply,
  Message,
  Send,
  AttachFile,
  Image as ImageIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import ClientLayout from '../../layouts/ClientLayout';

// Mock data cho sản phẩm
const productDetail = {
  id: 1,
  name: 'Áo thun basic form rộng unisex cotton 100% - Nhiều màu',
  images: [
    '/product1.jpg',
    '/product1-1.jpg',
    '/product1-2.jpg',
    '/product1-3.jpg',
  ],
  price: 199000,
  originalPrice: 299000,
  discount: 33,
  sold: 1200,
  rating: 4.8,
  ratingCount: 856,
  description: `• Chất liệu: Cotton 100%
• Form: Rộng
• Size: S/M/L/XL
• Màu sắc: Đen/Trắng/Xám/Be
• Xuất xứ: Việt Nam
• Thương hiệu: ABC Fashion

HƯỚNG DẪN CHỌN SIZE:
• Size S: 45-55kg
• Size M: 55-65kg
• Size L: 65-75kg
• Size XL: 75-85kg`,
  variations: {
    colors: ['Đen', 'Trắng', 'Xám', 'Be'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  shop: {
    id: 1,
    name: 'Thúy Kiều Shop',
    avatar: '/kol-avatar.jpg',
    rating: 4.9,
    products: 150,
    responseRate: 98,
    responseTime: '5 phút',
    followers: '10.5K',
  },
};

// Component Chat Dialog
const ChatDialog = ({ open, onClose, shop }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'shop',
      text: 'Xin chào! Tôi có thể giúp gì cho bạn?',
      time: '10:00'
    },
    {
      id: 2,
      sender: 'user',
      text: 'Chào shop, sản phẩm này còn size M màu đen không ạ?',
      time: '10:01'
    },
    {
      id: 3,
      sender: 'shop',
      text: 'Dạ shop còn hàng ạ. Bạn muốn đặt hàng luôn không ạ?',
      time: '10:02'
    }
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'user',
          text: message,
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { height: '80vh' }
      }}
    >
      <DialogTitle sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar src={shop.avatar} />
          <Box>
            <Typography variant="subtitle1">
              {shop.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Thường trả lời trong {shop.responseTime}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Messages */}
        <Box sx={{ 
          flex: 1, 
          p: 2, 
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}>
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              {msg.sender === 'shop' && (
                <Avatar
                  src={shop.avatar}
                  sx={{ width: 32, height: 32, mr: 1 }}
                />
              )}
              <Box>
                <Paper
                  sx={{
                    p: 1.5,
                    bgcolor: msg.sender === 'user' ? 'primary.main' : 'grey.100',
                    color: msg.sender === 'user' ? 'white' : 'text.primary',
                    borderRadius: 2,
                    maxWidth: '70%',
                  }}
                >
                  <Typography variant="body2">
                    {msg.text}
                  </Typography>
                </Paper>
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ 
                    mt: 0.5, 
                    display: 'block',
                    textAlign: msg.sender === 'user' ? 'right' : 'left'
                  }}
                >
                  {msg.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Input Area */}
        <Box sx={{ 
          p: 2, 
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper'
        }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập tin nhắn..."
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small">
                    <ImageIcon />
                  </IconButton>
                  <IconButton size="small">
                    <AttachFile />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={handleSend}
                    disabled={!message.trim()}
                  >
                    <Send />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [liked, setLiked] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleQuantityChange = (value) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  return (
    <ClientLayout>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link href="/" passHref>
            <MuiLink underline="hover" color="inherit">
              Trang chủ
            </MuiLink>
          </Link>
          <Link href={`/kol/${productDetail.shop.id}`} passHref>
            <MuiLink underline="hover" color="inherit">
              {productDetail.shop.name}
            </MuiLink>
          </Link>
          <Typography color="text.primary">{productDetail.name}</Typography>
        </Breadcrumbs>

        {/* Product Info */}
        <Grid container spacing={3}>
          {/* Left Column - Images */}
          <Grid item xs={12} md={5}>
            <Box sx={{ position: 'relative' }}>
              <img
                src={productDetail.images[selectedImage]}
                alt={productDetail.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                }}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  bgcolor: 'white',
                  '&:hover': { bgcolor: 'grey.100' },
                }}
                onClick={() => setLiked(!liked)}
              >
                {liked ? <Favorite color="error" /> : <FavoriteBorder />}
              </IconButton>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              {productDetail.images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 1,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: selectedImage === index ? '2px solid' : '2px solid transparent',
                    borderColor: selectedImage === index ? 'primary.main' : 'transparent',
                  }}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Right Column - Product Details */}
          <Grid item xs={12} md={7}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              {productDetail.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="h6" color="error.main">
                  {productDetail.rating}
                </Typography>
                <Rating value={productDetail.rating} precision={0.1} readOnly size="small" />
                <Typography variant="body2" color="text.secondary">
                  ({productDetail.ratingCount} đánh giá)
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Typography variant="body2">
                <strong>{productDetail.sold}</strong> Đã bán
              </Typography>
            </Box>

            <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 1 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through' }}
                >
                  {formatPrice(productDetail.originalPrice)}
                </Typography>
                <Typography variant="h4" color="error.main" sx={{ fontWeight: 500 }}>
                  {formatPrice(productDetail.price)}
                </Typography>
                <Chip
                  label={`-${productDetail.discount}%`}
                  color="error"
                  size="small"
                />
              </Box>
            </Box>

            {/* Variations */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Màu sắc
              </Typography>
              <Stack direction="row" spacing={1}>
                {productDetail.variations.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? 'contained' : 'outlined'}
                    onClick={() => setSelectedColor(color)}
                    sx={{ minWidth: 60 }}
                  >
                    {color}
                  </Button>
                ))}
              </Stack>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Kích cỡ
              </Typography>
              <Stack direction="row" spacing={1}>
                {productDetail.variations.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'contained' : 'outlined'}
                    onClick={() => setSelectedSize(size)}
                    sx={{ minWidth: 60 }}
                  >
                    {size}
                  </Button>
                ))}
              </Stack>
            </Box>

            {/* Quantity */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Số lượng
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Remove />
                </IconButton>
                <TextField
                  size="small"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  inputProps={{ min: 1, style: { textAlign: 'center', width: 40 } }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Add />
                </IconButton>
              </Box>
            </Box>

            {/* Buttons */}
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<ShoppingCart />}
                sx={{ flex: 1, height: 48 }}
              >
                Thêm vào giỏ hàng
              </Button>
              <Button
                variant="contained"
                sx={{ flex: 1, height: 48 }}
              >
                Mua ngay
              </Button>
            </Stack>

            {/* Shop Info */}
            <Paper sx={{ mt: 3, p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Link href={`/kol/${productDetail.shop.id}`} passHref>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, cursor: 'pointer' }}>
                    <Box sx={{ position: 'relative' }}>
                      <img
                        src={productDetail.shop.avatar}
                        alt={productDetail.shop.name}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">
                        {productDetail.shop.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {productDetail.shop.followers} người theo dõi
                      </Typography>
                    </Box>
                  </Box>
                </Link>
                <Stack spacing={1}>
                  <Button 
                    variant="outlined" 
                    startIcon={<Message />}
                    onClick={() => setChatOpen(true)}
                  >
                    Chat ngay
                  </Button>
                  <Button variant="outlined" startIcon={<Reply />}>
                    Xem shop
                  </Button>
                </Stack>
              </Box>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={4}>
                  <Typography variant="body2">
                    Đánh giá: <strong>{productDetail.shop.rating}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2">
                    Sản phẩm: <strong>{productDetail.shop.products}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2">
                    Tỷ lệ phản hồi: <strong>{productDetail.shop.responseRate}%</strong>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Product Description */}
        <Paper sx={{ mt: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Chi tiết sản phẩm" sx={{ textTransform: 'none' }} />
            <Tab label="Đánh giá" sx={{ textTransform: 'none' }} />
          </Tabs>
          <Box sx={{ p: 3 }}>
            {activeTab === 0 ? (
              <Typography
                component="pre"
                sx={{
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'inherit',
                }}
              >
                {productDetail.description}
              </Typography>
            ) : (
              <Typography>
                Phần đánh giá sản phẩm
              </Typography>
            )}
          </Box>
        </Paper>

        {/* Chat Dialog */}
        <ChatDialog
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          shop={productDetail.shop}
        />
      </Container>
    </ClientLayout>
  );
};

export default ProductDetailPage; 