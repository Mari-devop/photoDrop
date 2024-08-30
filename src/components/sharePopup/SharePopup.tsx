import React from 'react';
import { dataURItoBlob } from '../../utils/ConverFunc';
import { SharePopupProps } from './types';
import { ShareContainer, Image, Row  } from './SharePopup.styled';
import shareIcon from '../../assets/images/arrowupicon.png';
import downloadIcon from '../../assets/images/arrowdownicon.png';
import copyIcon from '../../assets/images/filesicon.png';

const SharePopup = ({ selectedImage, onClose }: SharePopupProps) => {

  const handleShareClick = () => {
    if (selectedImage && navigator.share) {
        const blob = dataURItoBlob(selectedImage.binaryString);
        const url = URL.createObjectURL(blob);

        navigator.share({
            title: 'image-name',
            text: 'Check out this photo!',
            url: url,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
        console.log('Web Share API not supported or selectedImage is null.');
    }
  }

  const handleAddToPhotos = () => {
    if (selectedImage) {
        const blob = dataURItoBlob(selectedImage.binaryString);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `image_${selectedImage.id}.jpeg`;
        a.click();
        URL.revokeObjectURL(url);  // Clean up
    }
  };

  const handleCopyClick = () => {
    if (selectedImage && navigator.clipboard) {
        navigator.clipboard.writeText(selectedImage.binaryString)
            .then(() => console.log('Base64 image string copied to clipboard'))
            .catch((err) => console.error('Could not copy image string: ', err));
    } else {
        console.log('Clipboard API is not supported in your browser or selectedImage is null.');
    }
  };

  return (
    <ShareContainer>
      <Row onClick={handleShareClick}>
        <p>Share...</p>
        <Image src={shareIcon} alt="share" />
      </Row>
      <Row onClick={handleAddToPhotos}>
        <p>Add To Photos</p>
        <Image src={downloadIcon} alt="add to photos" />
      </Row>
      <Row onClick={handleCopyClick}>
        <p>Copy</p>
        <Image src={copyIcon} alt="copy" />
      </Row>
      <button onClick={onClose}>Close</button>
    </ShareContainer>
  );
};

export default SharePopup;
