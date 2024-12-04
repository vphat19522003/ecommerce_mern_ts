import React, { useEffect, useRef, useState } from 'react';

import { ArrowBack, ArrowForward, Close } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

const ImageViewer = ({
  images,
  initialIndex = 0,
  onClose
}: {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex); // Ảnh đang hiển thị
  const [startIndex, setStartIndex] = useState(0); // Ảnh đầu tiên trong danh sách
  const [maxThumbnails, setMaxThumbnails] = useState(0); // Số ảnh tối đa hiển thị
  const thumbnailsRef = useRef<HTMLDivElement | null>(null); // Tham chiếu đến container của ảnh thu nhỏ

  useEffect(() => {
    const calculateMaxThumbnails = () => {
      const thumbnailWidth = 70; // Chiều rộng mỗi ảnh (bao gồm khoảng cách)
      const screenWidth = window.innerWidth * 0.8; // 80% chiều rộng màn hình
      setMaxThumbnails(Math.floor(screenWidth / thumbnailWidth));
    };

    // Gọi hàm tính toán ban đầu
    calculateMaxThumbnails();

    // Lắng nghe sự kiện resize
    window.addEventListener('resize', calculateMaxThumbnails);

    return () => {
      // Gỡ bỏ sự kiện resize khi component unmount
      window.removeEventListener('resize', calculateMaxThumbnails);
    };
  }, []);

  useEffect(() => {
    // Nếu ảnh hiện tại vượt ngoài danh sách hiển thị, cập nhật startIndex
    if (currentIndex >= startIndex + maxThumbnails) {
      setStartIndex(currentIndex - maxThumbnails + 1);
    } else if (currentIndex < startIndex) {
      setStartIndex(currentIndex);
    }
  }, [currentIndex, startIndex, maxThumbnails]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    // Cuộn mượt mà khi chuyển sang ảnh tiếp theo
    if (thumbnailsRef.current) {
      const thumbnailContainer = thumbnailsRef.current;
      const thumbnailWidth = 70; // Chiều rộng mỗi ảnh
      const newPosition = (currentIndex % images.length) * thumbnailWidth;

      // Cuộn đến vị trí mới với hiệu ứng mượt mà
      thumbnailContainer.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, images.length]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}>
      {/* Nút đóng */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          color: 'white'
        }}>
        <Close />
      </IconButton>

      {/* Nút Previous */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: '20px',
          color: 'white'
        }}>
        <ArrowBack />
      </IconButton>

      {/* Ảnh chính */}
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex}`}
        style={{
          maxWidth: '80%',
          maxHeight: '80%',
          objectFit: 'contain',
          borderRadius: '8px'
        }}
      />

      {/* Nút Next */}
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: '20px',
          color: 'white'
        }}>
        <ArrowForward />
      </IconButton>

      {/* Danh sách ảnh thu nhỏ */}
      <Box
        sx={{
          display: 'flex',
          overflow: 'hidden',
          width: '80%',
          marginTop: '20px',
          justifyContent: 'center',
          position: 'relative'
        }}>
        <Box
          ref={thumbnailsRef}
          sx={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            transition: 'transform 0.3s ease-in-out',
            scrollBehavior: 'smooth',
            paddingBottom: '10px'
          }}>
          {images.map((image, index) => (
            <Box
              key={index}
              component='img'
              src={image}
              alt={`Thumbnail ${index}`}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: '60px',
                height: '60px',
                objectFit: 'cover',
                borderRadius: '4px',
                cursor: 'pointer',
                border: currentIndex === index ? '2px solid white' : 'none',
                display: index >= startIndex && index < startIndex + maxThumbnails ? 'block' : 'none', // Ẩn các ảnh ngoài danh sách
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ImageViewer;
