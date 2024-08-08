import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  padding: 20px;
  border-right: 1px solid #ddd;
  @media (max-width: 768px) {
    width: 80%;
    border-right: none;
    border-bottom: 1px solid #ddd;
    padding: 0;
  }
`;

const Placeholder = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  cursor: pointer;
   @media (max-width: 768px) {
    font-size: 0.6em;
    padding: 5px;
    margin-bottom: 10px;
  }
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <h2>Sidebar</h2>
      <Placeholder>
        <p>Filter by Category</p>
      </Placeholder>
      <Placeholder>
        <p>Top Modules</p>
      </Placeholder>
      <Placeholder>
        <p>Recently Added</p>
      </Placeholder>
      <Placeholder>
        <p>Favorites</p>
      </Placeholder>
    </SidebarContainer>
  );
};

export default Sidebar;
