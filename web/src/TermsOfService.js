import React from 'react';
import styled from 'styled-components';

const PolicyContainer = styled.div`
  background-color: #1e1e1e;
  color: #ffffff;
  padding: 20px;
  margin: 20px auto;
  max-width: 800px;
  font-size: 14px;
  line-height: 1.6;
`;

const TermsOfService = () => {
  return (
    <PolicyContainer>
      <h1>Terms of Service</h1>
      <p>Your Terms of Service text goes here...</p>
    </PolicyContainer>
  );
};

export default TermsOfService;
