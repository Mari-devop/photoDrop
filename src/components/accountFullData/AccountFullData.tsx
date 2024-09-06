import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { arrayBufferToBase64 } from '../../utils/ConverFunc';
import { AlbumData, Image as myImage, AccountFullDataProps } from './types';
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
  LoadMoreButton
} from './AccountFullData.styled';
import FullscreenImage from '../fullScreenImage/FullScreenImage';
import Footer from '../footer/Footer';
import { ThreeCircles } from 'react-loader-spinner';

const AccountFullData: React.FC<AccountFullDataProps> = ({ imagesData }) => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<AlbumData[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<myImage | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 500);
  const [animationStep, setAnimationStep] = useState(0);
  const [displayedImages, setDisplayedImages] = useState(9);
  const [isHighQualityImage, setHighQualityImage] = useState(false);
  const loadingState = useRef({
    currentAlbumIndex: 0,
    currentPhotoIndex: 0,
    totalPhotos: 0,
    isLoading: false,
  });

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

  const handleImageClick = async (image: myImage) => {
    const isHighQualityImage = await isHighQuality(image.binaryString);
    setHighQualityImage(isHighQualityImage);
    setSelectedImage(image);
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
    setSelectedImage(null);
  };

  const loadInitialContainers = () => {
    const initialAlbums = imagesData.map(album => ({
      locationName: album.location,
      images: album.images.map(image => ({
        ...image,
        binaryString: '',
        isLoading: true,
      })),
    }));

    setAlbums(initialAlbums);
    loadingState.current.totalPhotos = initialAlbums.reduce((acc, album) => acc + album.images.length, 0);
  };

  const loadNextPhoto = async () => {
    const { currentAlbumIndex, currentPhotoIndex, isLoading } = loadingState.current;
    if (isLoading || currentAlbumIndex >= albums.length) return;

    loadingState.current.isLoading = true;

    const album = albums[currentAlbumIndex];
    const currentImage = album.images[currentPhotoIndex];

    try {
      const token = localStorage.getItem('authToken');

      const imageResponse = await axios.get(`https://photodrop-dawn-surf-6942.fly.dev/client/image/${currentImage.id}`, {
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

        setAlbums(prevAlbums => {
          const newAlbums = [...prevAlbums];
          const updatedImage = newAlbums[currentAlbumIndex].images[currentPhotoIndex];
          updatedImage.binaryString = imageSrc;
          updatedImage.isLoading = false;
          return newAlbums;
        });

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
    loadInitialContainers();
  }, [imagesData]);

  useEffect(() => {
    const timeouts = [
      setTimeout(() => setAnimationStep(1), 0), 
      setTimeout(() => setAnimationStep(2), 250),  
      setTimeout(() => setAnimationStep(3), 500), 
      setTimeout(() => setAnimationStep(4), 750), 
      setTimeout(() => setAnimationStep(5), 1000),
    ];

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(loadNextPhoto, 250);
    return () => clearInterval(intervalId);
  }, [albums]);

  const loadMorePhotos = () => {
    const totalImages = albums.flatMap(album => album.images).length;
    const newDisplayedCount = displayedImages + 9;
    setDisplayedImages(newDisplayedCount > totalImages ? totalImages : newDisplayedCount);
  };

  const isHighQuality = (imgSrc: string) => {
    const img = new Image();
    img.src = imgSrc;
    return new Promise<boolean>((resolve) => {
      img.onload = () => resolve(img.width > 600); 
    });
  };

  return (
    <Container>
      <FirstRow className={`fade-in ${animationStep >= 2 ? 'fade-in-visible' : ''}`}>
        <Subtitle>Albums</Subtitle>
        <AlbumContainer>
          {albums.map((album, index) => (
            <Link
              to={`/albumDetails/${encodeURIComponent(album.locationName)}`}
              key={index}
              ref={(el) => (albumRefs.current[index] = el!)}

            >
              <Album className={`fade-in ${animationStep >= 2 ? 'fade-in-visible' : ''}`}>
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

      <SecondRow className={`fade-in ${animationStep >= 3 ? 'fade-in-visible' : ''}`}>
        <Subtitle>All photos</Subtitle>
        <PhotoContainer>
          {albums.flatMap(album => album.images)
            .slice(0, displayedImages)
            .map((image, idx) => (
              <ImageWrapper
                key={image.id}
                style={{
                  border: image.isLoading ? '0.3px solid var(--button-hover-color)' : 'none',
                  backgroundColor: image.isLoading ? 'rgba(51, 0, 204, 0.05)' : 'transparent',
                }}
              >
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
                  <img
                    className={`fade-in ${animationStep >= 4 ? 'fade-in-visible' : ''}`}
                    src={image.binaryString}
                    alt={`Im ${image.id}`}
                    ref={(el) => (photoRefs.current[idx] = el!)}

                    onClick={() => handleImageClick(image)}
                  />
                )}
              </ImageWrapper>
            ))}
        </PhotoContainer>
        {displayedImages < albums.flatMap(album => album.images).length && (
          <LoadMoreButton onClick={loadMorePhotos}>
            Load more
          </LoadMoreButton>
        )}
      </SecondRow>

      <div className={`fade-in ${animationStep >= 5 ? 'fade-in-visible' : ''}`}>
        <Footer />
      </div>

        {isFullscreen && selectedImage && (
          <FullscreenImage
            imageSrc={selectedImage}
            isPurchased={selectedImage.isPurchased}
            imageId={selectedImage.id.toString()}
            onClose={handleCloseFullscreen}
            isMobile={isMobile}
            date={selectedImage.date}
            isHighQuality={isHighQualityImage}
            albumName={albums.find(album => album.images.includes(selectedImage))?.locationName || ''}
          />
        )}
      </Container>
  );
};

export default AccountFullData;
