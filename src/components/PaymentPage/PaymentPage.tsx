import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { 
    FullScreenContainer, 
    CloseIcon,
    EmbeddedCheckoutContainer
} from './PaymentPage.styled';
import { Elements, PaymentRequestButtonElement, useStripe } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51PqIRMRxh50Nc0qLf4KgICJ8Gb4lP7e4iOqZp0SJFlG9rIABwbfH0u09I708ArEEkN3VJ3lzojlUcuvwZ0IYXpcU00E7LfZZkG");

interface PaymentPageProps {
    imageIds?: number[];
    price?: number;
    paymentMethod?: string;
}

const PaymentPage: React.FC<PaymentPageProps> = () => {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [paymentRequest, setPaymentRequest] = useState<any>(null);
    const [canMakePayment, setCanMakePayment] = useState<boolean>(false);
    const stripe = useStripe();
    const navigate = useNavigate();
    const location = useLocation();
    const { imageIds = [], price = 0, paymentMethod } = location.state || {};
    
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
                body: JSON.stringify({ imageIds, price, paymentMethod }),
            });
    
            const data = await response.json();
            console.log("Received clientSecret:", data.client_secret); 
            setClientSecret(data.client_secret);

            if(stripe) {
                const pr = stripe.paymentRequest({
                    country: 'US',
                    currency: 'usd',
                    total: {
                        label: 'Total',
                        amount: price * 100,
                    },
                    requestPayerName: true,
                    requestPayerEmail: true,
                });
                pr.canMakePayment().then((result: any) => {
                    if(result) {
                        setCanMakePayment(true);
                        setPaymentRequest(pr);
                    }
                });

                pr.on('paymentmethod', async (ev: any) => {
                    const { error } = await stripe.confirmCardPayment(clientSecret!, {
                        payment_method: ev.paymentMethod.id,
                    });

                    if (error) {
                        ev.complete('fail');
                    } else {
                        ev.complete('success');
                        navigate('/success');
                    }
                });
            }
        };
    
        fetchClientSecret();
    }, [imageIds, price, paymentMethod, stripe, navigate]);
    

    // useEffect(() => {
    //     if (!clientSecret) return;

    //     const checkPaymentStatus = async () => {
    //         const stripe = await stripePromise;

    //         if (stripe && clientSecret) {
    //             const interval = setInterval(async () => {
    //                 try {
    //                     const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
    //                     if (paymentIntent?.status === 'succeeded') {
    //                         clearInterval(interval);
    //                         navigate('/success');
    //                     }
    //                 } catch (error) {
    //                     console.error("Error retrieving payment intent:", error); 
    //                 }
    //             }, 3000); 

    //             return () => clearInterval(interval); 
    //         }
    //     };

    //     checkPaymentStatus();
    // }, [clientSecret, navigate]);

    const handleClose = () => {
        navigate(-1); 
    };
    
    return (
        <FullScreenContainer>
            <CloseIcon onClick={handleClose} />
            {clientSecret && (
                <EmbeddedCheckoutContainer>
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                            <EmbeddedCheckout />
                        </EmbeddedCheckoutProvider>
                        {canMakePayment && paymentRequest && (
                            <PaymentRequestButtonElement options={{ paymentRequest }} />
                        )}
                    </Elements>
                </EmbeddedCheckoutContainer>
            )}
        </FullScreenContainer>
    );
};

export default PaymentPage;
