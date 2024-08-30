import React from 'react';
import { SharePopupProps } from './types';
import { ShareContainer, Image, Row } from './SharePopup.styled';
import shareIcon from '../../assets/images/arrowupicon.png';
import downloadIcon from '../../assets/images/arrowdownicon.png';
import copyIcon from '../../assets/images/filesicon.png';


function dataURItoBlob(dataURI: string | undefined | null): Blob {
  if (!dataURI) {
      throw new Error("Invalid dataURI: The provided data URI is empty or undefined.");
  }

  const parts = dataURI.split(',');

  if (parts.length !== 2) {
      throw new Error("Invalid dataURI: The provided data URI does not have a valid format.");
  }

  const byteString = parts[0].includes('base64')
      ? atob(parts[1])
      : decodeURIComponent(parts[1]);

  const mimeString = parts[0].split(':')[1].split(';')[0];

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}


const SharePopup = ({ selectedImage, onClose }: SharePopupProps) => {
  const handleShareClick = async () => {
    try {
        if (selectedImage) {
            let url: string;

            if (selectedImage.binaryString.startsWith('data:image/')) {
              
                const blob = dataURItoBlob(selectedImage.binaryString);
                url = URL.createObjectURL(blob);
            } else {
             
                url = selectedImage.binaryString;
            }

            await navigator.share({
                title: 'Check out this photo!',
                url: url,
            });
            console.log('Successful share');
            if (url.startsWith('blob:')) {
                URL.revokeObjectURL(url); 
            }
        } else {
            console.error('No selected image data available');
        }
    } catch (error: any) {
        console.error('Error sharing:', error.message);
    }
};


const handleAddToPhotos = () => {
  try {
      if (selectedImage && selectedImage.binaryString) {
          let url: string;

          if (selectedImage.binaryString.startsWith('data:image/')) {
              console.log("Processing as Data URI");
              const blob = dataURItoBlob(selectedImage.binaryString);
              url = URL.createObjectURL(blob);
          } else if (isValidURL(selectedImage.binaryString)) {
              console.log("Processing as a valid URL");
              url = selectedImage.binaryString;
          } else {
              console.log("Processing as a relative path");
             
              url = `${window.location.origin}${selectedImage.binaryString}`;
              console.log("Generated absolute URL:", url);
          }

          const a = document.createElement('a');
          a.href = url;
          a.download = `image_${selectedImage.id}.jpeg`;
          a.click();
          if (url.startsWith('blob:')) {
              URL.revokeObjectURL(url); 
          }
      } else {
          console.error('Invalid image data');
      }
  } catch (error: any) {
      console.error('Failed to add to photos:', error.message);
  }
};



const isValidURL = (string: string) => {
  try {
      new URL(string);
      return true;
  } catch (_) {
      return false;
  }
};




const handleCopyClick = async () => {
  try {
      if (selectedImage && selectedImage.binaryString) {
          let url: string;

          if (selectedImage.binaryString.startsWith('data:image/')) {
              console.log("Processing as Data URI");
              url = selectedImage.binaryString;
          } else if (isValidURL(selectedImage.binaryString)) {
              console.log("Processing as a valid URL");
              url = selectedImage.binaryString;
          } else {
              console.log("Processing as a relative path");
         
              url = `${window.location.origin}${selectedImage.binaryString}`;
              console.log("Generated absolute URL for copy:", url);
          }

          await navigator.clipboard.writeText(url);
          console.log('URL copied to clipboard:', url);
      } else {
          console.error('Invalid image data for copying');
      }
  } catch (err: any) {
      console.error('Failed to copy image URL:', err.message);
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
    </ShareContainer>
  );
};

export default SharePopup;
