import React, { useRef } from 'react';
import { Container, Subtitle, Button, CloseIcon, InnerContainer, ButtonContainer } from './SelfiePopup.styled';

interface SelfiePopupProps {
  onClose: () => void;
  onFileUpload: (file: File) => void;
  onCameraCapture: () => void;
}

const SelfiePopup = ({ onClose, onFileUpload, onCameraCapture }: SelfiePopupProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Container>
      <InnerContainer>
        <CloseIcon onClick={onClose} />
        <Subtitle>Upload options</Subtitle>
        <ButtonContainer>
          <Button onClick={handleFileUploadClick}>Upload a file</Button>
          <Button onClick={onCameraCapture}>Use camera</Button>
        </ButtonContainer>
        <input 
          ref={fileInputRef} 
          type="file" 
          style={{ display: 'none' }} 
          accept="image/*" 
          onChange={(e) => e.target.files && onFileUpload(e.target.files[0])} 
        />
      </InnerContainer>
    </Container>
  );
};

export default SelfiePopup;
