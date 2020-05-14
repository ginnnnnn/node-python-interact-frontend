import React from "react";

import { SpinnerOverlay, SpinnerContainer } from "./spinner.styles";

const Spinner = ({ w, h, vh }) => {
  return (
    <SpinnerOverlay vh={vh}>
      <SpinnerContainer w={w} h={h} />
    </SpinnerOverlay>
  );
};

export default Spinner;
