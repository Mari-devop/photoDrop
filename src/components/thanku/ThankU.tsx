import React from 'react';
import { Container, Text, Subtitle, SubContainer, Button, SmallText } from './ThankU.styled';
import { Title } from '../../styles/Global.styled';

const ThankU = () => {
  return (
    <div>
      <Container>
        <Title>Thank you</Title>
        <Subtitle>The album <span>Brooklyn Bridge</span> is now unlocked.</Subtitle>
        <Text>
          You can now download, share, post, and print your hi-res, watermark-free, glorious memories.
        </Text>
        <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTNvY2Y4amRhaWVpY2M4c25ibXptbmpoM3UzeHp4d3NoMzJ3Mzg3NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mp1JYId8n0t3y/giphy.gif" alt="Thank You GIF" style={{ width: '100%', maxWidth: '500px', marginTop: '20px' }} />
      </Container>
      <SubContainer>
        <Button>See photos</Button>
        <SmallText>You will receive an email with your order details.</SmallText>
      </SubContainer>
    </div>
  )
}

export default ThankU