export interface ApplePayProps {
    imageIds: number[];
    onClose: () => void; 
    amount: number; 
    albumName: string;
    isAlbumPurchased: boolean;
};