import React, { useState, useRef } from 'react';
import { FullscreenImageProps } from './types';
import { 
  CloseButton, 
  FullscreenContainer, 
  DownloadButton, 
  ShareButton, 
  SeeInFrameButton 
} from '../../styles/Global.styled';
import { UnlockButton } from '../accountFullData/AccountFullData.styled';
import downArrow from '../../assets/images/downArrow.png';
import share from '../../assets/images/share.png';
import PayPopup from '../payPopup/PayPopup';
import SharePopup from '../sharePopup/SharePopup';  
import { dataURItoBlob } from '../../utils/ConverFunc';

const FullscreenImage: React.FC<FullscreenImageProps> = ({ imageSrc, isPurchased, imageId, onClose, isMobile, date }) => {
    const [showPayPopup, setShowPayPopup] = useState(false);
    const [showSharePopup, setShowSharePopup] = useState(false); 
    const imgRef = useRef<HTMLImageElement>(null);

    const togglePayPopup = () => {
      setShowPayPopup(!showPayPopup);
    };

    const toggleSharePopup = () => {
      setShowSharePopup(!showSharePopup);  
    };

    const isBase64 = (str: string) => {
        const base64Regex = /^data:image\/(png|jpeg|jpg);base64,/;
        return base64Regex.test(str);
    };

    const bufferToBlob = (buffer: ArrayBuffer, mimeType: string): Blob => {
        return new Blob([buffer], { type: mimeType });
    };

    const handleDownloadClick = () => {
        try {
            if (typeof imageSrc === 'string') {
                if (isBase64(imageSrc)) {
                    const blob = dataURItoBlob(imageSrc);
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `image_${imageId}.jpeg`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                } else {
                    const a = document.createElement('a');
                    a.href = imageSrc;
                    a.download = `image_${imageId}.jpeg`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            } else if (imageSrc && typeof imageSrc === 'object' && 'byteLength' in imageSrc) {
                const blob = bufferToBlob(imageSrc, 'image/jpeg');
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `image_${imageId}.jpeg`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error("Download error: ", error);
        }
    };

    return (
        <FullscreenContainer>
            <CloseButton onClick={onClose}>×</CloseButton>
            <img 
                ref={imgRef}
                src={typeof imageSrc === 'string' 
                    ? imageSrc 
                    : URL.createObjectURL(bufferToBlob(imageSrc as ArrayBuffer, 'image/jpeg'))} 
                alt="fullscreen" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
            <div style={{ position: 'absolute', bottom: '30px', right: '40px', display: 'flex', gap: '29px', alignItems: 'center' }}>
                {isPurchased ? (
                    <>
                        <DownloadButton onClick={handleDownloadClick}>
                            <img src={downArrow} alt="svg" style={{width: '24px', height: "21px" }} />Download
                        </DownloadButton>
                        {isMobile && (
                            <ShareButton onClick={toggleSharePopup}>  
                                <img src={share} alt="svg" />
                                Share
                            </ShareButton>
                        )}
                        <SeeInFrameButton>See in Frame</SeeInFrameButton>
                    </>
                ) : (
                    <UnlockButton onClick={togglePayPopup}>Unlock photos</UnlockButton>
                )}
            </div>
            {showPayPopup && (
                <PayPopup 
                    onClose={togglePayPopup} 
                    imageIds={[Number(imageId)]}     
                />
            )}
          {showSharePopup && (
            <SharePopup 
                selectedImage={{ 
                    binaryString: imageSrc, 
                    id: Number(imageId), 
                    isPurchased,           
                    date                   
                }}  
                onClose={toggleSharePopup}  
            />
        )}
        </FullscreenContainer>
    );
};

export default FullscreenImage;
