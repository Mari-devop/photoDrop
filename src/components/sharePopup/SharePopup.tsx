import React from 'react';
import { dataURItoBlob } from '../../utils/ConverFunc';
import { SharePopupProps } from './types';
import { ShareContainer, Image, Row  } from './SharePopup.styled';
import share from '../../assets/images/arrowupicon.png';
import download from '../../assets/images/arrowdownicon.png';
import folder from '../../assets/images/filesicon.png';

const SharePopup = ({ selectedImage, onClose }: SharePopupProps) => {

  const handleShareClick = () => {
    if (selectedImage && navigator.share) {
        navigator.share({
            title: 'image-name',
            text: 'Check out this photo!',
            url: selectedImage.binaryString,
        })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing:', error));
    } else {
        console.log('Web Share API not supported');
    }
  }

  const handleAddToPhotos = () => {
    if (selectedImage) {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(dataURItoBlob(selectedImage.binaryString));
      a.download = `image_${selectedImage.id}.jpeg`;
      a.click();
    }
  };

  const handleCopyClick = () => {
    if (navigator.clipboard && selectedImage) {
      navigator.clipboard.writeText(selectedImage.binaryString)
        .then(() => console.log('Image copied to clipboard'))
        .catch((err) => console.error('Could not copy image: ', err));
    } else {
      console.log('Clipboard API is not supported in your browser.');
    }
  };

  return (
    <ShareContainer>
      <Row onClick={handleShareClick}>
        <p>Share...</p>
        <Image src={share} alt="photos" />
      </Row>
      <Row onClick={handleAddToPhotos}>
        <p>Add To Photo</p>
        <Image src={download} alt="camera" />
      </Row>
      <Row onClick={handleCopyClick}>
        <p>Copy</p>
        <Image src={folder} alt="folder" />
      </Row>
    </ShareContainer>
  );
};

export default SharePopup;


