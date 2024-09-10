import React, { useEffect, useState } from 'react';
import { PaymentRequestButtonElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { ApplePayProps } from './types';

const ApplePay: React.FC<ApplePayProps> = ({ imageIds, onClose, amount, albumName, isAlbumPurchased }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [isButtonVisible, setIsButtonVisible] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    if(paymentRequest || amount === 0) {
      return;
    }

    if (!stripe || !elements) {
      console.error('Stripe or elements are not initialized');
      return;
    }

    if (imageIds.length === 0) {
      console.error('No image IDs for payment processing.');
      return;
    }

    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Total',
        amount: amount, 
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });
    console.log( `new payment request created for ImageIds: ${imageIds}, amount: ${amount}, albumName: ${albumName}`);
    
    
      pr.canMakePayment().then((result) => {
        if (result) {
          console.log('Apple Pay is available.');
          setPaymentRequest(pr);
          setIsButtonVisible(true);
        } else {
          console.error('Apple Pay is not available.');
        }
      });
    

    pr.on('paymentmethod', async (e:any) => {
      try {
        const response = await fetch('https://photodrop-dawn-surf-6942.fly.dev/client/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
          body: JSON.stringify({
            imageIds: localStorage.getItem('imageIds'), 
            paymentMethod: 'apple-pay',
            currency: 'usd',
            amount: amount, 
          }),
        });


        console.log(`imageIds from lS: ${localStorage.getItem('imageIds')}`);
  
        const data = await response.json();
        console.log("Received data from server:", data);

        const clientSecret = data.client_secret;

        if (!clientSecret) {
          console.error('Missing client_secret');
          return;
        }
    
        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: e.paymentMethod.id,
        }, { handleActions: false });
        
        if (stripeError) {
          console.error('Stripe error:', stripeError);
          return;
        }

        if (paymentIntent && paymentIntent.status === 'succeeded') {
          onClose();
          navigate('/success', {
            state: {
              albumName: albumName,
              isAlbumPurchased: isAlbumPurchased,
              purchasedPhotos: imageIds, 
              totalPhotosInAlbum: imageIds.length, 
            }
          });
        } else {
          console.error('Payment failed or incomplete:', paymentIntent);
        }
      } catch (error) {
        console.error('Payment failed:', error);
      }
    });
  }, [stripe, elements, imageIds, amount, navigate, onClose, paymentRequest]);

  useEffect(() => {
    if (paymentRequest && amount > 0) {
 
      paymentRequest.update({
        total: {
          label: 'Total',
          amount: amount,
        },
      });
     
      localStorage.setItem('imageIds', JSON.stringify(imageIds));
      console.log(`updated ImageIds: ${imageIds}, amount: ${amount}, albumName: ${albumName}`);
    }
  }, [amount, paymentRequest]);

  return (
    <div className='custom-apple-pay-wrapper'>
      <div className="button-placeholder" />
      {paymentRequest && (
        <div className={`custom-apple-pay-button ${isButtonVisible ? 'visible' : 'hidden'}`}>
          <PaymentRequestButtonElement
            options={{
              paymentRequest,
              style: {
                paymentRequestButton: {
                  type: 'default',
                  theme: 'dark',
                  height: '48px',
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );

}
export default ApplePay;
