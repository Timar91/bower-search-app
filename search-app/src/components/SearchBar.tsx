import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 10px;
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.6em;
    width: 77%;
  }
`;

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return <Input type="text" placeholder="Search for a module" value={searchQuery} onChange={handleChange} />;
};

export default SearchBar;
