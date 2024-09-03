import styled from "styled-components";
import { Link } from 'react-router-dom';

export const FooterContainer = styled.footer`
    background-color: var(--primary-color);
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center; 
    margin-top: auto;
    position: relative;
    bottom: 0;
`;

export const Grid = styled.div`
    display: flex;
    align-items: flex-start; 
    justify-content: center;
    gap: 60px;
    margin-top: 60px;
    margin-bottom: 40px;

    @media (max-width: 822px) {
        flex-direction: column;
    }
`;

export const Column1 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    justify-content: flex-start;
    width: 420px;

    @media (max-width: 500px) {
        width: 300px;
    }
`;

export const Column2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    justify-content: flex-start;
    width: 311px;
`;

export const Title = styled.h1`
    font-size: 20px;
    line-height: 26px;
    font-weight: 700;
    color: var(--white-color);
    font-family: 'Termina Test';
    margin-bottom: 19px;
    margin-top: 0;
    text-align: left;
    width: 100%; 
`;

export const Text = styled.p`
    font-size: 16px;
    line-height: 23px;
    font-weight: 400;
    color: var(--white-color);
    font-family: 'Futura PT';
    margin-top: 0px;
    margin-bottom: 29px;
    text-align: left;
    width: 100%; 
`;

export const Textp = styled.p`
    font-size: 16px;
    line-height: 23px;
    font-weight: 400;
    color: var(--white-color);
    font-family: 'Futura PT';
    margin-top: 00px;
    margin-bottom: 20px;
    text-align: left;
    width: 100%; 
`;

export const Button = styled.button`
    background-color: var(--primary-color);
    color: var(--white-color);
    font-size: 22px;
    line-height: 22px;
    font-weight: 500;
    font-family: 'Futura PT';
    border-radius: 25px;
    border: 1px solid var(--white-color);
    cursor: pointer;
    margin-bottom: 60px;
    margin-top: 0px;
    width: 300px;
    height: 50px;
`;

export const FrameLogo = styled.img`
    width: 185px;
    height: 30px;
    margin-bottom: 20px;
`;

export const ClimateLogo = styled.img`
    width: 100px;
    height: 39px;
    margin-bottom: 30px;
`;

export const CustomLink = styled(Link)`
    font-size: 16px;
    line-height: 18px;
    font-weight: 400;
    color: var(--white-color);
    font-family: 'Futura PT';
    text-decoration: none;
    margin-bottom: 19px;
    margin-top: 0;
    cursor: pointer;
    width: 100%; 
`;
