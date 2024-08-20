import styled from "styled-components";

export const MainContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%; 
    max-width: 420px; 
    padding: 0 20px;
    overflow: hidden;
    max-height: calc(100vh - 60px); 

    @media (max-width: 500px) {
        width: 345px;
        height: 176px;
        padding: 0 20px;
    }

    @media (max-width: 344px) {
        width: 320px;
        height: 176px;
        padding: 0 20px;
    }
`;

export const Title = styled.h1`
    font-size: 30px;
    line-height: 36px;
    font-weight: 700;
    color: var(--primary-color);
    font-family: 'Termina Test';
    margin-bottom: 29px;
    text-align: center;

    @media(max-width: 500px) {
        font-size: 22px;
        line-height: 26px;
    }
`;

export const Button = styled.button`
    background-color: var(--button-color);
    color: var(--white-color);
    font-size: 22px;
    line-height: 28px;
    font-weight: bold;
    font-family: 'Futura PT';
    border-radius: 25px;
    padding: 10px 30px;
    border: none;
    cursor: pointer;
    margin-bottom: 20px;
    width: 100%;

    &:hover {
        background-color: var(--button-hover-color);
    }
`;

export const Text = styled.p`
    font-size: 16px;
    line-height: 21px;
    font-weight: 200;
    color: var(--secondary-color);
    font-family: 'Futura PT';
    text-align: left;
    margin-top: 0;

    a {
        text-decoration: underline var(--button-color);
        cursor: pointer;
        color: var(--secondary-color);
    }
`;

export const Label = styled.label`
    font-size: 18px;
    line-height: 23px;
    font-weight: 900;
    color: var(--primary-color);
    margin-bottom: 18px;
    font-family: 'Futura PT';
    text-align: left;
    width: 100%;
    span {
        font-weight: 400;
    }
`;

export const Input = styled.input`
    width: 100%; 
    height: 40px;
    background-color: var(--input-color);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    margin-bottom: 20px;
    outline: none;
    padding: 12px;
    box-sizing: border-box; 
    font-size: 18px; 

    &::placeholder {
        font-family: 'Futura PT';
        font-size: 18px;
        line-height: 23px;
  }
`;