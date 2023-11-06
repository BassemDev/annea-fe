import React from "react";
import styled from "styled-components";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { BiSolidError } from "react-icons/bi";
import { AiOutlineNotification } from "react-icons/ai";

import { TABLE_HEADER_LABELS } from "./constants";
import { Indicator } from "../../__generated_graphql__/graphql";
import { ApolloError } from "@apollo/client";

const TableHeader = styled.th`
  padding: 5px;

  border-bottom: 1px solid #e5e7eb;

  font-weight: 500;
  color: #44448d;
  text-align: left;
  font-size: 1.1rem;
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
`;

const SpecialCaseRow = styled.tr`
  display: flex;
  align-items: center;
  flex-direction: row;

  padding: 20px;
`;

const DataCells = styled.td<{ align?: string }>`
  padding: 5px;
  padding-top: 15px;
  padding-bottom: 15px;

  border-bottom: 1px solid #e5e7eb;

  font-size: 0.875rem;
  font-weight: 400;
  text-align: ${(props) => (props.align ? props.align : "left")};
  color: #32324f;
`;

const SpacerRight = styled.span`
  margin-right: 15px;
`;

const NotDataCell = styled.td`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const StyledMdOutlineDeleteSweep = styled(MdOutlineDeleteSweep)`
  transition: 0.4s;

  &:hover {
    width: 30px;
    height: 30px;

    transition: all 0.4s ease-in-out 0s;
  }
`;

const StyledAiOutlineEdit = styled(AiOutlineEdit)`
  transition: 0.4s;

  &:hover {
    width: 30px;
    height: 30px;

    transition: all 0.4s ease-in-out 0s;
  }
`;

interface Props {
  indicators: Indicator[] | undefined;
  error: ApolloError | undefined;
  onIndicatorDelete: (id: number) => void;
}

export const IndicatorTable: React.FC<Props> = ({
  indicators,
  error,
  onIndicatorDelete,
}) => {
  return (
    <Table>
      <thead>
        <tr>
          {TABLE_HEADER_LABELS.map((label, index) => (
            <TableHeader key={index}>{label}</TableHeader>
          ))}
        </tr>
      </thead>
      <tbody>
        {(indicators === undefined || error) && (
          <SpecialCaseRow>
            <td colSpan={5}>
              <BiSolidError size={20} color="#f44336" />
              <SpacerRight />
              <span>There was a problem loading your data.</span>
            </td>
          </SpecialCaseRow>
        )}
        {indicators?.length === 0 && (
          <SpecialCaseRow>
            <NotDataCell colSpan={5}>
              <AiOutlineNotification size={20} color="#f8ae03" />
              <SpacerRight />
              <span>There is no Element to display currently.</span>
            </NotDataCell>
          </SpecialCaseRow>
        )}
        {indicators?.length !== 0 &&
          indicators?.map((indicator, index) => (
            <tr key={index}>
              <DataCells>
                <span>{indicator.id}</span>
              </DataCells>
              <DataCells>
                <span>{indicator.turbineId}</span>
              </DataCells>
              <DataCells>
                <span>{indicator.variable}</span>
              </DataCells>
              <DataCells>
                <span>{indicator.timestamp}</span>
              </DataCells>
              <DataCells align="right">
                <StyledAiOutlineEdit
                  size={22}
                  color="#41c6b4"
                  cursor="pointer"
                />
                <SpacerRight />
                <StyledMdOutlineDeleteSweep
                  size={22}
                  color="#f44336"
                  cursor="pointer"
                  onClick={() => onIndicatorDelete(indicator.id)}
                />
              </DataCells>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};
