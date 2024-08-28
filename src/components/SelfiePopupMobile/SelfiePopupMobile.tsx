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
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePhotoLibraryClick = () => {
    if (photoInputRef.current) {
      photoInputRef.current.click();
    }
  };

  const handleCameraCaptureClick = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };


  return (
    <MobileContainer>
      <Row onClick={handlePhotoLibraryClick}>
        <p>Photo Library</p>
        <Image src={photos} alt="photos" />
      </Row>
      <Row onClick={handleCameraCaptureClick}>
        <p>Take Photo</p>
        <Image src={camera} alt="camera" />
      </Row>
      <Row onClick={handleFileUploadClick}>
        <p>Choose File</p>
        <Image src={folder} alt="folder" />
      </Row>
      <input 
        ref={photoInputRef} 
        type="file" 
        style={{ display: 'none' }} 
        accept="image/*" 
        onChange={(e) => e.target.files && onFileUpload(e.target.files[0])} 
      />
      <input 
        ref={cameraInputRef} 
        type="file" 
        style={{ display: 'none' }} 
        accept="image/*" 
        capture="environment" 
        onChange={(e) => e.target.files && onFileUpload(e.target.files[0])} 
      />
      <input 
        ref={fileInputRef} 
        type="file" 
        style={{ display: 'none' }} 
        onChange={(e) => e.target.files && onFileUpload(e.target.files[0])} 
      />
    </MobileContainer>
  );
};

export default SelfiePopupMobile;
