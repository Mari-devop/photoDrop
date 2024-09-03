import React, { useEffect, useState, useRef } from 'react';
import FocusTrap from 'focus-trap-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { arrayBufferToBase64 } from '../../utils/ConverFunc';
import { AlbumData, Image, AccountFullDataProps } from './types';
import {
  Container,
  Subtitle,
  Album,
  PhotoContainer,
  AlbumContainer,
  FirstRow,
  SecondRow,
  Text,
  ImageWrapper,
  SpinnerWrapper,
} from './AccountFullData.styled';
import FullscreenImage from '../fullScreenImage/FullScreenImage';
import Footer from '../footer/Footer';
import { ThreeCircles } from 'react-loader-spinner'; 

const AccountFullData: React.FC<AccountFullDataProps> = ({ imagesData }) => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<AlbumData[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 500);
  const [animationStep, setAnimationStep] = useState(0);
  const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});
  const loadingState = useRef({
    currentAlbumIndex: 0,
    currentPhotoIndex: 0,
    isLoading: false, 
  });
  const [focusEnabled, setFocusEnabled] = useState(false);

  const albumRefs = useRef<HTMLAnchorElement[]>([]);
  const photoRefs = useRef<HTMLImageElement[]>([]);

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

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
    setSelectedImage(null);
  };

  const loadNextPhoto = async () => {
    const { currentAlbumIndex, currentPhotoIndex, isLoading } = loadingState.current;
    if (isLoading || currentAlbumIndex >= imagesData.length) return;

    loadingState.current.isLoading = true;

    const album = imagesData[currentAlbumIndex];
    const currentImageId = album.images[currentPhotoIndex].id;

    setLoadingImages(prev => ({ ...prev, [currentImageId]: true }));

    try {
      const token = localStorage.getItem('authToken');
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
          isPurchased: album.images[currentPhotoIndex].isPurchased,
          date: album.images[currentPhotoIndex].date,
        };

        setAlbums(prevAlbums => {
          const newAlbums = [...prevAlbums];
          const existingAlbum = newAlbums.find(a => a.locationName === album.location);
          if (existingAlbum) {
            const existingImage = existingAlbum.images.find(img => img.id === newImage.id);
            if (!existingImage) {
              existingAlbum.images.push(newImage);
            }
          } else {
            newAlbums.push({
              locationName: album.location, 
              images: [newImage],
            });
          }
          return newAlbums;
        });

        setTimeout(() => {
          setLoadingImages(prev => ({ ...prev, [currentImageId]: false }));
        }, 500);

        if (currentPhotoIndex < album.images.length - 1) {
          loadingState.current.currentPhotoIndex++;
        } else {
          loadingState.current.currentAlbumIndex++;
          loadingState.current.currentPhotoIndex = 0;
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
  }, [imagesData]);

  useEffect(() => {
    const timeouts = [
      setTimeout(() => setAnimationStep(1), 0),    
      setTimeout(() => setAnimationStep(2), 500),  
      setTimeout(() => setAnimationStep(3), 1000), 
      setTimeout(() => setAnimationStep(4), 1500), 
      setTimeout(() => setAnimationStep(5), 2000), 
      setTimeout(() => setAnimationStep(6), 2500), 
    ];

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  useEffect(() => {
    if (focusEnabled) {
      if (albumRefs.current.length > 0) {
        albumRefs.current[0].focus();
      }
    }
  }, [focusEnabled]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      setFocusEnabled(true);
    }
  };

  return (
    <FocusTrap active={focusEnabled}>
      <Container>
        <FirstRow className={`fade-in ${animationStep >= 2 ? 'fade-in-visible' : ''}`}>
          <Subtitle>Albums</Subtitle>
          <AlbumContainer>
            {albums.map((album, index) => (
              <Link 
                to={`/albumDetails/${encodeURIComponent(album.locationName)}`} 
                key={index}
                ref={(el) => (albumRefs.current[index] = el!)}
                tabIndex={index + 1}
              >
                <Album className={`fade-in ${animationStep >= 3 ? 'fade-in-visible' : ''}`}>
                  {album.images[0] && (
                    <>
                      <img src={album.images[0].binaryString} alt={album.locationName} onClick={() => handleImageClick(album.images[0])} />
                      <Text>{album.locationName}</Text>
                    </>
                  )}
                </Album>
              </Link>
            ))}
          </AlbumContainer>
        </FirstRow>
        <SecondRow className={`fade-in ${animationStep >= 4 ? 'fade-in-visible' : ''}`}>
          <Subtitle>All photos</Subtitle>
          <PhotoContainer>
            {albums.flatMap(album => album.images).map((image, idx) => (
              <ImageWrapper key={image.id}>
                {loadingImages[image.id] ? (
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
                  <img 
                    className={`fade-in ${animationStep >= 5 ? 'fade-in-visible' : ''}`}
                    src={image.binaryString} 
                    alt={`Im ${image.id}`}
                    ref={(el) => (photoRefs.current[idx] = el!)}
                    tabIndex={albums.length + idx + 1}
                    onClick={() => handleImageClick(image)}
                  />
                )}
              </ImageWrapper>
            ))}
          </PhotoContainer>
        </SecondRow>
        <div className={`fade-in ${animationStep >= 6 ? 'fade-in-visible' : ''}`}>
          <Footer />
        </div>

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
    </FocusTrap>
  );
};

export default AccountFullData;
