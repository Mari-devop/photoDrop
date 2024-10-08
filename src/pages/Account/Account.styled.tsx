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
`;

export const FullscreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 23px;
  left: 40px;
  background: none;
  border: none;
  color: white;
  width: 27px;
  height: 27px;
  font-size: 36px;
  cursor: pointer;
  padding: 0;
`;

export const DownloadButton = styled.a`
    font-family: 'Futura PT';
    font-weight: 400;
    font-size: 14px;
    line-height: 8px;
    background-color: transparent;
    color: var(--white-color);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    text-decoration: none;
    gap: 5px;
    width: 58px;
    height: 37px;
`;

export const SeeInFrameButton = styled.button`
    font-family: 'Futura PT';
    font-weight: 500;
    font-size: 22px;
    line-height: 28px;
    background-color: transparent;
    color: var(--white-color);
    border: 1px solid var(--white-color);
    border-radius: 25px;
    width: 200px;
    height: 50px;
    cursor: pointer;

    @media (max-width: 435px) {
        font-size: 18px;
        line-height: 23px;
        width: 150px;
        height: 40px;
    }

    @media (max-width: 354px) {
        width: 130px;  
    }
`;

export const ShareButton = styled.button`
 font-family: 'Futura PT';
    font-weight: 400;
    font-size: 14px;
    line-height: 8px;
    background-color: transparent;
    color: var(--white-color);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    text-decoration: none;
    gap: 5px;
    width: 32px;
    height: 37px;
`;