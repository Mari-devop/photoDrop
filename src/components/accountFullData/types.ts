export interface Image {
    id: number;
    binaryString: string;
    isPurchased: boolean;
    date: string;
    isLoading?: boolean;
};
  
export interface AlbumData {
    locationName: string;
    images: Image[];
};

export interface AccountFullDataProps {
    imagesData: {
        location: string;
        images: {
        id: number;
        isPurchased: boolean;
        date: string;
        }[];
    }[];
};