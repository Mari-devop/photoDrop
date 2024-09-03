import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { arrayBufferToBase64 } from '../../utils/ConverFunc';
import { Image } from './types';
import { Container, PhotoGrid, Button, ImageWrapper, SpinnerWrapper } from './AlbumDetails.styled';
import Footer from '../footer/Footer';
import FullscreenImage from '../fullScreenImage/FullScreenImage';
import PayPopup from '../payPopup/PayPopup';
import { ThreeCircles } from 'react-loader-spinner';

const AlbumDetails: React.FC = () => {
  const { albumId: locationName } = useParams<{ albumId: string }>(); 
  const [images, setImages] = useState<Array<Image & { isLoading: boolean }>>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 500);
  const [showPayPopup, setShowPayPopup] = useState(false);
  const navigate = useNavigate();
  const loadingState = useRef({
    currentPhotoIndex: 0,
    totalPhotos: 0,
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

  const loadInitialContainers = (imageCount: number) => {
    const initialImages = Array.from({ length: imageCount }, (_, index) => ({
      id: index,
      binaryString: '',
      isPurchased: false,
      date: '',
      isLoading: true,
    }));

    setImages(initialImages);
    loadingState.current.totalPhotos = imageCount;
  };

  const loadPhoto = async (photoIndex: number, selectedAlbum: any) => {
    try {
      const token = localStorage.getItem('authToken');
      const currentImageId = selectedAlbum.images[photoIndex].id;

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

        setImages(prevImages =>
          prevImages.map((img, idx) =>
            idx === photoIndex ? { ...img, binaryString: imageSrc, isLoading: false } : img
          )
        );

        loadingState.current.currentPhotoIndex++;

        if (loadingState.current.currentPhotoIndex < selectedAlbum.images.length) {
          loadPhoto(loadingState.current.currentPhotoIndex, selectedAlbum);
        }
      }
    } catch (error) {
      console.error('Error loading image:', error);
    }
  };

  const loadPhotos = async () => {
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

        if (selectedAlbum) {
          loadInitialContainers(selectedAlbum.images.length);
          navigate(`/albumDetails/${locationName}?photos=${selectedAlbum.images.length}&date=${selectedAlbum.images[0].date}`, { replace: true });

          loadPhoto(loadingState.current.currentPhotoIndex, selectedAlbum);
        }
      }
    } catch (error) {
      console.error('Error loading album images:', error);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, [locationName]);

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
    setSelectedImage(null);
  };

  const areAllImagesPurchased = images.every(image => image.isPurchased);

  const handleUnlockPhotosClick = () => {
    setShowPayPopup(true);
  };

  const handlePayPopupClose = () => {
    setShowPayPopup(false);
  };

  return (
    <Container>
      <PhotoGrid>
        {images.map(image => (
          <ImageWrapper key={image.id}>
            {image.isLoading ? (
              <SpinnerWrapper>
                <ThreeCircles
                  visible={true}
                  height="100"
                  width="100"
                  color="#3300CC"
                  ariaLabel="three-circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </SpinnerWrapper>
            ) : (
              <img src={image.binaryString} alt="Photo" onClick={() => handleImageClick(image)} />
            )}
          </ImageWrapper>
        ))}
      </PhotoGrid>
      {!areAllImagesPurchased && (
        <Button onClick={handleUnlockPhotosClick}>
          Unlock your photos
        </Button> )}
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
      {showPayPopup && (
        <PayPopup 
          onClose={handlePayPopupClose}
          imageIds={images.filter(image => !image.isPurchased).map(image => image.id)}
          showAllPhotosOnly={true}
        />
      )}
    </Container>
  );
};

export default AlbumDetails;
