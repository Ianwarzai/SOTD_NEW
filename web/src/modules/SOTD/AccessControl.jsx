import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  border: none;
`;

const AccessControl = ({ onAccessGranted }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Select Access Level</h2>
        <Button onClick={() => onAccessGranted(false)}>Paying Customer</Button>
        <Button onClick={() => onAccessGranted(true)}>Guest</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AccessControl;
