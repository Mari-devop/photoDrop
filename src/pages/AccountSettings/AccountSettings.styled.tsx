import styled from "styled-components";

export const SettingsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 420px;
    margin-top: 0; 
    height: auto; 
    position: relative; 
    overflow: hidden;
    
    @media(max-width: 500px) {
        max-width: 345px; 
    }
`;

export const Subtitle = styled.p`
    font-family: 'Futura PT';
    font-weight: 500;
    font-size: 18px;
    line-height: 23px;
`;

export const Pencil = styled.img`
    width: 18px;
    height: 28px;
    object-fit: contain;
`;

export const RoundButton = styled.button`
    width: 45px;
    height: 45px;
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
    right: 230px; 

    @media(max-width: 500px) {
        right: 155px; 
    }
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    border: 1px solid #CECCB5;
    border-radius: 12px;
    margin-top: 20px;
`;

export const TextHolder = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 11px;
    padding-left: 15px;
`;

export const Text = styled.p`
    font-family: 'Futura PT';
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    margin-top: 0px;
    margin-bottom: 9px;
    color: var(--primary-color);
`;

export const Label = styled.p`
    font-family: 'Futura PT';
    font-size: 16px;
    font-weight: 500;
    line-height: 21px;
    margin-top: 0px;
    margin-bottom: 10px;
    color: var(--primary-color);
`;

export const Arrow = styled.img`
    width: 16px;
    height: 16px;
    object-fit: contain;
    margin-top: 20px;
    margin-right: 20px;
`;