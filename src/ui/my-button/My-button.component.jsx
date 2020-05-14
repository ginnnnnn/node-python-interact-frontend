import React from 'react';
import styled from 'styled-components';

const MyButton = styled(({ bg, w, mr, fs, pd, h, ...others }) => (
  <button {...others} />
))`
  width: ${({ w }) => (w ? w : '100%')};
  color: #fff;
  height: ${({ h }) => (h ? h : '')};
  font-size: ${({ fs }) => (fs ? fs : '0.875rem')};
  padding: ${({ pd }) => (pd ? pd : '6px 16px')};
  min-width: 64px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: ${({ bg }) => (bg ? bg : '#357EDD')};
  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
  margin: ${({ mr }) => (mr ? mr : '5px 0')};
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 500;
  line-height: 1.75;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  user-select: none;
  justify-content: center;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  outline: 0;
  text-indent: 0px;
  text-shadow: none;
  text-align: center;
  font: 400 system-ui;
  :hover {
    background-color: #d5008f;
    color: #ffdfdf;
  }
`;

export default MyButton;
