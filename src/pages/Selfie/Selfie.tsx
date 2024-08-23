import React, { useEffect } from 'react';
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
    tempSelfieSrc,
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
    togglePopup,
    showPopup,
    isSmallScreen,
    popupRef,
    handleClosePopup,
  } = useSelfie();

  const navigate = useNavigate();

  const onClose = () => {
    setShowSelfieEdit(false);
  };

  const handleSave = async (croppedImageArrayBuffer: ArrayBuffer) => {
    await saveSelfie(croppedImageArrayBuffer);
    setShowSelfieEdit(false);
    navigate('/account');
  };

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
          style={{ borderRadius: selfieSrc ? '50%' : '0%' }} 
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
            <SelfiePopup onClose={handleClosePopup} onFileUpload={handleFileUpload} onCameraCapture={handleCameraCapture} />
          </>
        )}
        {showSelfieEdit && (
          <SelfieEdit
            onClose={onClose}
            tempSelfieSrc={tempSelfieSrc} 
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
