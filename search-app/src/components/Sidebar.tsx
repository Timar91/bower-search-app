import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 150px;
  padding: 20px;
  border-right: 1px solid #ddd;
`;

const Placeholder = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
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
