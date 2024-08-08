import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import SearchBar from './SearchBar';
import SortButtons from './SortButtons';
import ModuleList from './ModuleList';
import Pagination from './Pagination';

interface Module {
  repository_id: string;
  name: string;
  owner: string | null;
  stars: number;
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px 0;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 10px 0;
  }
`;

const LibrariesList: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('react');
  const [sortField, setSortField] = useState<string>('stars');
  const [error, setError] = useState<string | null>(null);

  const apiKey = '89b9b269a559e361095973dbcdd3ca86';
  const resultsPerPage = 5;
  const totalItemsToFetch = 20;

  useEffect(() => {
    const fetchModules = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://libraries.io/api/search?q=${searchQuery}&sort=${sortField}&order=desc&api_key=${apiKey}&per_page=${totalItemsToFetch}&page=1`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setModules(data);
        setTotalPages(Math.ceil(data.length / resultsPerPage));
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchModules();
  }, [apiKey, searchQuery, sortField]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(1); // Reset to first page on search
  };

  const handleSortChange = (field: string) => {
    setSortField(field);
    setPage(1); // Reset to first page on sort change
  };

  const startIndex = useMemo(() => (page - 1) * resultsPerPage, [page, resultsPerPage]);
  const endIndex = useMemo(() => startIndex + resultsPerPage, [startIndex, resultsPerPage]);
  const currentModules = useMemo(() => modules.slice(startIndex, endIndex), [modules, startIndex, endIndex]);

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <Sidebar />
        <MainContent>
          <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
          <SortButtons onSortChange={handleSortChange} />
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <ModuleList modules={currentModules} />
          )}
          <Pagination totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />
        </MainContent>
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
};

export default LibrariesList;
