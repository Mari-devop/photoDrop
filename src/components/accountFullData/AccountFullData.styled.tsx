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
    padding-left: 120px;
    padding-right: 120px;
    padding-top: 40px;

    @media (max-width: 1000px) {
        padding: 15px;
    }
`;

export const SecondRow = styled.div`
    display: flex;
    flex-direction: column;
     padding-left: 120px;
    padding-right: 120px;
    padding-top: 100px;

    @media (max-width: 1839px) {
        padding: 110px;
    }

    @media (max-width: 1819px) {
        padding: 100px;
    }
    
    @media (max-width: 1799px) {
        padding: 50px;
    }

    @media (max-width: 1699px) {
        padding: 40px;
    }

    @media (max-width: 1666px) {
        padding: 120px;
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
    grid-template-columns: repeat(auto-fill, 400px);
    grid-template-rows: auto;
   
    img {
        width: 400px;
        height: 400px;
        object-fit: cover;

        @media (max-width: 1439px) {
            width: 350px;
            height: 350px;
        }
        @media (max-width: 1283px) {
            width: 250px;
            height: 250px;
        }
        @media (max-width: 900px) {
            width: 250px;
            height: 250px;
        }

        @media (max-width: 537px){
            width: 125px;
            height: 125px;
        }
    }

    @media (max-width: 1439px) {
         grid-template-columns: repeat(auto-fill, 350px);
    }

     @media (max-width: 1283px) {
         grid-template-columns: repeat(auto-fill, 250px);
    }

    @media (max-width: 900px) {
         grid-template-columns: repeat(auto-fill, 250px);
    }

     @media (max-width: 537px) {
         grid-template-columns: repeat(auto-fill, 125px);
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


