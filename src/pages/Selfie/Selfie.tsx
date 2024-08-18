import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainContainer, Title } from '../../styles/Global.styled';
import selfie from '../../assets/images/Social.png';
import { Image, Subtitle, RoundButton, Overlay } from './Selfie.styled';
import SelfiePopup from '../../components/selfiePopup/SelfiePopup';
import SelfiePopupMobile from '../../components/SelfiePopupMobile/SelfiePopupMobile';

const Selfie = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 500);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const onClose = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 500);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (showPopup && isSmallScreen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup, isSmallScreen]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <MainContainer>
      <Title>Add a selfie</Title>
      <Subtitle>A selfie allows your photos to be synced with your account.</Subtitle>
      <div style={{ position: 'relative' }}>
        <Image src={selfie} alt="selfie" />
        <RoundButton onClick={togglePopup}>+</RoundButton>
        {showPopup && isSmallScreen && (
          <div ref={popupRef}>
            <SelfiePopupMobile />
          </div>
        )}
        {showPopup && !isSmallScreen && (
          <>
            <Overlay onClick={togglePopup} />
            <SelfiePopup onClose={onClose} />
          </>
        )}
      </div>
    </MainContainer>
  );
};

export default Selfie;
