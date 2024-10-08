import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Text, Subtitle, SubContainer, Button } from './ThankU.styled';
import { Title } from '../../styles/Global.styled';
import queryString from 'query-string';
import axios from 'axios';

const ThankU = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAlbumPurchased, setIsAlbumPurchased] = useState(false);
  const { albumName, purchasedPhotos = [], totalPhotosInAlbum = 0 } = location.state || {};
  const { album } = queryString.parse(location.search);

  useEffect(() => {

    const fetchUnpaidAlbums = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get('https://photodrop-dawn-surf-6942.fly.dev/client/images', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const albumData = response.data.find((album: any) => album.location === albumName);

        const unpurchasedImageIds = albumData.images
        .filter((image: any) => !image.isPurchased)
        .map((image: any) => image.id);

        console.log('Unpurchased images:', unpurchasedImageIds);

        if(unpurchasedImageIds.length === 0) {
          setIsAlbumPurchased(true);
        };

    } catch(error) {
      console.error('Error fetching unpaid albums:', error);
    }
  }

  if(!album) {
    fetchUnpaidAlbums();
    console.log('Album is not defined');
  };

 
})

  const handleButtonClick = () => {
    navigate('/account');
  };

  //const isFullAlbumPurchased = isAlbumPurchased || (purchasedPhotos.length === totalPhotosInAlbum);

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Container>
        <Title>Thank you</Title>

        {isAlbumPurchased ? (  
          <Subtitle>The album <span>{albumName}</span> is now unlocked.</Subtitle>
        ) : (album !== 'null' && album !== undefined && album !== null) ? (
          <Subtitle>The album <span>{album}</span> is now unlocked.</Subtitle>
        ) : (
          <Subtitle>Your photo are now unlocked.</Subtitle>
        )}

        <Text>
          You can now download, share, post, and print your hi-res, watermark-free, glorious memories.
        </Text>

        <img 
          src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTNvY2Y4amRhaWVpY2M4c25ibXptbmpoM3UzeHp4d3NoMzJ3Mzg3NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mp1JYId8n0t3y/giphy.gif" 
          alt="Thank You GIF" 
          style={{ width: '100%', maxWidth: '500px', marginTop: '20px' }} 
        />
      </Container>

      <SubContainer>
        <Button onClick={handleButtonClick}>See photos</Button>
      </SubContainer>
    </div>
  );
};

export default ThankU;
