import React from 'react';

interface SortButtonsProps {
  onSortChange: (field: string) => void;
}

const SortButtons: React.FC<SortButtonsProps> = ({ onSortChange }) => {
  return (
    <div>
      <button onClick={() => onSortChange('stars')}>Sort by Stars</button>
      <button onClick={() => onSortChange('name')}>Sort by Name</button>
    </div>
  );
};

export default SortButtons;
