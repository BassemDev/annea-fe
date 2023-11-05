import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import styled from "styled-components";

const StyledProgressSpinner = styled(ProgressSpinner)`
  position: absolute;
  top: 25%;
  left: 10px;
  margin: 0 auto;
`;

interface Props {
  size: number;
  animationTime?: number;
  borderWidth?: number;
}

export const Spinner: React.FunctionComponent<Props> = ({
  size,
  animationTime = 0.5,
  borderWidth = 4,
}) => {
  return (
    <StyledProgressSpinner
      style={{ width: `${size}px`, height: `${size}px` }}
      strokeWidth={String(borderWidth)}
      animationDuration={`${animationTime}s`}
    />
  );
};
