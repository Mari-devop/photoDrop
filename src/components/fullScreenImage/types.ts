export interface FullscreenImageProps {
    imageSrc: string;
    isPurchased: boolean;
    imageId: string;
    onClose: () => void;
    isMobile: boolean;
    date: string; 
}