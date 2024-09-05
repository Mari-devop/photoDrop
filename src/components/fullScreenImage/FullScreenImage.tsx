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

const FullscreenImage: React.FC<FullscreenImageProps> = ({ imageSrc, isPurchased, imageId, onClose, isMobile, date }) => {
    const [showPayPopup, setShowPayPopup] = useState(false);
    const [showSharePopup, setShowSharePopup] = useState(false); 
    const [highQualitySrc, setHighQualitySrc] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false); 
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
        if (isPurchased) {
            const token = localStorage.getItem('authToken'); 
            setIsLoading(true); 
            fetch(`https://photodrop-dawn-surf-6942.fly.dev/client/fullImage/${imageId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                const byteArray = new Uint8Array(data.imageData.data);
                const base64String = arrayBufferToBase64(byteArray.buffer); 
                const highQualityImage = `data:image/jpeg;base64,${base64String}`;
                setHighQualitySrc(highQualityImage); 
                setIsLoading(false); 
            })
            .catch((error) => {
                console.error('Error loading in high quality', error);
                setIsLoading(false); 
            });
        }
    }, [isPurchased, imageId]);

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
            const downloadSrc = highQualitySrc || imageSrc;
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
            } else if (downloadSrc && typeof downloadSrc === 'object' && 'byteLength' in downloadSrc) {
                const blob = bufferToBlob(downloadSrc, 'image/jpeg');
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
        <FocusTrap active={focusEnabled && !showPayPopup}>
            <FullscreenContainer>
                <CloseButton onClick={onClose} tabIndex={focusEnabled ? 2 : -1}>×</CloseButton>

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
                    src={highQualitySrc || imageSrc}  
                    alt="fullscreen" 
                    style={{ width: '100%', height: '100%', objectFit: 'contain', display: isLoading ? 'none' : 'block' }} 
                />

                <div style={{ position: 'absolute', bottom: '30px', right: '40px', display: 'flex', gap: '29px', alignItems: 'center' }}>
                    {isPurchased ? (
                        <>
                            <DownloadButton onClick={handleDownloadClick} tabIndex={1}>
                                <img src={downArrow} alt="svg" style={{ width: '24px', height: '21px' }} />Download
                            </DownloadButton>
                            {isMobile && (
                                <ShareButton onClick={toggleSharePopup} tabIndex={3}>  
                                    <img src={share} alt="svg" />
                                    Share
                                </ShareButton>
                            )}
                            <SeeInFrameButton tabIndex={-1}>See in Frame</SeeInFrameButton>
                        </>
                    ) : (
                        <UnlockButton onClick={togglePayPopup} tabIndex={5}>Unlock photo</UnlockButton>
                    )}
                </div>
                {showPayPopup && (
                    <FocusTrap active={true}>
                        <PayPopup 
                            onClose={togglePayPopup} 
                            imageIds={[Number(imageId)]}   
                        />
                    </FocusTrap>
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
        </FocusTrap>
    );
};

export default FullscreenImage;
