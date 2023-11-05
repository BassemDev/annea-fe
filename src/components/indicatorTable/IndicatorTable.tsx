import React from "react";
import styled from "styled-components";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";

import { TABLE_HEADER_LABELS } from "./constants";
import { Indicator } from "../../__generated_graphql__/graphql";

const TableHeader = styled.th`
  padding: 5px;

  border-bottom: 1px solid #e5e7eb;

  font-weight: 500;
  color: #8383aa;
  text-align: left;
  font-size: 1.1rem;
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
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

interface Props {
  indicators: Indicator[] | undefined;
}

export const IndicatorTable: React.FC<Props> = ({ indicators }) => {
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
        {indicators === undefined && (
          <tr>
            <td colSpan={3}></td>
          </tr>
        )}
        {indicators?.length === 0 && (
          <tr>
            <td colSpan={3}>
              <span>There is no Element to display currently</span>
            </td>
          </tr>
        )}
        {indicators?.length !== 0 &&
          indicators?.map((indicator, index) => (
            <tr key={index}>
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
                <AiOutlineEdit size={22} color="#41c6b4" cursor="pointer" />
                <SpacerRight />
                <MdOutlineDeleteSweep
                  size={22}
                  color="#f44336"
                  cursor="pointer"
                />
              </DataCells>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};
