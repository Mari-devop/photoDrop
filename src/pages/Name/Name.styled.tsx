import styled from "styled-components";

export const NameContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 420px;
    height: 110px;

    @media(max-width: 500px) {
        width: 345px;
    }
`;