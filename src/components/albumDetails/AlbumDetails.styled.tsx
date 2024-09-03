import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    width: 100%;
`;

export const PhotoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 400px); 
    justify-content: center;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 400px);
    }

    @media (max-width: 800px) {
        grid-template-columns: repeat(1, 400px); 
    }

    img {
        width: 400px;
        height: 400px;
        object-fit: cover;
        cursor: pointer;
    }
`;

export const Button = styled.button`
    width: 300px;
    height: 50px;
    background-color: var(--button-color);
    color: var(--white-color);
    font-family: 'Futura PT';
    font-size: 22px;
    font-weight: 500;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  
    margin: 100px auto;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ImageWrapper = styled.div`
  width: 400px;
  height: 400px;
  position: relative;
  border: 0.3px solid var(--button-hover-color);  
  background-color: rgba(51, 0, 204, 0.05);
`;

