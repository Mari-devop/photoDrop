import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Text, Subtitle, SubContainer, Button } from './ThankU.styled';
import { Title } from '../../styles/Global.styled';

const ThankU = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { albumName, purchasedPhotos = [], totalPhotosInAlbum = 0} = location.state || {};

  const handleButtonClick = () => {
    navigate('/account');
  };

  const isFullAlbumPurchased = purchasedPhotos?.length > 1 && purchasedPhotos?.length === totalPhotosInAlbum;

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Container>
        <Title>Thank you</Title>

        {isFullAlbumPurchased ? (
          <Subtitle>The album <span>{albumName}</span> is now unlocked.</Subtitle>
        ) : (
          <Subtitle>Your photo is now unlocked.</Subtitle>
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
