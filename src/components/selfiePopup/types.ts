export interface SelfiePopupProps {
    onClose: () => void;
    onFileUpload: (file: File) => void;
    onCameraCapture: () => void;
}