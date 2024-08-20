import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 100vh; 
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1; 
  width: 100%;
`;

export const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%; 
  max-width: 420px; 
  padding: 0 10px; 
  box-sizing: border-box; 

  @media(max-width: 500px) {
    max-width: 345px;
    padding: 0 10px; 
  }
`;

export const Text = styled.p`
  width: 100%;
  max-width: 420px;
  font-size: 16px;
  line-height: 21px;
  font-weight: 200;
  color: var(--secondary-color);
  font-family: 'Futura PT';
  text-align: left;
  margin-bottom: 20px; 

  @media(max-width: 500px) {
    max-width: 345px;
  }

  a {
    text-decoration: underline var(--button-color);
    cursor: pointer;
    color: var(--secondary-color);
  }
`;