import styled from "styled-components";

export const NavbarContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    z-index: 1000;
    padding: 19px 0;
    background-color: var(--white-color);
    border-bottom: 1px solid var(--divider-color);
    box-sizing: border-box;

    img {
        height: 100%;
        width: auto;
    }
`;