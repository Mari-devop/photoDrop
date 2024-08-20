import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainContainer, Title } from '../../styles/Global.styled';
import { Image, Subtitle, RoundButton, Overlay, CountdownOverlay } from './Selfie.styled';
import SelfiePopup from '../../components/selfiePopup/SelfiePopup';
import SelfiePopupMobile from '../../components/SelfiePopupMobile/SelfiePopupMobile';
import SelfieEdit from '../../components/selfieEdit/SelfieEdit';
import selfiePlaceholder from '../../assets/images/Social.png';
import { useSelfie } from '../../hooks/useSelfie';

const Selfie = () => {
  const {
    selfieSrc,
    showSelfieEdit,
    countdown,
    isCountingDown,
    videoRef,
    canvasRef,
    handleFileUpload,
    handleCameraCapture,
    handleRetake,
    saveSelfie,
    setShowSelfieEdit,
  } = useSelfie();

  const [showPopup, setShowPopup] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 500);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const onClose = () => {
    setShowPopup(false);
    setShowSelfieEdit(false);
  };

  const handleSave = async (croppedImageArrayBuffer: ArrayBuffer) => {
    await saveSelfie(croppedImageArrayBuffer);
    setShowSelfieEdit(false);
    navigate('/account');
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
        <Image 
          src={selfieSrc || selfiePlaceholder} 
          alt="selfie" 
          style={{borderRadius: selfieSrc ? '50%' : '0%' }} 
        />
        <RoundButton onClick={togglePopup}>+</RoundButton>
        {showPopup && isSmallScreen && (
          <div ref={popupRef}>
            <SelfiePopupMobile onFileUpload={handleFileUpload} onCameraCapture={handleCameraCapture} />
          </div>
        )}
        {showPopup && !isSmallScreen && (
          <>
            <Overlay onClick={togglePopup} />
            <SelfiePopup onClose={onClose} onFileUpload={handleFileUpload} onCameraCapture={handleCameraCapture} />
          </>
        )}
        {showSelfieEdit && (
          <SelfieEdit
            onClose={onClose}
            selfieSrc={selfieSrc}
            onRetake={handleRetake}
            onSave={handleSave}
          />
        )}

        <video ref={videoRef} style={{ display: 'none' }} />
        <canvas ref={canvasRef} style={{ display: 'none' }} width={640} height={480} />
      </div>
      {isCountingDown && countdown > 0 && (
        <CountdownOverlay>{countdown}</CountdownOverlay>
      )}
    </MainContainer>
  );
};

export default Selfie;
