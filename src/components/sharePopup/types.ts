export interface AlbumImage {
    id: number;
    binaryString: string;
    isPurchased: boolean;
    date: string;
}

export interface SharePopupProps {
    selectedImage: AlbumImage | null;
    onClose: () => void;
}