import React from 'react';
import { dataURItoBlob } from '../../utils/ConverFunc';
import { SharePopupProps } from './types';
import { ShareContainer, Image, Row } from './SharePopup.styled';
import shareIcon from '../../assets/images/arrowupicon.png';
import downloadIcon from '../../assets/images/arrowdownicon.png';
import copyIcon from '../../assets/images/filesicon.png';

const SharePopup = ({ selectedImage }: SharePopupProps) => {

  const handleShareClick = async () => {
    if (selectedImage && navigator.share) {
        try {
            const blob = dataURItoBlob(selectedImage.binaryString);
            const url = URL.createObjectURL(blob);

            await navigator.share({
                title: 'Check out this photo!',
                url: url,
            });
            console.log('Successful share');
            URL.revokeObjectURL(url); // Clean up after sharing
        } catch (error) {
            console.log('Error sharing:', error);
        }
    } else {
        console.log('Web Share API not supported or selectedImage is null.');
    }
  };

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

  const handleCopyClick = async () => {
    if (selectedImage && navigator.clipboard) {
        try {
            await navigator.clipboard.writeText(selectedImage.binaryString);
            console.log('Base64 image string copied to clipboard');
        } catch (err) {
            console.error('Could not copy image string: ', err);
        }
    } else {
        console.log('Clipboard API is not supported in your browser or selectedImage is null.');
    }
  };

  return (
    <ShareContainer style={{ zIndex: 1000, position: 'relative' }}> {/* Ensure the popup is on top */}
      <Row onClick={handleShareClick} style={{ backgroundColor: 'lightgrey', padding: '10px', cursor: 'pointer' }}> {/* Debugging styles */}
        <p>Share...</p>
        <Image src={shareIcon} alt="share" />
      </Row>
      <Row onClick={handleAddToPhotos} style={{ backgroundColor: 'lightgrey', padding: '10px', cursor: 'pointer' }}> {/* Debugging styles */}
        <p>Add To Photos</p>
        <Image src={downloadIcon} alt="add to photos" />
      </Row>
      <Row onClick={handleCopyClick} style={{ backgroundColor: 'lightgrey', padding: '10px', cursor: 'pointer' }}> {/* Debugging styles */}
        <p>Copy</p>
        <Image src={copyIcon} alt="copy" />
      </Row>
    </ShareContainer>
  );
};

export default SharePopup;
