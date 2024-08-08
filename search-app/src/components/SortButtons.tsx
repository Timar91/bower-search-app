import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background-color: #f0f0f0;
  &:hover {
    background-color: #e0e0e0;
  }
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.9em;
  }
`;

interface SortButtonsProps {
  onSortChange: (field: string) => void;
}

const SortButtons: React.FC<SortButtonsProps> = ({ onSortChange }) => {
  return (
    <div>
      <Button onClick={() => onSortChange('stars')}>Sort by Stars</Button>
      <Button onClick={() => onSortChange('name')}>Sort by Name</Button>
    </div>
  );
};

export default SortButtons;
