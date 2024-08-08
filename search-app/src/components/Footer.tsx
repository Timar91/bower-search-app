import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 20px;
  background-color: #282c34;
  color: white;
  text-align: center;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <p>© 2024 Libraries.io</p>
    </FooterContainer>
  );
};

export default Footer;
