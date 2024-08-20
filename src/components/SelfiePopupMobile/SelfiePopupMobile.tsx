import React, { useRef } from 'react';
import { MobileContainer, Row, Image } from './SelfiePopupMobile.styled';
import photos from '../../assets/images/File (5) 3.png';
import camera from '../../assets/images/File (5) 4.png';
import folder from '../../assets/images/File (5) 5.png';

interface SelfiePopupMobileProps {
  onFileUpload: (file: File) => void;
  onCameraCapture: () => void;
}

const SelfiePopupMobile = ({ onFileUpload, onCameraCapture }: SelfiePopupMobileProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <MobileContainer>
      <Row onClick={handleFileUploadClick}>
        <p>Photo Library</p>
        <Image src={photos} alt="photos" />
      </Row>
      <Row onClick={onCameraCapture}>
        <p>Take Photo</p>
        <Image src={camera} alt="camera" />
      </Row>
      <Row onClick={handleFileUploadClick}>
        <p>Choose File</p>
        <Image src={folder} alt="folder" />
      </Row>
      <input 
        ref={fileInputRef} 
        type="file" 
        style={{ display: 'none' }} 
        accept="image/*" 
        capture
        onChange={(e) => e.target.files && onFileUpload(e.target.files[0])} 
      />
    </MobileContainer>
  );
};

export default SelfiePopupMobile;
