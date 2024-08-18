import React from 'react';
import { Container, Subtitle, Button, CloseIcon, InnerContainer, ButtonContainer } from './SelfiePopup.styled';

interface SelfiePopupProps {
  onClose: () => void;
}

const SelfiePopup = ({ onClose }: SelfiePopupProps) => {
  return (
    <Container>
      <InnerContainer>
        <CloseIcon onClick={onClose} />
        <Subtitle>Upload options</Subtitle>
        <ButtonContainer>
          <Button>Upload a file</Button>
          <Button>Use camera</Button>
        </ButtonContainer>
      </InnerContainer>
    </Container>
  )
}

export default SelfiePopup