import styled from 'styled-components';

export const MobileContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 226px;
    height: 119px;
    box-sizing: border-box;
    position: absolute;
    top: calc(100% + 30px); 
    right: -135px; 
    transform: translate(-50%, -50%);
    background-color: var(--popup-color);
    border-radius: 12px;
    z-index: 1000;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid var(--popup-divider-color);
    box-sizing: border-box;
    padding-top: 9px;
    padding-bottom: 5px;
    padding-left: 14px;
    padding-right: 9px;

    &:last-child {
        border-bottom: none;
    }

    p {
        font-size: 15px;
        line-height: 20px;
        font-weight: 400;
        color: #000000;
        font-family: Helvetica;
        margin-top: 0;
        margin-bottom: 0;
    }
`;

export const Image = styled.img`
    width: 33px;
    height: 25px;
`;
