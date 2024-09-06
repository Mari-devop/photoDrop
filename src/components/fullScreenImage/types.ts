import { Image } from "../accountFullData/types";

export interface FullscreenImageProps {
    imageSrc: Image;
    isPurchased: boolean;
    imageId: string;
    onClose: () => void;
    isMobile: boolean;
    date: string; 
    isHighQuality?: boolean;
}