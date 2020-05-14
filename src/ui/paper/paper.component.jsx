import React from "react";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";

const MyOwnPaper = styled(({ h, ...others }) => <Paper {...others} />)`
  height: ${({ h }) => (h ? h : "")};
`;

const MyPaper = ({ children, h }) => {
  return <MyOwnPaper h={h}>{children}</MyOwnPaper>;
};

export default MyPaper;
