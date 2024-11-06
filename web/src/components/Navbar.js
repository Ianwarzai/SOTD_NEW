import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";
import { ROUTES } from '../constants';
import Logo from '../../WhiteLogo.PNG';
import BlueLogo from '../../BlackLogo.png';

const NavLink = styled(Link)`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  color: ${({ $currentPath }) => $currentPath === ROUTES.HOME_PATH ? 'white' : 'black'};
  text-decoration: none;
  transition: color 0.2s ease-out, background-color 0.2s ease-out;
  border-radius: 3px;
  border: 0px solid white;
  position: relative;
  z-index: 10;
  &:hover {
    background-color: white;
    color: black;
    cursor: pointer;
    transition: background-color 0.3s ease-out;
  }
  ${({ selected }) => selected && css`
    background-color: #f0f0f0;
    color: #4c4c4c;
  `}
`;

const Logoimg = styled.img`
  width: 3.5%;
  max-width: 100px;
  height: auto;
  position: absolute;
  left: 20px;
  top: 10px;
  z-index: 10;
`;

const NavbarContainer = styled.div`
  background-color: transparent;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
`;

export const Navbar = () => {
  const [selectedTab, setSelectedTab] = useState(ROUTES.HOME_PATH);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState('');

  useEffect(() => {
    const currentPath = window.location.pathname;
    setSelectedTab(currentPath);
    setCurrentPath(currentPath);

    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('email');
    setIsLoggedIn(loggedInStatus === 'true');
    if (loggedInStatus === 'true' && userEmail) {
      const username = userEmail.split('@')[0];
      setLoggedInEmail(username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setLoggedInEmail('');
  };

  return (
    <NavbarContainer>
      <NavLink to={ROUTES.HOME_PATH} selected={selectedTab === ROUTES.HOME_PATH} onClick={() => setSelectedTab(ROUTES.HOME_PATH)}>
        HOME
      </NavLink>
      <NavLink to={ROUTES.SOTD_PATH} selected={selectedTab === ROUTES.SOTD_PATH} onClick={() => setSelectedTab(ROUTES.SOTD_PATH)}>
        SOTD
      </NavLink>
      <NavLink to={ROUTES.ABOUT_PATH} selected={selectedTab === ROUTES.ABOUT_PATH} onClick={() => setSelectedTab(ROUTES.ABOUT_PATH)}>
        ABOUT
      </NavLink>
      <NavLink to={ROUTES.CONTACT_PATH} selected={selectedTab === ROUTES.CONTACT_PATH} onClick={() => setSelectedTab(ROUTES.CONTACT_PATH)}>
        CONTACT
      </NavLink>
      {isLoggedIn ? (
        <div>
          <span>{loggedInEmail}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : null}
    </NavbarContainer>
  );
};
