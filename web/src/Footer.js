import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #1e1e1e;
  padding: 20px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #ffffff;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;

  a {
    color: #ffffff;
    margin: 0 15px;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #00ff00;
    }
  }
`;

const CopyrightText = styled.div`
  font-size: 12px;
  color: #b0b0b0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinks>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-service">Terms of Service</a>
        <a href="/cookie-policy">Cookie Policy</a>
      </FooterLinks>
      <CopyrightText>© 2024 Your Company Name. All rights reserved.</CopyrightText>
    </FooterContainer>
  );
};

export default Footer;
