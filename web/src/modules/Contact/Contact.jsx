import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const buttonPulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled components
const PageContainer = styled.div`
  background-color: #1e1e1e;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${fadeIn} 1s ease-out;
`;

const Header = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 3rem;
  color: #f0f0f0;
  text-align: center;
  margin-bottom: 0.5rem;
  animation: ${fadeIn} 1.5s ease-out;
`;

const SubHeader = styled.h4`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 1.2rem;
  color: #bbb;
  text-align: center;
  margin-bottom: 2rem;
  animation: ${fadeIn} 2s ease-out;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background: #2c2c2c;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 2rem;
  box-sizing: border-box;
  animation: ${fadeIn} 2.5s ease-out;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #444;
  border-radius: 4px;
  font-size: 1rem;
  background: #333;
  color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease, background-color 0.3s ease;

  &:focus {
    border-color: #ffffff; /* White border on focus */
    background-color: #444;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid #444;
  border-radius: 4px;
  font-size: 1rem;
  background: #333;
  color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease, background-color 0.3s ease;

  &:focus {
    border-color: #ffffff; /* White border on focus */
    background-color: #444;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  background-color: #ffffff;
  color: #1e1e1e;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  animation: ${buttonPulse} 1s infinite;

  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #e0e0e0;
    transform: translateY(1px);
  }
`;

const Label = styled.label`
  position: absolute;
  top: 10px;
  left: 16px;
  color: #777;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-weight: bold;

  ${Input}:focus ~ &,
  ${Input}:valid ~ &,
  ${TextArea}:focus ~ &,
  ${TextArea}:valid ~ & {
    top: -15px;
    left: 8px;
    font-size: 0.75rem;
    color: white;
    font-weight: bold;
  }
`;

const FloatingLabelInput = ({ type, value, onChange, label, required }) => (
  <InputWrapper>
    <Input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder=" "
    />
    <Label>{label}</Label>
  </InputWrapper>
);

// Main Contact component
export const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState("Send Message");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus("Sending...");
    let details = {
      name,
      email,
      phone,
      message,
    };

    // Log the user details before sending
    console.log("User Details: ", details);

    fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(result => {
      setStatus("Send Message");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      alert(result.status);
    })
    .catch(error => console.error('Error:', error));

    setStatus("Send Message");
  };

  return (
    <PageContainer>
      <Header>Contact Us</Header>
      <SubHeader>We'd love to hear from you!</SubHeader>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FloatingLabelInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
            required
          />
          <FloatingLabelInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            required
          />
          <FloatingLabelInput
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            label="Phone Number"
            required
          />
          <InputWrapper>
            <TextArea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder=" "
            />
            <Label>Message</Label>
          </InputWrapper>
          <SubmitButton type="submit">{status}</SubmitButton>
        </form>
      </FormContainer>
    </PageContainer>
  );
};
