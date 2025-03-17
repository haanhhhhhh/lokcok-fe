import React, { useState, useEffect } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import Image from 'next/image';

const bannerImages = [
  '/banners/banner1.jpg',
  '/banners/banner2.jpg',
  '/banners/banner3.jpg',
  '/banners/banner4.jpg',
  '/banners/banner5.jpg',
];

const rightBanners = [
  '/banners/right1.jpg',
  '/banners/right2.jpg',
];

const BannerSlide = () => {
  const theme = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 1,
      mb: 3,
      height: { xs: 200, sm: 235, md: 270 },
      position: 'relative'
    }}>
      {/* Main Slider */}
      <Box sx={{ 
        position: 'relative',
        flex: '1 1 66.66%',
        borderRadius: 2,
        overflow: 'hidden'
      }}>
        <Box sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}>
          {bannerImages.map((image, index) => (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: currentSlide === index ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
                '& img': {
                  objectFit: 'cover',
                }
              }}
            >
              <Image
                src={image}
                alt={`Banner ${index + 1}`}
                fill
                priority={index === 0}
              />
            </Box>
          ))}
        </Box>

        {/* Navigation Arrows */}
        <IconButton
          onClick={handlePrevSlide}
          sx={{
            position: 'absolute',
            left: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(0, 0, 0, 0.4)',
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.6)',
            },
          }}
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={handleNextSlide}
          sx={{
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(0, 0, 0, 0.4)',
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.6)',
            },
          }}
        >
          <KeyboardArrowRight />
        </IconButton>

        {/* Dots Navigation */}
        <Box sx={{
          position: 'absolute',
          bottom: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
        }}>
          {bannerImages.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentSlide(index)}
              sx={{
                width: 24,
                height: 4,
                bgcolor: currentSlide === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                borderRadius: 1,
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Right Banners */}
      <Box sx={{ 
        display: { xs: 'none', md: 'flex' },
        flex: '1 1 33.33%',
        flexDirection: 'column',
        gap: 1,
      }}>
        {rightBanners.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              flex: 1,
              borderRadius: 2,
              overflow: 'hidden',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.9,
              },
            }}
          >
            <Image
              src={image}
              alt={`Right banner ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BannerSlide; 