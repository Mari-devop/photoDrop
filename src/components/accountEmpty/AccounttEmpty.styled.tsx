import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 187px;
    width: 700px;
    max-width: 100%;
    margin-top: 70px;
    padding-top: 100px;

    @media (max-width: 822px) {
        width: 345px;
    }
`;

export const Image = styled.img`
    width: 94px;
    height: 84px;
    margin-bottom: 30px;

     @media (max-width: 822px) {
        width: 81px;
        height: 75px;
        margin-bottom: 21px;
    }
`;

export const Subtitle = styled.p`
    font-family: 'Futura PT';
    font-size: 30px;
    line-height: 38px;
    font-weight: 500;
    color: var(--primary-color);
    margin-bottom: 10px;

    @media (max-width: 822px) {
        font-size: 22px;
        line-height: 28px;
        margin-top: 0;
    }
`;

export const Text = styled.p`
    font-family: 'Futura PT';
    font-size: 22px;
    line-height: 28px;
    font-weight: 400;
    color: var(--primary-color);
    text-align: center;
    width: 100%;
    margin: 0;

    @media (max-width: 822px) {
        font-size: 18px;
        line-height: 23px;
    }
`;

export const PreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    width: 100%;
    max-width: 100%; 
    margin-top: 100px;
    padding-bottom: 100px;
    padding-left: 120px;
    box-sizing: border-box;

    @media (max-width: 822px) {
        padding-left: 15px;
    }
`;

export const Title = styled.h1`
    font-family: 'Futura PT';
    font-size: 30px;
    line-height: 38px;
    font-weight: 500;
    color: var(--primary-color);
    margin-bottom: 20px;
    margin-top: 0;
`;

export const Grid = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;

    @media (max-width: 576px) {
        overflow-x: auto; 
        white-space: nowrap; 
    }
`;

export const PrintImage = styled.img`
    width: 200px;
    height: 254px;
    border-radius: 12px;
    cursor: pointer;
`;


