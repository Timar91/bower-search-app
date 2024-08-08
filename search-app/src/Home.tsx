import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import SortButtons from './components/SortButtons';
import ModuleList from './components/ModuleList';
import Pagination from './components/Pagination';


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
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const LibrariesList: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('react');
  const [sortField, setSortField] = useState<string>('stars');
  const apiKey = '89b9b269a559e361095973dbcdd3ca86';
  const resultsPerPage = 5;
  const totalItemsToFetch = 20;

  useEffect(() => {
    const fetchModules = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://libraries.io/api/search?q=${searchQuery}&sort=${sortField}&order=desc&api_key=${apiKey}&per_page=${totalItemsToFetch}&page=1`
        );
        const data = await response.json();
        setModules(data);
        setTotalPages(Math.ceil(data.length / resultsPerPage));
      } catch (error) {
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
