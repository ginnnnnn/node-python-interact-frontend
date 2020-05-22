import React from 'react';
import FirstPage from './pages/First.page';
import './App.css';
import Layout from './ui/layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <FirstPage />
      </Layout>
    </div>
  );
}

export default App;
