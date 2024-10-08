import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NameContainer } from './Name.styled';
import { Title, Input, Button } from '../../styles/Global.styled';

const Name = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert('Please enter your name');
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

      console.log('Name to be sent:', name);

      const payload = {
        clientName: name.trim(),
      };

      const saveResponse = await axios.put(
        'https://photodrop-dawn-surf-6942.fly.dev/client/editName',
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Server response after saving name:', saveResponse.data);

      const response = await axios.get(
        'https://photodrop-dawn-surf-6942.fly.dev/client/info',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { email } = response.data.client;

      if (email === null) {
        navigate('/email');
      } else {
        navigate('/account');
      }
    } catch (error:any) {
      console.error('Error saving name or checking email:', error);

      if (error.response) {
        console.error('Server response data:', error.response.data);
      }

      alert('Failed to save name. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <NameContainer>
      <Title>Let’s get to know you</Title>
      <Input
        type="text"
        placeholder="What’s your name?"
        value={name}
        onChange={handleNameChange}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Saving...' : 'Next'}
      </Button>
    </NameContainer>
  );
};

export default Name;
