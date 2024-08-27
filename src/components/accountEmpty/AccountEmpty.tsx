import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Image, 
  Subtitle, 
  Text, 
  PreviewContainer, 
  Title, 
  PrintImage, 
  Grid,  
} from './AccounttEmpty.styled';

import group from '../../assets/images/Group.png';
import print1 from '../../assets/images/1ex.png';
import print2 from '../../assets/images/2ex.png';
import print3 from '../../assets/images/2ex.png';
import Footer from '../../components/footer/Footer';
import FullscreenImage from '../fullScreenImage/FullScreenImage'; 

const AccountEmpty = () => {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 500);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsFullscreen(true);
  }
  
  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
    setSelectedImage(null);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Container>
        <Image src={group} alt="Account" />
        <Subtitle>Your photos will drop soon.</Subtitle>
        <Text>You will get a text message when they are ready. It can take up to 48 hours.</Text>
      </Container>
      <PreviewContainer>
        <Title>Browse Artist Prints</Title>
        <Grid>
          <PrintImage src={print1} alt="Print 1" onClick={() => handleImageClick(print1)} />
          <PrintImage src={print2} alt="Print 2" onClick={() => handleImageClick(print2)} />
          <PrintImage src={print3} alt="Print 3" onClick={() => handleImageClick(print3)} />
        </Grid>
      </PreviewContainer>
      <Footer />
  
      {isFullscreen && selectedImage && (
        <FullscreenImage 
          imageSrc={selectedImage} 
          isPurchased={true}  
          imageId={selectedImage} 
          onClose={handleCloseFullscreen}
          isMobile={isMobile}
          date={new Date().toString()}  
        />
      )}
    </div>
  );
}

export default AccountEmpty;