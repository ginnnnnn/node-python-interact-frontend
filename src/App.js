import React from 'react';
import FirstPage from './pages/First.page';
import './App.css';
import Layout from './ui/layout/Layout';
import styled from 'styled-components';

const PageTitle = styled.h1`
  color: white;
`;
function App() {
  return (
    <div className="App">
      <PageTitle>華東AOI</PageTitle>
      <Layout>
        <FirstPage />
      </Layout>
    </div>
  );
}

export default App;
