import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import {
  NavbarContainer,
  Arrow,
  ArrowContainer,
  SelfieImage,
  SelfieContainer,
} from './Navbar.styled';
import arrow from '../../assets/images/arrowLeft.png';
import axios from 'axios';

const Navbar = () => {
  const location = useLocation();
  const [selfieSrc, setSelfieSrc] = useState<string | null>(null);

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

        console.log('Full Server Response:', response.data);

        const selfieData = response.data?.selfie?.selfie?.data;

        if (selfieData && Array.isArray(selfieData)) {
          const byteArray = new Uint8Array(selfieData);
          const blob = new Blob([byteArray], { type: 'image/jpeg' });
          const imageUrl = URL.createObjectURL(blob);

          setSelfieSrc(imageUrl);
          console.log('Generated Image URL:', imageUrl);
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

  return (
    <NavbarContainer>
      {location.pathname === '/nameedit' && (
        <ArrowContainer>
          <Link to="accountsettings">
            <Arrow src={arrow} alt="arrow" />
          </Link>
        </ArrowContainer>
      )}
      {location.pathname === '/accountsettings' && (
        <ArrowContainer>
          <Link to="account">
            <Arrow src={arrow} alt="arrow" />
          </Link>
        </ArrowContainer>
      )}
      <img src={logo} alt="logo" />
      {location.pathname === '/account' && selfieSrc && (
        <SelfieContainer>
          <Link to="accountsettings">
            <SelfieImage src={selfieSrc} alt="selfie" />
          </Link>
        </SelfieContainer>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
