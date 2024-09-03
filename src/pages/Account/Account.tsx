import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AccountFullData from '../../components/accountFullData/AccountFullData';
import AccountEmpty from '../../components/accountEmpty/AccountEmpty';
import { ThreeCircles } from 'react-loader-spinner';

const Account: React.FC = () => {
  const [imagesData, setImagesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImagesData = async () => {
      const token = localStorage.getItem('authToken');

      try {
        const response = await axios.get('https://photodrop-dawn-surf-6942.fly.dev/client/images', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const data = response.data;
          setImagesData(data);
        } else {
          console.error('Failed to fetch images data. Server responded with:', response.status);
        }
      } catch (error) {
        console.error('Error fetching images data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImagesData();
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = ''; 
    }

    return () => {
      document.body.style.overflow = ''; 
    };
  }, [loading]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#3300CC"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    ); 
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {imagesData.length > 0 ? (
      <AccountFullData 
        imagesData={imagesData} 
      />
    ) : (
      <AccountEmpty />
    )}
  </div>
  );
};

export default Account;
