import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 420px;
`;

export const Subtitle = styled.p`
    font-family: 'Futura PT';
    font-size: 22px;
    margin-top: 28px;
    text-align: left;
    margin-top: 0;
    margin-bottom: 19px;
    
    span {
        font-weight: bold;
    }
    `;

export const Text = styled.p`
    font-family: 'Futura PT';
    font-size: 22px;
    margin-top: 28px;
    text-align: left;
    margin-top: 0;
    margin-bottom: 39px;
 `;

export const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 40px; 
    width: 350px;      
`;

export const Button = styled.button`
    width: 350px;
    height: 50px;
    background-color: var(--button-color);
    color: #fff;
    font-family: 'Futura PT';
    font-size: 22px;
    line-height: 28px;
    font-weight: 500;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    margin-bottom: 19px;
`;

export const SmallText = styled.p`
    font-family: 'Futura PT';
    font-size: 18px;
    line-height: 23px;
    font-weight: 400;
    color: var(--primary-color);
    margin-top: 0;
`;