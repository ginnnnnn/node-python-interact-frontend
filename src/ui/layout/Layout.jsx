import React from 'react';
import styled from 'styled-components';
import Paper from '../paper/paper.component';

const LayoutContainer = styled.div`
  width: 80%;
  height: 95%;
  margin: 0 auto;
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Paper h="100%">{children}</Paper>
    </LayoutContainer>
  );
};

export default Layout;
