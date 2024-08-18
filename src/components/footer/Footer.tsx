import React from 'react';
import { Grid, Column1, Column2, FooterContainer, Title, Text, Textp, Button, FrameLogo, ClimateLogo, CustomLink } from './Footer.styled';
import frameLogo from '../../assets/images/Frameology Logo.png';
import climateLogo from '../../assets/images/Climate Neutral Logo.png';

const Footer = () => {
  return (
    <FooterContainer>
      <Grid>
        <Column1>
          <Title>PhotoDrop is brought to you by</Title>
          <FrameLogo src={frameLogo} alt="Logo" />
          <Text>Our mission is to help people connect with their memories. If you framing some of the photos from your experience, please consider using Frameology. It supports the photographers and makes PhotoDrop possible.</Text>
          <Button>Order photos</Button>
          <Text>© 2022 FOM Online Inc</Text>
        </Column1>
        <Column2>
          <Textp>Questions? Get in touch - hello@photodrop.me</Textp>
          <ClimateLogo src={climateLogo} alt="Logo" />
          <CustomLink to="/terms">Terms of Service</CustomLink>
          <CustomLink to="/policy">Privacy Policy</CustomLink>
        </Column2>
      </Grid>
    </FooterContainer>
  )
}

export default Footer