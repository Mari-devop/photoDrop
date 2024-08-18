import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MainContainer,
  Title,
  Label,
  Button,
} from "../../styles/Global.styled";
import { Input, LinkButton, OTPContainer } from "./Code.styled";

const Code = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { phoneNumber } = state || {};

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      }
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const code = otp.join('');
      const response = await axios.post('https://photodrop-dawn-surf-6942.fly.dev/api/otp/verify-otp', {
        phoneNumber,
        otp: code,
      });
  
      const { token } = response.data;
      localStorage.setItem('authToken', token); 
      navigate('/selfie'); 
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Failed to verify OTP. Please try again.');
    } finally {  
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setResendLoading(true);
    try {
      await axios.post('https://photodrop-dawn-surf-6942.fly.dev/api/otp/send-otp', {
        phoneNumber,
      });
      alert('Code has been resent'); 
    } catch (error) {
      console.error('Error resending OTP:', error);
      alert('Failed to resend OTP. Please try again.');
    } finally {
      setResendLoading(false);
    }
  }

  return (
    <MainContainer>
      <Title>What’s the code?</Title>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Label>
          <span>Enter the code sent to</span> {phoneNumber}
        </Label>
        <OTPContainer>
          {otp.map((data, index) => (
            <Input
              key={index}
              type="text"
              maxLength={1}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </OTPContainer>
        <LinkButton onClick={resendOtp} disabled={resendLoading}>
          {resendLoading ? 'Resending...' : 'Resend code'}
        </LinkButton>
      </div>
      <Button disabled={loading} onClick={verifyOtp}>
        {loading ? "Verifying..." : "Next"}
      </Button>
    </MainContainer>
  );
};

export default Code;
