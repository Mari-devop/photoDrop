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
import { LoadMoreButton } from '../accountFullData/AccountFullData.styled';

const AlbumDetails: React.FC = () => {
  const { albumId: locationName = '' } = useParams<{ albumId: string }>(); 
  const [images, setImages] = useState<Array<Image>>([]);
  const [loadingImages, setLoadingImages] = useState<boolean[]>([]); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 500);
  const [showPayPopup, setShowPayPopup] = useState(false);
  const navigate = useNavigate();
  const [focusEnabled, setFocusEnabled] = useState(false);
  const [displayedImages, setDisplayedImages] = useState(9);

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        setFocusEnabled(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const manageBodyScroll = () => {
      if (showPayPopup) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    };
  
    manageBodyScroll();
  
    return () => {
      document.body.style.overflow = 'auto';  
    };
  }, [showPayPopup]);
  
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
          const loadedImages = selectedAlbum.images.map((image: any) => ({
            id: image.id, 
            binaryString: '', 
            isPurchased: image.isPurchased,
            date: image.date
          }));

          setImages(loadedImages);
          setLoadingImages(new Array(loadedImages.length).fill(true)); 

          navigate(`/albumDetails/${locationName}?photos=${selectedAlbum.images.length}&date=${selectedAlbum.images[0].date}`, { replace: true });

          loadPhoto(0, selectedAlbum); 
        }
      }
    } catch (error) {
      console.error('Error loading album images:', error);
    }
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
            idx === photoIndex ? { ...img, binaryString: imageSrc } : img
          )
        );

        setLoadingImages(prevLoading =>
          prevLoading.map((loading, idx) =>
            idx === photoIndex ? false : loading
          )
        ); 

        if (photoIndex + 1 < selectedAlbum.images.length) {
          setTimeout(() => loadPhoto(photoIndex + 1, selectedAlbum), 500); 
        }
      }
    } catch (error) {
      console.error('Error loading image:', error);
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

  const handleUnlockPhotosClick = () => {
    const unpaidImages = images.filter(image => !image.isPurchased);
    if (unpaidImages.length > 0) {
      setShowPayPopup(true);
    } else {
      alert("No photos available for purchase.");
    }
  };

  const handlePayPopupClose = () => {
    setShowPayPopup(false);
  };

  const loadMorePhotos = () => {
    const remainingImages = images.length - displayedImages;
    const imagesToDisplay = remainingImages >= 9 ? 9 : remainingImages;
    setDisplayedImages(prev => prev + imagesToDisplay); 
  }

  return (
      <Container>
        <PhotoGrid>
          {images.slice(0, displayedImages).map((image, index) => (
            <ImageWrapper
              key={image.id}
              style={{
                border: loadingImages[index] ? '0.3px solid var(--button-hover-color)' : 'none',
                backgroundColor: loadingImages[index] ? 'rgba(51, 0, 204, 0.05)' : 'transparent',
              }}
            >
              {loadingImages[index] ? (
                <SpinnerWrapper>
                  <ThreeCircles
                    visible={true}
                    height="100"
                    width="100"
                    color="#3300CC"
                    ariaLabel="three-circles-loading"
                  />
                </SpinnerWrapper>
              ) : (
                <img
                  src={image.binaryString}
                  alt="Photoо"
                  onClick={() => handleImageClick(image)}
                  className="fade-in"
                  style={{
                    transition: 'opacity 0.5s ease-in-out',
                    opacity: loadingImages[index] ? 0 : 1,
                  }}
                />
              )}
            </ImageWrapper>
          ))}
        </PhotoGrid>
        {displayedImages < images.length && (
          <LoadMoreButton onClick={loadMorePhotos}>
            Load more
          </LoadMoreButton>
        )}
        {!images.every(image => image.isPurchased) && (
          <Button 
            onClick={handleUnlockPhotosClick}
          >
            Unlock your photos
          </Button> 
        )}
        <Footer />
        {isFullscreen && selectedImage && (
          <FullscreenImage 
            imageSrc={selectedImage.binaryString} 
            isPurchased={selectedImage.isPurchased}
            imageId={selectedImage.id.toString()}  
            onClose={handleCloseFullscreen}
            isMobile={isMobile}
            date={selectedImage.date}  
            albumName={locationName} 
          />
        )}
        {showPayPopup && (
          <PayPopup 
            onClose={handlePayPopupClose}
            imageIds={images.filter(image => !image.isPurchased).map(image => image.id)}
            showAllPhotosOnly={true}
            albumName={locationName}
          />
        )}
      </Container>
  );
};

export default AlbumDetails;
