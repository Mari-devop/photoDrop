import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Image, Subtitle, Text, PreviewContainer, Title, PrintImage, Grid } from './Account.styled';
import group from '../../assets/images/Group.png';
import print1 from '../../assets/images/Photo Wall.png';
import print2 from '../../assets/images/Photo Wall-2.png';
import print3 from '../../assets/images/Photo Wall-3.png';
import Footer from '../../components/footer/Footer';

const Account = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

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
          <PrintImage src={print1} alt="Print 1" />
          <PrintImage src={print2} alt="Print 2" />
          <PrintImage src={print3} alt="Print 3" />
        </Grid>
      </PreviewContainer>
      <Footer />
    </div>
  )
}

export default Account