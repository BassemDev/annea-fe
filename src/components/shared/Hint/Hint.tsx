import React from "react";
import styled from "styled-components";

const StyledSmall = styled.small`
  color: #8d9094;
`;

interface Props {
  message: string;
}

export const Hint: React.FunctionComponent<Props> = ({ message }) => {
  return (
    <StyledSmall id="username-help" data-testid="hint">
      {message}
    </StyledSmall>
  );
};
