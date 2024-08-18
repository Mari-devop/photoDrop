import React from 'react';
import { MobileContainer, Row, Image } from './SelfiePopupMobile.styled';
import photos from '../../assets/images/File (5) 3.png';
import camera from '../../assets/images/File (5) 4.png';
import folder from '../../assets/images/File (5) 5.png';

const SelfiePopupMobile = () => {
  return (
    <MobileContainer>
       
            <Row>
                <p>Photo Library</p>
                <Image src={photos} alt="photos" />
            </Row>
            <Row>
                <p>Take Photo</p>
                <Image src={camera} alt="camera" />
            </Row>
            <Row>
                <p>Choose File</p>
                <Image src={folder} alt="folder" />
            </Row>
       
    </MobileContainer>
  )
}

export default SelfiePopupMobile;