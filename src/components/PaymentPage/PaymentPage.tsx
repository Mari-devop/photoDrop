import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { 
    FullScreenContainer, 
    CloseIcon,
    EmbeddedCheckoutContainer
} from './PaymentPage.styled';

const stripePromise = loadStripe("pk_test_51PqIRMRxh50Nc0qLf4KgICJ8Gb4lP7e4iOqZp0SJFlG9rIABwbfH0u09I708ArEEkN3VJ3lzojlUcuvwZ0IYXpcU00E7LfZZkG");

interface PaymentPageProps {
    imageIds?: number[];
    price?: number;
}

const PaymentPage: React.FC<PaymentPageProps> = () => {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { imageIds = [], price = 0 } = location.state || {};
    
    useEffect(() => {
        if (imageIds.length === 0) {
            console.error("No image IDs received for payment processing.");
            return;
        }
    
        const fetchClientSecret = async () => {
            const token = localStorage.getItem('authToken');
    
            const response = await fetch('https://photodrop-dawn-surf-6942.fly.dev/client/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ imageIds, price }),
            });
    
            const data = await response.json();
            console.log("Received clientSecret:", data.client_secret); 
            setClientSecret(data.client_secret);
        };
    
        fetchClientSecret();
    }, [imageIds, price]);
    

    useEffect(() => {
        if (!clientSecret) return;

        const checkPaymentStatus = async () => {
            const stripe = await stripePromise;

            if (stripe && clientSecret) {
                const interval = setInterval(async () => {
                    try {
                        const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
                        if (paymentIntent?.status === 'succeeded') {
                            clearInterval(interval);
                            navigate('/success');
                        }
                    } catch (error) {
                        console.error("Error retrieving payment intent:", error); 
                    }
                }, 3000); 

                return () => clearInterval(interval); 
            }
        };

        checkPaymentStatus();
    }, [clientSecret, navigate]);

    const handleClose = () => {
        navigate(-1); 
    };
    
    return (
        <FullScreenContainer>
        <CloseIcon onClick={handleClose} />
        {clientSecret && (
            <EmbeddedCheckoutContainer>
                <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            </EmbeddedCheckoutContainer>
        )}
    </FullScreenContainer>
    );
};

export default PaymentPage;
