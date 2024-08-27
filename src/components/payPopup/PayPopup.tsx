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
import applePay from '../../assets/images/applepay.png';

interface PayPopupProps {
    onClose: () => void;
    imageIds: number[];
    showAllPhotosOnly?: boolean; 
}

const PayPopup: React.FC<PayPopupProps> = ({ onClose, imageIds, showAllPhotosOnly = false }) => {
    const [selectedOption, setSelectedOption] = useState('photos');
    const [allImageIds, setAllImageIds] = useState<number[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const albumId = location.pathname.split("/").pop();
    const searchParams = new URLSearchParams(location.search);
    const photoCount = parseInt(searchParams.get('photos') || '0');
    const pricePerPhoto = 1;
    const totalPrice = pricePerPhoto * photoCount;

    useEffect(() => {
        if (selectedOption === 'photos') {
            const token = localStorage.getItem('authToken');
            axios.get('https://photodrop-dawn-surf-6942.fly.dev/client/images', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                const albumData = response.data.find((album: any) => album.location === albumId);
                if(albumData) {
                    const unpurchasedImageIds = albumData.images
                        .filter((image: any) => !image.isPurchased)
                        .map((image: any) => image.id);
                    setAllImageIds(unpurchasedImageIds);
                }
            })
            .catch(error => {
                console.error("Error fetching images:", error);
            });
        }
    }, [selectedOption, albumId]);

    const handleCheckout = async () => {
        const selectedImageIds = allImageIds;
        const selectedPrice = selectedImageIds.length * pricePerPhoto;

        navigate('/payment', { state: { imageIds: selectedImageIds, price: selectedPrice } });
    }

    const isAlbumDetailsPage = location.pathname.startsWith('/albumDetails') && albumId;

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
                            <span>All {photoCount} photos from {albumId}</span>
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
                                    <span>All {photoCount} photos from {albumId}</span>
                                    <span>${totalPrice}</span>
                                </Label>
                            </Row>
                        )}
                    </>
                )}
               
               <ButtonMobile>
                    <img src={applePay} alt="Apple Pay" />
                </ButtonMobile>
                <ButtonContainer>
                    <Button onClick={handleCheckout}>Checkout</Button>
                    <ButtonPayPal>
                        <img src={payPal} alt="PayPal" />
                    </ButtonPayPal>
                </ButtonContainer>
            </InnerContainer>
        </PayPopupContainer>
    );
}

export default PayPopup;
