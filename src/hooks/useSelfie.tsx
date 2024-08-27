import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const useSelfie = () => {
  const [selfieSrc, setSelfieSrc] = useState<string | null>(null);
  const [tempSelfieSrc, setTempSelfieSrc] = useState<string | null>(null); 
  const [showPopup, setShowPopup] = useState(false);
  const [showSelfieEdit, setShowSelfieEdit] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 500);
  const [countdown, setCountdown] = useState(5);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 501);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setTempSelfieSrc(reader.result as string); 
      setShowSelfieEdit(true);
      setShowPopup(false);
    };
    reader.readAsDataURL(file);
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current && canvasRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        setCountdown(5);
        setIsCountingDown(true);
        const countdownInterval = setInterval(() => {
          setCountdown((prevCount) => {
            if (prevCount === 1) {
              clearInterval(countdownInterval);
              setIsCountingDown(false);
              const context = canvasRef.current?.getContext('2d');
              if (context && videoRef.current && canvasRef.current) {
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                const imageDataUrl = canvasRef.current.toDataURL('image/png');
                setTempSelfieSrc(imageDataUrl); 
                setShowSelfieEdit(true);
                setShowPopup(false);
              }
              stream.getTracks().forEach(track => track.stop());
            }
            return prevCount - 1;
          });
        }, 1000);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const saveSelfie = async (selfieArrayBuffer: ArrayBuffer) => {
    try {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      const blob = new Blob([selfieArrayBuffer], { type: 'image/jpeg' });
      formData.append("images", blob, "selfie.jpg");

      if (token) {
        await axios.put('https://photodrop-dawn-surf-6942.fly.dev/client/editSelfie', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setSelfieSrc(URL.createObjectURL(blob)); 
        setShowSelfieEdit(false);
      }
    } catch (error) {
      console.error('Error saving selfie to server:', error);
      alert('Failed to save selfie. Please try again.');
    }
  };

  const handleRetake = () => {
    setTempSelfieSrc(null); 
    setShowSelfieEdit(false); 
    togglePopup(); 
  };

  return {
    selfieSrc,
    tempSelfieSrc,
    showPopup,
    showSelfieEdit,
    isSmallScreen,
    countdown,
    isCountingDown,
    videoRef,
    canvasRef,
    popupRef,
    togglePopup,
    handleClosePopup,
    handleFileUpload,
    handleCameraCapture,
    saveSelfie,
    handleRetake,
    setSelfieSrc,
    setShowSelfieEdit,
  };
};
