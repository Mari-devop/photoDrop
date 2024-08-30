export interface SelfieEditProps {
    onClose: () => void;
    tempSelfieSrc: string | null; 
    onRetake: () => void;
    onSave: (croppedImage: ArrayBuffer) => void;
};