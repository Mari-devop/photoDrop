import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NameContainer } from '../Name/Name.styled';
import { Title, Input, Button } from '../../styles/Global.styled';

const NameEdit = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchName = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('Auth token not found in localStorage');
        navigate('/');
        return;
      }

      try {
        const response = await axios.get(
          'https://photodrop-dawn-surf-6942.fly.dev/client/info',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const clientName = response.data.client.name;
        setName(clientName || '');
      } catch (error) {
        console.error('Error fetching client name:', error);
        navigate('/');
      }
    };

    fetchName();
  }, [navigate]);

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

      await axios.put(
        'https://photodrop-dawn-surf-6942.fly.dev/client/editName',
        { clientName: name.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate('/account');
    } catch (error) {
      console.error('Error saving name:', error);
      alert('Failed to save name. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <NameContainer>
      <Title>Your name</Title>
      <Input 
        type="text"
        placeholder="Jane"
        value={name}
        onChange={handleNameChange}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </Button>
    </NameContainer>
  );
}

export default NameEdit