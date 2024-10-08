import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import { useSelfie } from '../../hooks/useSelfie';
import { SettingsContainer, Subtitle, Pencil, RoundButton, TextContainer, TextHolder, Text, Label, Arrow } from './AccountSettings.styled';
import { Title } from '../../styles/Global.styled';
import { Image, Overlay, CountdownOverlay } from '../Selfie/Selfie.styled'; 
import SelfiePopup from '../../components/selfiePopup/SelfiePopup';
import SelfieEdit from '../../components/selfieEdit/SelfieEdit';
import selfiePlaceholder from '../../assets/images/Social.png';
import pencil from '../../assets/images/pencil.png';
import arrow from '../../assets/images/arrowRight.png';

const AccountSettings = () => {
  const {
    selfieSrc,
    tempSelfieSrc,
    showPopup,
    showSelfieEdit,
    isSmallScreen,
    videoRef,
    canvasRef,
    popupRef,
    togglePopup,
    handleClosePopup,
    handleFileUpload,
    handleCameraCapture,
    saveSelfie,
    handleRetake,
    setSelfieSrc,
    setShowSelfieEdit,
    isCountingDown,
    countdown,
  } = useSelfie();

  const photoInputRef = useRef<HTMLInputElement | null>(null);

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
  }, [setSelfieSrc]);

  const handleSave = async (croppedImageArrayBuffer: ArrayBuffer) => {
    await saveSelfie(croppedImageArrayBuffer);
    setShowSelfieEdit(false);
  };

  const handleRoundButtonClick = () => {
    if (isSmallScreen && photoInputRef.current) {
      photoInputRef.current.click(); 
    } else {
      togglePopup(); 
    }
  };

  return (
    <SettingsContainer>
      <Title>Welcome</Title>
      <Subtitle>Your selfie</Subtitle>
      <div style={{ position: 'relative' }}>
        <Image 
          src={selfieSrc || selfiePlaceholder} 
          alt="selfie" 
          style={{ borderRadius: selfieSrc ? '50%' : '0%' }} 
        />
        <RoundButton onClick={handleRoundButtonClick}><Pencil src={pencil} alt="pencil" /></RoundButton>
      
        {showPopup && !isSmallScreen && (
          <>
            <Overlay onClick={togglePopup} />
            <SelfiePopup onClose={handleClosePopup} onFileUpload={handleFileUpload} onCameraCapture={handleCameraCapture} />
          </>
        )}
        {showSelfieEdit && (
          <SelfieEdit
            onClose={() => setShowSelfieEdit(false)} 
            tempSelfieSrc={tempSelfieSrc} 
            onRetake={handleRetake}
            onSave={handleSave} 
          />
        )}

        <input 
          ref={photoInputRef} 
          type="file" 
          style={{ display: 'none' }} 
          accept="image/*"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
        />
        <video ref={videoRef} style={{ display: 'none' }} />
        <canvas ref={canvasRef} style={{ display: 'none' }} width={640} height={480} />
      </div>
      <TextContainer>
        <TextHolder>
          <Label>Your name</Label>
          <Text>Tell us your name to personalize communications.</Text>
        </TextHolder>
        <Link to="/nameedit"><Arrow src={arrow} alt="arrow" /></Link>
      </TextContainer>
      {isCountingDown && countdown > 0 && (
        <CountdownOverlay>{countdown}</CountdownOverlay>
      )}
    </SettingsContainer>
  );
};

export default AccountSettings;
