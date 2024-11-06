import React, { useState } from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;

  &:checked + div {
    background: black;

    &:before {
      transform: translate(32px, -50%);
    }
  }
`;

const Switch = styled.div`
  position: relative;
  width: 49px; 
  height: 20px; 
  background: #b3b3b3;
  border-radius: 32px;
  padding: 2px; 
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: "";
    position: absolute;
    width: 16px; 
    height: 16px; 
    border-radius: 50%;
    top: 50%;
    left: 2px; 
    background: white;
    transform: translate(0, -50%);
  }
`;


const ToggleSwitch = ({ toggleTheme }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    toggleTheme();
  };

  return (
    <Label>
      <Input checked={checked} type="checkbox" onChange={handleChange} />
      <Switch />
      <span>{checked ? 'dark' : 'light'}</span>
    </Label>
  );
};

export default ToggleSwitch;
