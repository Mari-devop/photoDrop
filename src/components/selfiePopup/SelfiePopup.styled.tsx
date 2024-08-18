import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 420px;
    height: 185px;
    transform: translate(-50%, -50%);
    background-color: var(--white-color);
    border-radius: 25px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px; 
    box-sizing: border-box;
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

export const Subtitle = styled.p`
    font-size: 22px;
    line-height: 28px;
    font-weight: 500;
    color: var(--primary-color);
    font-family: 'Futura PT';
    margin-top: 0;
    margin-bottom: 20px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Button = styled.button`
    background-color: var(--white-color);
    color: var(--button-color);
    font-size: 22px;
    line-height: 28px;
    font-weight: 500;
    font-family: 'Futura PT';
    border-radius: 25px;
    border: 1px solid var(--button-color);
    cursor: pointer;
    width: 380px;
    height: 50px;
`;

export const CloseIcon = styled.div`
  position: absolute;
  top: 15px;
  left: 25px;
  width: 27px;
  height: 27px;
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
