import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import PageNotFound from "./404img.png";

const StyledImg = styled.img`
  width: 250px;
  hegit: 250px;

  border-radius: 40%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-top: 150px;
`;

export const NotFound: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <StyledImg src={PageNotFound} alt={"The following image is missing"} />
      <p>We are sorry but the page you are looking for does not exist.</p>
      <p style={{ textAlign: "center" }}>
        <Link to="/">Go to Home </Link>
      </p>
    </Wrapper>
  );
};
