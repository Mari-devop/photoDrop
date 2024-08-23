import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { arrayBufferToBase64 } from '../../utils/ConverFunc';
import { Image } from './types';
import { Container, PhotoGrid, Button } from './AlbumDetails.styled';
import Footer from '../footer/Footer';
import FullscreenImage from '../fullScreenImage/FullScreenImage';

const AlbumDetails: React.FC = () => {
  const { albumId: locationName } = useParams<{ albumId: string }>(); 
  const [images, setImages] = useState<Image[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 500);
  const navigate = useNavigate();
  const loadingState = useRef({
    currentPhotoIndex: 0,
    isLoading: false, 
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);

  const loadNextPhoto = async () => {
    const { currentPhotoIndex, isLoading } = loadingState.current;
    if (isLoading || !locationName) return;

    loadingState.current.isLoading = true;

    try {
      const token = localStorage.getItem('authToken');
      const albumResponse = await axios.get('https://photodrop-dawn-surf-6942.fly.dev/client/images', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (albumResponse.status === 200 && Array.isArray(albumResponse.data)) {
        const selectedAlbum = albumResponse.data.find((album: any) => album.location === locationName);

        if (selectedAlbum && selectedAlbum.images[currentPhotoIndex]) {
          const currentImageId = selectedAlbum.images[currentPhotoIndex].id;

          const imageResponse = await axios.get(`https://photodrop-dawn-surf-6942.fly.dev/client/image/${currentImageId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            responseType: 'json',
          });

          if (imageResponse.status === 200 && imageResponse.data) {
            const byteArray = new Uint8Array(imageResponse.data.imageData.data);
            const binaryString = arrayBufferToBase64(byteArray.buffer);
            const imageSrc = `data:image/jpeg;base64,${binaryString}`;

            const newImage: Image = {
              id: currentImageId,
              binaryString: imageSrc,
              isPurchased: selectedAlbum.images[currentPhotoIndex].isPurchased,
              date: selectedAlbum.images[currentPhotoIndex].date, 
            };

            setImages(prevImages => {
              const existingImage = prevImages.find(img => img.id === newImage.id);
              if (!existingImage) {
                return [...prevImages, newImage];
              }
              return prevImages;
            });

            if (currentPhotoIndex === 0) {
              navigate(`/albumDetails/${locationName}?photos=${selectedAlbum.images.length}&date=${newImage.date}`, { replace: true });
            }
            
            loadingState.current.currentPhotoIndex++;
          }
        }
      }
    } catch (error) {
      console.error('Error loading image:', error);
    }

    loadingState.current.isLoading = false;
  };

  useEffect(() => {
    const intervalId = setInterval(loadNextPhoto, 1000); 

    return () => clearInterval(intervalId);
  }, [locationName]);

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
    setSelectedImage(null);
  };

  return (
    <Container>
      <PhotoGrid>
        {images.map(image => (
          <img src={image.binaryString} alt={`Image ${image.id}`} key={image.id} onClick={() => handleImageClick(image)} />
        ))}
      </PhotoGrid>
      <Button>Unlock your photos</Button>
      <Footer />

      {isFullscreen && selectedImage && (
        <FullscreenImage 
          imageSrc={selectedImage.binaryString} 
          isPurchased={selectedImage.isPurchased}
          imageId={selectedImage.id.toString()}  
          onClose={handleCloseFullscreen}
          isMobile={isMobile}
          date={selectedImage.date}  
        />
      )}
    </Container>
  );
};

export default AlbumDetails;
