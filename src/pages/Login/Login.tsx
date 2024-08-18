import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { MainContainer, Title, Button, Label, Text } from '../../styles/Global.styled';

interface LoginProps {
  onOtpSent: () => void;  
}

const Login: React.FC<LoginProps> = ({ onOtpSent }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    setLoading(true);
    try {
      await axios.post('https://photodrop-dawn-surf-6942.fly.dev/api/otp/send-otp', {
        phoneNumber: phone,
      });
      onOtpSent(); 
      navigate('/code', { state: { phoneNumber: phone } });
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <MainContainer>
      <Title>Let’s get started</Title>
      <Label htmlFor="phone-number">Enter your phone number</Label>
      <PhoneInput
        country={'us'}
        value={phone}
        onChange={setPhone}
        inputProps={{
          name: 'phone',
          required: true,
          autoFocus: true,
        }}
        containerStyle={{ marginBottom: '20px', width: '100%' }}
        inputStyle={{
          width: '100%',
          backgroundColor: '#F4F4F4',
          borderRadius: '12px',
          border: '1px solid #EEEEEE',
          fontSize: '18px',
          lineHeight: '23px',
          fontWeight: '400',
          fontFamily: 'Futura PT',
          padding: '20px 15px',
          paddingLeft: '80px',
          outline: 'none',
        }}
        buttonStyle={{
          padding: '8px 9px',
          display: 'flex',
          alignItems: 'center',
          marginRight: '15px',
          backgroundColor: 'transparent',
          borderRadius: '12px',
          border: '1px solid #EEEEEE',
        }}
        dropdownStyle={{
          position: 'absolute',
          top: '100%',
          left: '0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: '5px',
          backgroundColor: '#F4F4F4',
          border: '1px solid #EEEEEE',
          borderRadius: '8px',
          width: '250px',
          zIndex: '1',
          padding: '5px 8px'
        }}
      />
      <Button onClick={sendOtp} disabled={loading}>
        {loading ? 'Sending' : 'Create account'}
      </Button>
      <Text>
        By proceeding, you consent to get WhatsApp or SMS messages, from PhotoDrop and its affiliates to the number provided. Text “STOP” to 89203 to opt out.
      </Text>
      <Text>
        By continuing, you indicate that you have read and agree to our <Link to='/terms'>Terms of Use</Link> & <Link to="/policy">Privacy Policy</Link>
      </Text>
    </MainContainer>
  );
};

export default Login;
