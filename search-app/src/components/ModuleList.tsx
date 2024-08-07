import React from 'react';

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
    <ul>
      {modules.map((module) => (
        <li key={module.repository_id}>
          <h2>{module.name}</h2>
          <p>Owner: {module.owner ? module.owner : 'N/A'}</p>
          <p>Stars: {module.stars}</p>
        </li>
      ))}
    </ul>
  );
};

export default ModuleList;
