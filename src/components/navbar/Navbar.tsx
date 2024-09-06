import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/images/logo.png';
import selfiePlaceholder from '../../assets/images/Social.png';
import {
  NavbarContainer,
  Arrow,
  ArrowContainer,
  SelfieImage,
  SelfieContainer,
  Title,
  TextContainer,
  Wrapper,
  Context,
  Button
} from './Navbar.styled';
import arrow from '../../assets/images/arrowLeft.png';
import PayPopup from '../payPopup/PayPopup';

const Navbar = () => {
  const location = useLocation();
  const albumId = decodeURIComponent(location.pathname.split("/").pop() || "");
  const [selfieSrc, setSelfieSrc] = useState<string | null>(null);
  const [areAllPhotosPurchased, setAreAllPhotosPurchased] = useState(false);
  const [showPayPopup, setShowPayPopup] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const photoCount = searchParams.get('photos');
  const date = searchParams.get('date');

  useEffect(() => {
    if (showPayPopup) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'auto'; 
    }

    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, [showPayPopup]);

  useEffect(() => {
    const fetchSelfie = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('Auth token not found in localStorage');
        return;
      }

      try {
        const response = await axios.get(
          'https://photodrop-dawn-surf-6942.fly.dev/client/info',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const selfieData = response.data?.selfie?.data;

        if (selfieData && Array.isArray(selfieData)) {
          const byteArray = new Uint8Array(selfieData);
          const blob = new Blob([byteArray], { type: 'image/jpeg' });
          const imageUrl = URL.createObjectURL(blob);

          setSelfieSrc(imageUrl);
          localStorage.setItem('selfieSrc', imageUrl); 
        } else {
          console.error('Invalid selfie data structure:', selfieData);
        }
      } catch (error) {
        console.error('Error fetching selfie from server:', error);
      }
    };

    const fetchAlbumPhotos = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('Auth token not found in localStorage');
        return;
      }

      try {
        const albumResponse = await axios.get(
          'https://photodrop-dawn-surf-6942.fly.dev/client/images',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (albumResponse.status === 200 && Array.isArray(albumResponse.data)) {
          const selectedAlbum = albumResponse.data.find((album: any) => album.location === albumId);

          if (selectedAlbum) {
            const allPurchased = selectedAlbum.images.every((image: any) => image.isPurchased);
            setAreAllPhotosPurchased(allPurchased);
          }
        }
      } catch (error) {
        console.error('Error fetching album photos:', error);
      }
    };

    fetchSelfie();
    if (albumId) {
      fetchAlbumPhotos();
    }

    return () => {
      if (selfieSrc) {
        URL.revokeObjectURL(selfieSrc);
      }
    };
  }, [location.pathname, albumId]);

  const isAlbumDetailsPage = location.pathname.startsWith('/albumDetails') && albumId;

  const formattedDate = date 
    ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
    : '';
    
  const handleUnlockPhotosClick = () => {
    setShowPayPopup(true);
    setTimeout(() => {
      const popupElement = document.getElementById('pay-popup');
      if (popupElement) {
        popupElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 0);
  };
    
  const handleClosePayPopup = () => {
    setShowPayPopup(false);
  };

  return (
    <NavbarContainer>
      {location.pathname === '/nameedit' && (
        <ArrowContainer>
          <Link to="/accountsettings">
            <Arrow src={arrow} alt="arrow" tabIndex={1} />
          </Link>
        </ArrowContainer>
      )}
      {location.pathname === '/accountsettings' && (
        <ArrowContainer>
          <Link to="/account">
            <Arrow src={arrow} alt="arrow" />
          </Link>
        </ArrowContainer>
      )}
      {!isAlbumDetailsPage && (
        <Link to="/account">
          <img src={logo} alt="logo" />
        </Link>
      )}
     {location.pathname === '/account' && (
        <SelfieContainer>
          <Link to="/accountsettings">
            <SelfieImage src={selfieSrc || selfiePlaceholder} alt="selfie" />
          </Link>
        </SelfieContainer>
      )}

      {isAlbumDetailsPage && (
        <Context>
          <div>
            <ArrowContainer>
              <Link to="/account">
                <Arrow src={arrow} alt="arrow" />
              </Link>
            </ArrowContainer>
            <Wrapper>
              <Title>{albumId}</Title> 
              <TextContainer>
                <span>{photoCount} photos</span>
                <p>{formattedDate}</p>
              </TextContainer>
            </Wrapper>
          </div>
          <div>
            {!areAllPhotosPurchased && <Button onClick={handleUnlockPhotosClick}>Unlock your photos</Button>}
          </div>
        </Context>
      )}
      {showPayPopup && (
        <PayPopup 
          onClose={handleClosePayPopup}
          imageIds={[]} 
          showAllPhotosOnly={true} 
          albumName={albumId} 
        />
      )}
    </NavbarContainer>
  );
};

export default Navbar;
