export interface FullscreenImageProps {
    imageSrc: { binaryString: string };
    isPurchased: boolean;
    imageId: number;
    albumImages?: { id: string | number; binaryString: string }[]; 
    onClose: () => void;
    isMobile: boolean;
    date: string;
    isHighQuality: boolean;
    albumName: string;
    imagesIdsToBuy?: number[];
}
