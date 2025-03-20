import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { Upload, Store, Person, Instagram } from '@mui/icons-material';
import { useRouter } from 'next/router';

const steps = ['Thông tin Shop', 'Cài đặt vận chuyển', 'Thông tin thuế', 'Thông tin định danh', 'Hoàn tất'];

const SellerRegisterPage = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    shopName: '',
    address: '',
    email: '',
    phone: '',
    socialMedia: '',
    followers: '',
    description: '',
    businessType: 'individual',
    idNumber: '',
    taxCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Implement API call to register seller
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Chuyển hướng đến trang thành công
      router.push('/seller/success');
    } catch (err) {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên Shop"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                required
                helperText="Tên Shop của bạn sẽ hiển thị cho người mua"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Địa chỉ lấy hàng"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Số điện thoại"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Đơn vị vận chuyển
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup defaultValue="all">
                  <FormControlLabel 
                    value="all" 
                    control={<Radio />} 
                    label="Tất cả đơn vị vận chuyển" 
                  />
                  <FormControlLabel 
                    value="custom" 
                    control={<Radio />} 
                    label="Tùy chọn đơn vị vận chuyển" 
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel>Loại hình kinh doanh</FormLabel>
                <RadioGroup
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="individual"
                    control={<Radio />}
                    label="Cá nhân"
                  />
                  <FormControlLabel
                    value="business"
                    control={<Radio />}
                    label="Doanh nghiệp"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mã số thuế"
                name="taxCode"
                value={formData.taxCode}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="CMND/CCCD"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ border: '1px dashed grey', p: 3, textAlign: 'center' }}>
                <Upload sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography>
                  Tải lên ảnh CMND/CCCD (mặt trước)
                </Typography>
                <Button variant="outlined" sx={{ mt: 2 }}>
                  Chọn ảnh
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ border: '1px dashed grey', p: 3, textAlign: 'center' }}>
                <Upload sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography>
                  Tải lên ảnh CMND/CCCD (mặt sau)
                </Typography>
                <Button variant="outlined" sx={{ mt: 2 }}>
                  Chọn ảnh
                </Button>
              </Box>
            </Grid>
          </Grid>
        );
      case 4:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Link Instagram/TikTok"
                name="socialMedia"
                value={formData.socialMedia}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Instagram />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Số lượng người theo dõi"
                name="followers"
                type="number"
                value={formData.followers}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô tả về bạn"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
                helperText="Hãy chia sẻ về bản thân và lĩnh vực bạn có ảnh hưởng"
              />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#f5f5f5',
      display: 'flex',
      flexDirection: 'column',
      py: 4
    }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Store sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Đăng ký trở thành Người bán LokCok
            </Typography>
            <Typography color="text.secondary">
              Bắt đầu hành trình kinh doanh của bạn cùng LokCok
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit}>
            {renderStepContent(activeStep)}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Quay lại
              </Button>
              <Button
                variant="contained"
                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : activeStep === steps.length - 1 ? (
                  'Hoàn tất đăng ký'
                ) : (
                  'Tiếp theo'
                )}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default SellerRegisterPage; 