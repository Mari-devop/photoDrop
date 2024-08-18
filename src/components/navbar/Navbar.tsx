import React from 'react'
import logo from '../../assets/images/logo.png';
import { NavbarContainer } from './Navbar.styled';

const Navbar = () => {
  return (
    <NavbarContainer >
      <img src={logo} alt="logo" />
    </NavbarContainer>
  )
}

export default Navbar