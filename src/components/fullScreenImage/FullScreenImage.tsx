import React, { useState } from 'react';
import { FullscreenImageProps } from './types';
import { 
  CloseButton, 
  FullscreenContainer, 
  DownloadButton, 
  ShareButton, 
  SeeInFrameButton 
} from '../../styles/Global.styled';
import { UnlockButton } from '../accountFullData/AccountFullData.styled';
import SharePopup from '../sharePopup/SharePopup';
import downArrow from '../../assets/images/downArrow.png';
import share from '../../assets/images/share.png';
import { dataURItoBlob } from '../../utils/ConverFunc';

const FullscreenImage: React.FC<FullscreenImageProps> = ({ imageSrc, isPurchased, imageId, onClose, isMobile, date }) => {
    const [showPopup, setShowPopup] = useState(false);
  
    const togglePopup = () => {
      setShowPopup(!showPopup);
    };
  
    return (
      <FullscreenContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <img src={imageSrc} alt="fullscreen" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        <div style={{ position: 'absolute', bottom: '30px', right: '40px', display: 'flex', gap: '29px', alignItems: 'center' }}>
          {isPurchased ? (
            <>
              <DownloadButton 
                href={URL.createObjectURL(dataURItoBlob(imageSrc))} 
                download={`image_${imageId}.jpeg`}
              >
                <img src={downArrow} alt="svg" style={{width: '24px', height: "21px" }} />Download
              </DownloadButton>
              {isMobile && (
                <ShareButton onClick={togglePopup}>
                  <img src={share} alt="svg" />
                  Share
                </ShareButton>
              )}
              <SeeInFrameButton>See in Frame</SeeInFrameButton>
            </>
          ) : (
            <UnlockButton>Unlock photos</UnlockButton>
          )}
        </div>
        {showPopup && (
          <SharePopup 
            onClose={togglePopup} 
            selectedImage={{ 
              binaryString: imageSrc, 
              id: Number(imageId), 
              isPurchased, 
              date 
            }} 
          />
        )}
      </FullscreenContainer>
    );
  };
  
  export default FullscreenImage;