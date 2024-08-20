import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 999; 
`;

export const SelfieContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 379px;
  height: 653px;
  position: fixed;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--primary-color);
  border-radius: 25px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
  z-index: 1000; 
  box-sizing: border-box;
  overflow-y: auto;


  @media (max-width: 500px) {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transform: none;
    border-radius: 0;
    position: fixed;
  }
`;

export const Title = styled.h1`
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
    font-family: 'Futura PT';
    color: var(--white-color);
    margin-bottom: 42px;
    margin-top: 23px;
`;

export const Text = styled.p`
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
    font-family: 'Futura PT';
    color: var(--white-color);
    margin-bottom: 94px;
`;

export const Image = styled.img`
    width: 285px;
    height: 285px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 95px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-bottom: 40px;
`;

export const ButtonSave = styled.button`
    background-color: var(--white-color);
    color: var(--primary-color);
    font-size: 18px;
    line-height: 23px;
    font-weight: 500;
    font-family: 'Futura PT';
    border-radius: 25px;
    border: none;
    cursor: pointer;
    width: 169px;
    height: 50px;
`;

export const ButtonRetake = styled.button`
    background-color: var(--primary-color);
    color: var(--white-color);
    font-size: 18px;
    line-height: 23px;
    font-weight: 500;
    font-family: 'Futura PT';
    border-radius: 25px;
    border: 1px solid var(--white-color);
    cursor: pointer;
    width: 169px;
    height: 50px;
`;

export const InnerContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    background-color: inherit; 
`;

export const CloseIcon = styled.div`
  position: absolute;
  top: 15px;
  left: 20px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: var(--white-color);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;