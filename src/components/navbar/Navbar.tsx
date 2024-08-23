import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
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
import axios from 'axios';

const Navbar = () => {
  const location = useLocation();
  const albumId = location.pathname.split("/").pop();
  const [selfieSrc, setSelfieSrc] = useState<string | null>(null);
  const searchParams = new URLSearchParams(location.search);
  const photoCount = searchParams.get('photos');
  const date = searchParams.get('date');

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

        const selfieData = response.data?.selfie?.selfie?.data;

        if (selfieData && Array.isArray(selfieData)) {
          const byteArray = new Uint8Array(selfieData);
          const blob = new Blob([byteArray], { type: 'image/jpeg' });
          const imageUrl = URL.createObjectURL(blob);

          setSelfieSrc(imageUrl);
        } else {
          console.error('Invalid selfie data structure:', selfieData);
        }
      } catch (error) {
        console.error('Error fetching selfie from server:', error);
      }
    };

    fetchSelfie();

    return () => {
      if (selfieSrc) {
        URL.revokeObjectURL(selfieSrc);
      }
    };
  }, [location.pathname]);

  const isAlbumDetailsPage = location.pathname.startsWith('/albumDetails') && albumId;

  const formattedDate = date 
    ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
    : '';
    
  return (
    <NavbarContainer>
      {location.pathname === '/nameedit' && (
        <ArrowContainer>
          <Link to="/accountsettings">
            <Arrow src={arrow} alt="arrow" />
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
        <img src={logo} alt="logo" />
      )}
      {location.pathname === '/account' && selfieSrc && (
        <SelfieContainer>
          <Link to="/accountsettings">
            <SelfieImage src={selfieSrc} alt="selfie" />
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
                <p>{formattedDate}</p>
                <span>{photoCount} photos</span>
              </TextContainer>
            </Wrapper>
          </div>
          <div>
            <Button>Unlock your photos</Button>
          </div>
        </Context>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
