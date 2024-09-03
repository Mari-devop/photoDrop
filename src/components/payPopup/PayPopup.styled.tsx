import styled from "styled-components";

export const PayPopupContainer = styled.div.attrs(() => ({
    id: "pay-popup", 
}))`
    position: fixed; 
    top: 50%;
    left: 50%;
    width: 480px;
    transform: translate(-50%, -50%);
    background-color: var(--white-color);
    border-radius: 25px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px; 
    box-sizing: border-box;
  
    @media (max-width: 500px) {
        width: 100%;
        height: auto;
        top: auto;
        bottom: 0;
        left: 0;
        transform: none;
        border-radius: 25px 25px 0 0;
    }
`;

  
export const InnerContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;  
    box-sizing: border-box;
    background-color: inherit; 
    height: 100%; 

    @media (max-width: 500px) {
        justify-content: space-between; 
    }
`;

export const Title = styled.h2`
    font-family: 'Termina Test';
    font-size: 22px;
    line-height: 26px;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 15px;
    margin-top: 0;

    @media (max-width: 500px) {
        font-size: 18px;
        line-height: 21px;
    }
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

export const Text = styled.p`
    font-family: 'Futura PT';
    font-size: 18px;
    line-height: 23px;
    font-weight: 400;
    color: var(--primary-color);
    text-align: left;
    margin-top: 0;
    margin-bottom: 20px;

    @media (max-width: 500px) {
        font-size: 16px;
        line-height: 20px;
    }
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 15px;

    &:last-child {
        margin-bottom: 0; 
    }
`;

export const Input = styled.input`
  appearance: none;
  margin-right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #aaa;  
  position: relative;
  outline: none;
  cursor: pointer;
  background-color: white;  

  &:checked {
    border-color: #4a3aff;  
    background-color: white;  
  }

  &:checked::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #4a3aff; 
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:checked + label span:first-child, 
  &:checked + label span:last-child {
    color: #4a3aff;
  }
`;


export const Label = styled.label`
  display: flex;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;

  span:first-child {
    font-weight: bold;
    transition: color 0.3s ease;
  }

  span:last-child {
    font-weight: bold;
    transition: color 0.3s ease;
  }

    @media (max-width: 500px) {
        span:first-child {
            font-size: 16px;
        }
    
        span:last-child {
            font-size: 16px;
        }
    }
`;

export const ButtonMobile = styled.button`
    background-color: var(--primary-color);
    border: none;
    border-radius: 25px;
    width: 100%;
    height: 50px;
    margin-bottom: 15px;
    padding: 0;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    img {
        width: 100px;
        height: 30px;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const Button = styled.button`
    font-family: 'Futura PT';
    font-size: 22px;
    line-height: 28px;
    font-weight: 500;
    color: var(--white-color);
    background-color: var(--button-color);
    border: none;
    border-radius: 25px;
    width: 214px;
    height: 50px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    @media (max-width: 500px) {
        width: 168px;
    }
`;

export const ButtonPayPal = styled.button`
    font-family: 'Futura PT';
    font-size: 22px;
    line-height: 28px;
    font-weight: 500;
    color: var(--white-color);
    background-color: #FFC439;
    border: none;
    border-radius: 25px;
    width: 214px;
    height: 50px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    img {
        width: 110px;
        height: 30px;
    }

    @media (max-width: 500px) {
        width: 168px;
    }
`;

export const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;
