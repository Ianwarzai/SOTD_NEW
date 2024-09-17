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

  @media (max-width: 1200px) {
    font-size: 18px;
    padding: 8px 12px;
  }

  @media (max-width: 992px) {
    font-size: 16px;
    padding: 6px 10px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 4px 8px;
  }

  @media (max-width: 576px) {
    font-size: 18px;
    padding: 5px 10px;
  }
`;

const Logoimg = styled.img`
  display: flex;
  justify-content: center;
  width: 3.5%;
  max-width: 100px;
  height: auto;
  position: absolute;
  left: 20px;
  top: 10px;
  z-index: 10;

  @media (max-width: 768px) {
    width: 7%;
  }

  @media (max-width: 480px) {
    width: 10%;
  }
`;

const NavbarContainer = styled.div`
  background-color: transparent;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  flex-wrap: wrap;
  margin-left: 500px;

  @media (max-width: 768px) {
    justify-content: space-around;
    margin-left: 100px;
  }
`;

const PageContainer = styled.div`
  background-color: #f0f0f0;
`;

const AuthContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 10px;
  }
`;

const AuthLink = styled(Link)`
  font-size: 18px;
  color: white;
  background-color: black;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 20px;
  border: 2px solid black;
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: white;
    color: black;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 8px 16px;
  }
`;

const LogoutButton = styled.button`
  font-size: 18px;
  color: white;
  background-color: black;
  padding: 10px 20px;
  border-radius: 20px;
  border: 2px solid black;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: white;
    color: black;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 8px 16px;
  }
`;

export const Navbar = () => {
  const [selectedTab, setSelectedTab] = useState(ROUTES.HOME_PATH);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState(''); // State to store user's email

  useEffect(() => {
    const currentPath = window.location.pathname;
    setSelectedTab(currentPath);
    setCurrentPath(currentPath);

    // Check if user is logged in by checking localStorage
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('email'); // Get user's email from localStorage
    setIsLoggedIn(loggedInStatus === 'true');
    if (loggedInStatus === 'true' && userEmail) {
      const username = userEmail.split('@')[0]; // Extract part before "@"
      setLoggedInEmail(username); // Set only the first part of the email
    }
  }, []);

  const handleTabClick = (path) => {
    setSelectedTab(path);
    setCurrentPath(path);
  };

  const handleLogout = () => {
    // Log the user out and update the state
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('email'); // Remove email on logout
    setIsLoggedIn(false);
    setLoggedInEmail('');
  };

  return (
    <PageContainer>
      <div>
        <Link to={ROUTES.HOME_PATH} onClick={() => handleTabClick(ROUTES.HOME_PATH)}>
          <Logoimg src={currentPath === ROUTES.HOME_PATH ? Logo : BlueLogo} />
        </Link>
        <NavbarContainer>
          <NavLink to={ROUTES.HOME_PATH} onClick={() => handleTabClick(ROUTES.HOME_PATH)} selected={selectedTab === ROUTES.HOME_PATH} $currentPath={currentPath}>
            HOME
          </NavLink>
          <NavLink to={ROUTES.SOTD_PATH} onClick={() => handleTabClick(ROUTES.SOTD_PATH)} selected={selectedTab === ROUTES.SOTD_PATH} $currentPath={currentPath}>
            SOTD
          </NavLink>
          <NavLink to={ROUTES.ABOUT_PATH} onClick={() => handleTabClick(ROUTES.ABOUT_PATH)} selected={selectedTab === ROUTES.ABOUT_PATH} $currentPath={currentPath}>
            ABOUT
          </NavLink>
          <NavLink to={ROUTES.CONTACT_PATH} onClick={() => handleTabClick(ROUTES.CONTACT_PATH)} selected={selectedTab === ROUTES.CONTACT_PATH} $currentPath={currentPath}>
            CONTACT
          </NavLink>

          <AuthContainer>
            {!isLoggedIn ? (
              <>
                <AuthLink to="/login">Login</AuthLink>
                <AuthLink to="/signup">Sign Up</AuthLink>
              </>
            ) : (
              <>
                <strong><span style={{ color: 'black' }}>{loggedInEmail}</span></strong> {/* Display only the first part of the email */}
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
              </>
            )}
          </AuthContainer>
        </NavbarContainer>
      </div>
    </PageContainer>
  );
};
