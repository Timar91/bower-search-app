import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  padding: 20px;
  background-color: #282c34;
  color: white;
  text-align: center;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <h1>Modules List</h1>
    </HeaderContainer>
  );
};

export default Header;
