import styled from "styled-components";

export const Image = styled.img`
    width: 181px;
    height: 181px;
    margin: 0 auto;
`;

export const Subtitle = styled.p`
    font-size: 18px;
    line-height: 23px;
    font-weight: 400;
    color: #262626;
    font-family: 'Futura PT';
    text-align: center;
    margin-bottom: 28px;
    margin-top: 0px;
`;

export const RoundButton = styled.button`
    width: 42px;
    height: 42px;
    background-color: var(--button-color);
    color: var(--white-color);
    border-radius: 50%;
    border: none;
    cursor: pointer;
    padding: 0; 
    font-size: 24px; 
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 5px; 
    right: -2px; 
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999; /* Ensure it appears behind the popup but above other content */
`;
