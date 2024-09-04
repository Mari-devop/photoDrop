import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
`;

export const FirstRow = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 100px;
    padding-right: 100px;
    padding-top: 40px;

    @media (max-width: 1920px) {
        padding-left: 60px;
        padding-right: 60px;
    }

    @media (max-width: 1440px) {
        padding-left: 40px;
        padding-right: 40px;
    }

    @media (max-width: 1200px) {
        padding-left: 20px;
        padding-right: 20px;
    }

    @media (max-width: 1000px) {
        padding: 15px;
    }

    @media (max-width: 375px) {
        padding: 0px;
    }
`;

export const SecondRow = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 100px;
    padding-right: 100px;
    padding-top: 100px;

    @media (max-width: 1920px) {
        padding-left: 60px;
        padding-right: 60px;
    }

    @media (max-width: 1440px) {
        padding-left: 40px;
        padding-right: 40px;
    }

    @media (max-width: 1200px) {
        padding-left: 20px;
        padding-right: 20px;
    }

    @media (max-width: 1000px) {
        padding: 15px;
    }

    @media (max-width: 375px) {
        padding: 0px;
    }
`;

export const Subtitle = styled.h2`
    font-family: 'Futura PT';
    font-size: 16px;
    font-weight: 500;
    color: var(--primary-color);
    margin-bottom: 19px;

    @media (max-width: 375px) {
        padding-left: 5px;
    }
`;

export const AlbumContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-bottom: 19px;
    overflow-x: auto; 
    white-space: nowrap; 
`;

export const Album = styled.div`
    display: flex;
    flex-shrink: 0;
    position: relative;
    outline: none;
    
    img {
        width: 200px;
        height: 254px;
        border-radius: 12px;
        object-fit: cover;

        @media (max-width: 537px) {
            width: 110px;
            height: 140px;
        }
    }
`;

export const PhotoContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); 
    grid-template-rows: auto;
    gap: 0;

    @media (max-width: 1440px) {
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    }

    @media (max-width: 1200px) {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }

    @media (max-width: 900px) {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }

    @media (max-width: 537px) {
        grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        cursor: pointer;
        aspect-ratio: 1 / 1; 
    }
`;

export const Text = styled.p`
    font-family: 'Futura PT';
    font-size: 14px;
    line-height: 18px;
    font-weight: 440;
    color: var(--white-color);
    text-align: center;
    width: 100%;
    margin: 0;
    position: absolute;
    z-index: 1000;
    bottom: 20px;
    left: 0;
`;

export const ButtonsContainer = styled.div`
  position: absolute;
  bottom: 30px;
  display: flex;
  gap: 29px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const UnlockButton = styled.button`
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Futura PT';
    font-weight: 500;
    font-size: 22px;
    line-height: 28px;
    background-color: var(--white-color);
    color: var(--primary-color);
    border: none;
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

export const ImageWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    border: 0.3px solid var(--button-hover-color);  
    background-color: rgba(51, 0, 204, 0.05);
    aspect-ratio: 1 / 1;
`;

export const SpinnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export const LoadMoreButton = styled.button`
  display: block;
  margin: 20px auto; 
  padding: 10px 20px;
  background-color: #3300cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: #220099;
  }
`;