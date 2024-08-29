import React, { useEffect, useState } from 'react';
import { PaymentRequestButtonElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const ApplePay = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }

    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Total',
        amount: 100, 
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
      } else {
        console.error('Apple Pay is not available.');
      }
    });

    pr.on('paymentmethod', async (e) => {
      try {
        const response = await fetch('https://photodrop-dawn-surf-6942.fly.dev/client/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
          body: JSON.stringify({
            paymentMethodType: 'apple-pay',
            currency: 'usd',
            amount: 100, 
          }),
        });

        const { clientSecret, error: backendError } = await response.json();

        if (backendError) {
          console.error('Backend error:', backendError);
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
          navigate('/success');
        } else {
          console.error('Payment failed or incomplete:', paymentIntent);
        }
      } catch (error) {
        console.error('Payment failed:', error);
      }
    });
  }, [stripe, elements, navigate]);

  return paymentRequest ? (
    <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto', padding: '20px',  borderRadius: '100px', overflow: 'hidden',  }}>
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
  ) : null;
};

export default ApplePay;
