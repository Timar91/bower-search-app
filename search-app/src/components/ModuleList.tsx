import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  h2 {
    font-size: 1.5em;
    margin: 0 0 10px 0;
  }
  p {
    margin: 5px 0;
  }
  @media (max-width: 768px) {
    h2 {
      font-size: 1.2em;
    }
    p {
      font-size: 0.9em;
    }
  }
`;

interface Module {
  repository_id: string;
  name: string;
  owner: string | null;
  stars: number;
}

interface ModuleListProps {
  modules: Module[];
}

const ModuleList: React.FC<ModuleListProps> = ({ modules }) => {
  return (
    <List>
      {modules.map((module) => (
        <ListItem key={module.repository_id}>
          <h2>{module.name}</h2>
          <p>Owner: {module.owner ? module.owner : 'N/A'}</p>
          <p>Stars: {module.stars}</p>
        </ListItem>
      ))}
    </List>
  );
};

export default ModuleList;
