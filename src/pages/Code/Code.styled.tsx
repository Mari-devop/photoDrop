import styled from "styled-components";

export const Input = styled.input`
    width: 43px;
    height: 38px;
    font-size: 18px;
    text-align: center;
    background-color: var(--input-color);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    padding: 0px;
    margin: 0px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const LinkButton = styled.button`
    display: flex;
    color: var(--button-color);
    font-family: 'Futura PT';
    font-size: 18px;
    line-height: 23px;
    font-weight: 400;
    background: none;
    border: none;
    cursor: pointer;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 0px;
`;

export const OTPContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 30px;

    @media (max-width: 500px) {
        gap: 15px;
    }

    @media (max-width: 344px) {
        gap: 10px;
    }
`;