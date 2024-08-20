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