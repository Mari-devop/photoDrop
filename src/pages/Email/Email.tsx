import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { EmailContainer, Text, PageContainer, ContentWrapper } from './Email.styled';
import { Title, Input, Button } from '../../styles/Global.styled';
import { Link, useNavigate } from 'react-router-dom';

const Email = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('Jane Smith');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientInfo = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('Auth token not found in localStorage');
        navigate('/');
        return;
      }

      try {
        const response = await axios.get(
          'https://photodrop-dawn-surf-6942.fly.dev/client/info',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const clientName = response.data.client.name;
        setName(clientName);
      } catch (error) {
        console.error('Error fetching client info:', error);
      }
    };

    fetchClientInfo();
  }, [navigate]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email: string) => {
    const emailPatern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!email.trim()) {
      return 'Please enter your email';
    } 
    if (email.length < 5) {
      return 'Email must be at least 5 characters long';
    }
    if (!emailPatern.test(email)) {
      return 'Please enter a valid email';
    }
    return null;  
  };

   const handleSubmit = async () => {
    const validationError = validateEmail(email);
    if (validationError) {
      alert(validationError);
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('Auth token not found in localStorage');
        navigate('/');
        return;
      }

      const payload = {
        clientEmail: email.trim(),
      };
      await axios.put(
        'https://photodrop-dawn-surf-6942.fly.dev/client/editEmail',
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate('/account');
    } catch (error) {
      console.error('Error saving email:', error);
      alert('Failed to save email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <EmailContainer>
          <Title>Hey there, <br /> {name}! 👋</Title>
          <Input 
            type="email"
            placeholder="What’s your email?"
            value={email}
            onChange={handleEmailChange}
          />
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'See your photos!'}
          </Button>
        </EmailContainer>
      </ContentWrapper>
      <Text>
        By continuing, you indicate that you have read and agree to our <Link to='/terms'>Terms of Use</Link> & <Link to="/policy">Privacy Policy</Link>
      </Text>
    </PageContainer>
  );
};

export default Email;
