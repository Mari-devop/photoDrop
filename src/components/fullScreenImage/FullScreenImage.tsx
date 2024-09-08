import React, { useState, useRef, useEffect } from 'react';
import FocusTrap from 'focus-trap-react';
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
import { ThreeCircles } from 'react-loader-spinner'; 
import { dataURItoBlob } from '../../utils/ConverFunc';

const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

const FullscreenImage: React.FC<FullscreenImageProps> = ({ imageSrc: selectedImage, isPurchased, imageId, albumImages, onClose, isMobile, date, isHighQuality, albumName  }) => {
    const [showPayPopup, setShowPayPopup] = useState(false);
    const [showSharePopup, setShowSharePopup] = useState(false); 
    const [isLoading, setIsLoading] = useState<boolean>(false); 
    const [isUnlockingAlbum, setIsUnlockingAlbum] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const [focusEnabled, setFocusEnabled] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
            if (event.key === 'Tab' && !showPayPopup) {
                setFocusEnabled(true); 
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose, showPayPopup]);

    useEffect(() => {
        const fetchHighQualityImage = async () => {
            if (isPurchased && !isHighQuality) {
                const token = localStorage.getItem('authToken');
                setIsLoading(true);
                
                try {
                    const response = await fetch(`https://photodrop-dawn-surf-6942.fly.dev/client/fullImage/${imageId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();
                    const byteArray = new Uint8Array(data.imageData.data);
                    const base64String = arrayBufferToBase64(byteArray.buffer);
                    const highQualityImage = `data:image/jpeg;base64,${base64String}`;
                    
                    selectedImage.binaryString = highQualityImage;
                } catch (error) {
                    console.error('Error loading high quality image', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchHighQualityImage();
    }, [isPurchased, imageId, selectedImage, isHighQuality]);

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
            if (isLoading) {
                return;
            }
            const downloadSrc = selectedImage.binaryString; 
            if (typeof downloadSrc === 'string') {
                if (isBase64(downloadSrc)) {
                    const blob = dataURItoBlob(downloadSrc); 
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
                    a.href = downloadSrc;
                    a.download = `image_${imageId}.jpeg`; 
                    document.body.appendChild(a); 
                    a.click(); 
                    document.body.removeChild(a); 
                }
            }
        } catch (error) {
            console.error("Download error: ", error);
        }
    };
    
    const handleUnlockPhoto = () => {
        setShowPayPopup(true);  
    };

    const handleUnlockAlbum = () => {
        setIsUnlockingAlbum(true);
        setShowPayPopup(true); 
    };

    return (
        <FocusTrap active={focusEnabled && !showPayPopup}>
            <FullscreenContainer>
              
                <CloseButton onClick={onClose}>×</CloseButton>

                {isLoading && (
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <ThreeCircles
                            visible={true}
                            height="80"
                            width="80"
                            color="#6D6D6D"
                            ariaLabel="three-circles-loading"
                        />
                    </div>
                )}

                <img 
                    ref={imgRef}
                    src={selectedImage.binaryString}  
                    alt="fullscreen" 
                    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block'}}  
                />
                
                <div style={{ position: 'absolute', bottom: '30px', right: '40px', display: 'flex', gap: '29px', alignItems: 'center' }}>
                    {isPurchased ? (
                        <>
                            <DownloadButton tabIndex={0} onClick={handleDownloadClick}>
                                <img src={downArrow} alt="svg" style={{ width: '24px', height: '21px' }} />Download
                            </DownloadButton>
                            {isMobile && (
                                 <ShareButton  onClick={toggleSharePopup}> 
                                    <img src={share} alt="svg" />
                                    Share
                                </ShareButton>
                            )}
                            <SeeInFrameButton>See in Frame</SeeInFrameButton>
                        </>
                    ) : (
                        <>
                            <UnlockButton onClick={handleUnlockPhoto}>Unlock photo</UnlockButton>
                            {albumImages && (
                                <UnlockButton onClick={handleUnlockAlbum}>Unlock entire album</UnlockButton>
                            )}
                         </>
                    )}
                </div>
               
                {showPayPopup && (
                    <PayPopup 
                        onClose={() => setShowPayPopup(false)} 
                        imageIds={albumImages?.map((image) => Number(image.id))!} 
                        selectedImageId={imageId}
                        albumName={albumName}                
                    />
                )}


                {showSharePopup && (
                    <SharePopup 
                        selectedImage={{ 
                            binaryString: selectedImage.binaryString, 
                            id: Number(imageId), 
                            isPurchased,           
                            date                   
                        }}  
                        onClose={toggleSharePopup}  
                    />
                )}
            </FullscreenContainer>
            </FocusTrap>
    );
};

export default FullscreenImage;
