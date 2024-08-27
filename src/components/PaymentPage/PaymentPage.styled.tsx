import styled from 'styled-components';


export const FullScreenContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const EmbeddedCheckoutContainer = styled.div`
    width: 100%;
    max-height: 90%; /* Adjust this value as needed */
    overflow-y: auto; /* Enable vertical scrolling */
    padding: 20px; /* Optional: Add padding around the form */
    box-sizing: border-box;
`;

export const CloseIcon = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 15px;
  height: 15px;
  cursor: pointer;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: var(--primary-color);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;



