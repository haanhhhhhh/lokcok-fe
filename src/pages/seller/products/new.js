import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Chip,
  IconButton,
  Alert,
} from '@mui/material';
import {
  Upload as UploadIcon,
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';

const categories = [
  'Thời trang nữ',
  'Thời trang nam',
  'Giày dép',
  'Túi xách',
  'Phụ kiện',
  'Mỹ phẩm',
  'Đồ điện tử',
  'Khác',
];

const conditions = [
  { value: 'new', label: 'Mới 100%' },
  { value: 'like_new', label: 'Như mới (99%)' },
  { value: 'very_good', label: 'Rất tốt (95-98%)' },
  { value: 'good', label: 'Tốt (90-94%)' },
  { value: 'acceptable', label: 'Chấp nhận được (80-89%)' },
];

const NewProduct = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    condition: '',
    originalPrice: '',
    price: '',
    description: '',
    brand: '',
    tags: [],
  });
  const [currentTag, setCurrentTag] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = () => {
    if (currentTag && !formData.tags.includes(currentTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag]
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.condition || !formData.price) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    try {
      // TODO: Implement API call to create product
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/seller/products');
    } catch (err) {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 4 }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => router.back()}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5">
            Đăng bán sản phẩm mới
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Image Upload Section */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Hình ảnh sản phẩm
                </Typography>
                <Box 
                  sx={{ 
                    border: '1px dashed grey',
                    borderRadius: 1,
                    p: 3,
                    textAlign: 'center',
                    bgcolor: 'background.default'
                  }}
                >
                  <UploadIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography gutterBottom>
                    Tải lên hình ảnh sản phẩm
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Hình ảnh rõ nét sẽ giúp sản phẩm bán được nhanh hơn
                  </Typography>
                  <Button variant="outlined" component="label" sx={{ mt: 2 }}>
                    Chọn ảnh
                    <input type="file" hidden multiple accept="image/*" />
                  </Button>
                </Box>
              </Grid>

              {/* Basic Information */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                  Thông tin cơ bản
                </Typography>
                <TextField
                  fullWidth
                  label="Tên sản phẩm"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2 }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Danh mục</InputLabel>
                      <Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        label="Danh mục"
                      >
                        {categories.map((category) => (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Tình trạng</InputLabel>
                      <Select
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        label="Tình trạng"
                      >
                        {conditions.map((condition) => (
                          <MenuItem key={condition.value} value={condition.value}>
                            {condition.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* Price Information */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Giá bán
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Giá gốc"
                      name="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">đ</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Giá bán"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      InputProps={{
                        endAdornment: <InputAdornment position="end">đ</InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Additional Information */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Thông tin chi tiết
                </Typography>
                <TextField
                  fullWidth
                  label="Thương hiệu"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Mô tả chi tiết"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  required
                  helperText="Mô tả chi tiết về sản phẩm, tình trạng sử dụng, lý do thanh lý..."
                  sx={{ mb: 2 }}
                />
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Thêm tag"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleAddTag} edge="end">
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {formData.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        onDelete={() => handleRemoveTag(tag)}
                        color="primary"
                      />
                    ))}
                  </Box>
                </Box>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button 
                    variant="outlined" 
                    onClick={() => router.back()}
                  >
                    Hủy
                  </Button>
                  <Button 
                    variant="contained" 
                    type="submit"
                  >
                    Đăng bán
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default NewProduct; 