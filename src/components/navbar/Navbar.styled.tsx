import styled from "styled-components";

export const NavbarContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 1000;
    padding: 19px 0;
    background-color: var(--white-color);
    border-bottom: 1px solid var(--divider-color);
    box-sizing: border-box;
    position: relative; 
    height: 60px;

    img {
        height: 100%;
        width: auto;
    }
`;

export const ArrowContainer = styled.div`
    position: absolute;
    left: 20px; 
    top: 50%;
    transform: translateY(-50%); 
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

export const Arrow = styled.img`
    height: 100%;
    width: 100%;
`;

export const SelfieImage = styled.img`
    border-radius: 50%;
    margin-right: 40px;
    height: 35px;
    width: 35px;
`;

export const SelfieContainer = styled.div`
    position: absolute;
    right: 20px; 
    top: 50%;
    transform: translateY(-50%); 
    height: 35px;
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    a {
        text-decoration: none; 
        display: flex; 
        align-items: center; 
        height: 100%; 
        width: 100%; 
    }
`;

export const Title = styled.h1`
    font-family: 'Termina Test';
    font-size: 22px;
    font-weight: 700;
    color: var(--primary-color);
    margin-left: 70px;

    @media (max-width: 525px) {
        margin-top: 0;
        margin-bottom: 0;
    }
`;

export const TextContainer = styled.div`
    display: flex;
    align-items: center; 
    gap: 10px;
    margin-left: 20px; 

    p, span {
        margin: 0;
        font-family: 'Futura PT';
        font-size: 16px;
        font-weight: 400;
        color: var(--secondary-color);
    }

    span {
        position: relative;
        padding-left: 10px;

        &::before {
            content: '•'; 
            font-weight: bold;
            position: absolute;
            left: -10px; 
            top: 50%;
            transform: translateY(-50%); 
            font-size: 18px; 
            color: var(--secondary-color); 
        }
    }

    @media (max-width: 525px) {
        margin-left: 0;
    }
`;

export const Wrapper = styled.div`
  flex-grow: 1; 
  display: flex;
  align-items: center; 
  margin-left: 20px; 
  flex-direction: row;
  justify-content: flex-start;

    @media (max-width: 525px) {
        flex-direction: column;
    }
`;

export const Context = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const Button = styled.button`
    font-family: 'Futura PT';
    font-size: 22px;
    font-weight: 500;
    color: var(--button-color);
    background-color: transparent;
    border: none;
    margin-right: 122px;
    cursor: pointer;

    @media (max-width: 840px) {
        margin-right: 20px;
    }

     @media (max-width: 720px) {
        display: none;
    }
`;