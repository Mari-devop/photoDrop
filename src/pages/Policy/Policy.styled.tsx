import styled from "styled-components";

export const PolicyContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 700px;
    margin-top: 41px;

    @media (max-width: 476px) {
        width: 345px;
        padding: 0 20px;
    }

    @media (max-width: 344px) {
        width: 320px;
        padding: 0 20px;
    }
`;

export const Title = styled.h1`
    font-size: 30px;
    line-height: 36px;
    font-weight: 700;
    color: var(--primary-color);
    font-family: 'Termina Test';
    margin-bottom: 15px;
    margin-top: 60px;
    text-align: center;
`;

export const Text = styled.p`
    font-size: 18px;
    line-height: 23px;
    font-weight: 500;
    color: var(--primary-color);
    font-family: 'Futura PT';
    text-align: left;
    margin-bottom: 25px;
    margin-top: 0px;
    letter-spacing: -0.02em;
`;

export const Subtitle = styled.h4`
    font-size: 18px;
    line-height: 27px;
    font-weight: 600;
    color: var(--primary-color);
    font-family: 'Futura PT';
    text-align: left;
    margin: 0;
`;