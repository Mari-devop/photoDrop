import React, { useState, useCallback } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { Overlay, SelfieContainer, Title, CloseIcon, InnerContainer, Text, ButtonContainer, ButtonRetake, ButtonSave } from './SelfieEdit.styled';
import { getCroppedImg } from '../../utils/CropImage';
import { SelfieEditProps } from './types';

const SelfieEdit = ({ onClose, tempSelfieSrc, onRetake, onSave }: SelfieEditProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = useCallback(async () => {
    if (tempSelfieSrc && croppedAreaPixels) {
      try {
        const croppedImageBuffer = await getCroppedImg(tempSelfieSrc, croppedAreaPixels);
        onSave(croppedImageBuffer);
        onClose(); 
      } catch (error) {
        console.error(error);
      }
    }
  }, [tempSelfieSrc, croppedAreaPixels, onSave, onClose]);

  return (
    <>
      <Overlay />
      <SelfieContainer>
        <InnerContainer>
          <CloseIcon onClick={onClose} />
          <Title>Take selfie</Title>
          <Text>Drag and zoom image to crop</Text>
          <div 
            style={{ 
              position: 'relative', 
              width: '185px', 
              height: '185px', 
              borderRadius: '50%', 
              overflow: 'hidden', 
              boxSizing: 'border-box', 
              marginBottom: '95px',
              backgroundColor: 'transparent' 
            }}
          >
            <Cropper 
              image={tempSelfieSrc || undefined}
              crop={crop}
              zoom={zoom}
              aspect={1} 
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              style={{
                cropAreaStyle: { 
                  display: 'none'
                },
                containerStyle: { 
                  borderRadius: '50%', 
                  width: '100%', 
                  height: '100%',
                  backgroundColor: 'transparent', 
                  boxSizing: 'border-box',
                  overflow: 'hidden', 
                },
                mediaStyle: { 
                  borderRadius: '50%', 
                  width: '100%', 
                  height: '100%',
                  objectFit: 'cover', 
                }
              }}
              showGrid={false}  
            />
          </div>
          <ButtonContainer>
            <ButtonRetake onClick={onRetake}>Retake</ButtonRetake>
            <ButtonSave onClick={handleSave}>Save</ButtonSave>
          </ButtonContainer>
        </InnerContainer>
      </SelfieContainer>
    </>
  );
}

export default SelfieEdit;
