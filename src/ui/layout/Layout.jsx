import React from 'react';
import styled from 'styled-components';
import logo from '../../assest/walton.png';
const LayoutContainer = styled.div`
  width: 85%;
  margin: 0 auto;
`;
const PageHeader = styled.div`
  margin: 1rem 0 1.5rem;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
`;
const MainLogo = styled.img`
  width: 10rem;
`;
const Footer = styled.div`
  align-self: flex-end;
  display: flex;
  font-size: 0.5rem;
  justify-content: center;
  color: #fff;
  padding: 2rem;
`;
const Navigation = styled.div`
  padding: 0 0.5rem;
`;
const NavLinkContainer = styled.div`
  color: #fff;
  cursor: pointer;
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <PageHeader>
        <MainLogo src={logo} alt="logo" />
        <Navigation>
          <NavLinkContainer>AOI介面</NavLinkContainer>
        </Navigation>
      </PageHeader>
      {children}
      <Footer>
        FS-TECH COMPANY LTD. © Copyright 2020. All Rights Reserved.
        (建議使用Chrome或IE11以上瀏覽器)
      </Footer>
    </LayoutContainer>
  );
};

export default Layout;
