import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    PayPopupContainer, 
    InnerContainer,
    Title,
    CloseIcon,
    Text,
    Row, 
    Input,
    Label,
    ButtonContainer,
    Button,
    ButtonPayPal,
    ButtonMobile
} from './PayPopup.styled';
import payPal from '../../assets/images/payPalLogo.png';
import ApplePay from '../ApplePay/ApplePay';

interface PayPopupProps {
    onClose: () => void;
    imageIds: number[];
    showAllPhotosOnly?: boolean; 
}

const PayPopup: React.FC<PayPopupProps> = ({ onClose, imageIds, showAllPhotosOnly = false }) => {
    const [selectedOption, setSelectedOption] = useState('photos');
    const [allImageIds, setAllImageIds] = useState<number[]>([]);
    const [unpaidPhotoCount, setUnpaidPhotoCount] = useState(0); 
    const [singleImageId, setSingleImageId] = useState<number | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const decodedAlbumId = decodeURIComponent(location.pathname.split("/").pop() || "");
    const pricePerPhoto = 1;
    const totalPrice = pricePerPhoto * unpaidPhotoCount;

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (selectedOption === 'photos') {
            axios.get('https://photodrop-dawn-surf-6942.fly.dev/client/images', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                console.log("API Response: ", response.data);
                const albumData = response.data.find((album: any) => album.location === decodedAlbumId);
                if (albumData) {
                    const unpurchasedImageIds = albumData.images
                        .filter((image: any) => !image.isPurchased)
                        .map((image: any) => image.id);
                    
                    if (unpurchasedImageIds.length > 0) {
                        setAllImageIds(unpurchasedImageIds);
                        setUnpaidPhotoCount(unpurchasedImageIds.length); 
                    } else {
                        console.error("No unpurchased images found in the album.");
                        setUnpaidPhotoCount(0); 
                    }
                } else {
                    console.error("Album not found for the specified location:", decodedAlbumId);
                    setUnpaidPhotoCount(0); 
                }
            })
            .catch(error => {
                console.error("Error fetching images:", error);
            });
        } else if (selectedOption === 'photo') {
            if (imageIds.length === 1) {
                setSingleImageId(imageIds[0]);
            } else {
                console.error("No valid image ID provided for single photo purchase.");
            }
        }
    }, [selectedOption, decodedAlbumId, imageIds]);

    useEffect(() => {
        console.log("Selected option:", selectedOption);
        console.log("Album ID:", decodedAlbumId);
    
        if (selectedOption === 'photos' && allImageIds.length === 0) {
            console.error("No image IDs available after fetching images.");
        }
        if (selectedOption === 'photo' && singleImageId === null) {
            console.error("No single image ID available for purchase.");
        }
    }, [allImageIds, singleImageId, selectedOption]);

    const handleCheckout = async (paymentMethod: string) => {
        let selectedImageIds: number[] = [];
        let selectedPrice = 0;

        if (selectedOption === 'photos') {
            if (allImageIds.length === 0) {
                console.error("No image IDs to process the payment.");
                alert("No images available for purchase.");
                return;
            }
            selectedImageIds = allImageIds;
            selectedPrice = selectedImageIds.length * pricePerPhoto;
        } else if (selectedOption === 'photo') {
            if (singleImageId === null) {
                console.error("No single image ID to process the payment.");
                alert("No image available for purchase.");
                return;
            }
            selectedImageIds = [singleImageId];
            selectedPrice = pricePerPhoto;
        }

        console.log("Navigating to payment with imageIds:", selectedImageIds);
        navigate('/payment', { state: { imageIds: selectedImageIds, price: selectedPrice, paymentMethod } });
    };

    const isAlbumDetailsPage = location.pathname.startsWith('/albumDetails') && decodedAlbumId;

    return (
        <PayPopupContainer>
            <InnerContainer>
                <CloseIcon onClick={onClose} />
                <Title>Unlock your photos</Title>
                <Text>
                    Download, view, and share your photos in hi-resolution with no watermark.
                </Text>
                {showAllPhotosOnly ? (
                    <Row>
                        <Input 
                            type="radio" 
                            name="photoOption" 
                            id="photos" 
                            checked={selectedOption === 'photos'} 
                            readOnly
                        />
                        <Label htmlFor="photos">
                            <span>All {unpaidPhotoCount} photos from {decodedAlbumId}</span> 
                            <span>${totalPrice}</span>
                        </Label>
                    </Row>
                ) : (
                    <>
                        <Row>
                            <Input 
                                type="radio" 
                                name="photoOption" 
                                id="photo" 
                                checked={selectedOption === 'photo'} 
                                onChange={() => setSelectedOption('photo')}
                            />
                            <Label htmlFor="photo">
                                <span>Current Photo</span>
                                <span>$1</span>
                            </Label>
                        </Row>
                        {isAlbumDetailsPage && (
                            <Row>
                                <Input 
                                    type="radio" 
                                    name="photoOption" 
                                    id="photos" 
                                    checked={selectedOption === 'photos'} 
                                    onChange={() => setSelectedOption('photos')}
                                />
                                <Label htmlFor="photos">
                                    <span>All {unpaidPhotoCount} photos from {decodedAlbumId}</span> 
                                    <span>${totalPrice}</span>
                                </Label>
                            </Row>
                        )}
                    </>
                )}
               
                <ApplePay />
                <ButtonContainer>
                    <Button onClick={() => handleCheckout('card')}>Checkout</Button>
                    <ButtonPayPal onClick={() => handleCheckout('paypal')}>
                        <img src={payPal} alt="PayPal" />
                    </ButtonPayPal>
                </ButtonContainer>
            </InnerContainer>
        </PayPopupContainer>
    );
}

export default PayPopup;
