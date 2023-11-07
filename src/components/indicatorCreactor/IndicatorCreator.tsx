import React, { FormEvent, useState, useRef } from "react";
import { Fieldset } from "primereact/fieldset";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Value } from "react-datetime-picker/dist/cjs/shared/types";
import { Toast } from "primereact/toast";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { Indicator } from "../../__generated_graphql__/graphql";
import { Hint } from "../shared/Hint/Hint";
import DateTimePicker from "react-datetime-picker";
import { CREATE_INDICATOR } from "../../API/mutation/indicators";
import { DISPLAY_SECOND, SEVERITY } from "../../constants/errorconstants";
import { isValidFormValues } from "./formHelpers";
import { PATH_ROUTES } from "../../constants/pathRoutes";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 150px;
`;

const InputGroupContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 20px;

  text-align: left;
`;

const StyledInputNumber = styled(InputNumber)`
  cursor: not-allowed;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-top: 60px;
`;

const SpacerUp = styled.div`
  margin-top: 2px;
`;

const DateTimePickerContainer = styled.div`
  text-align: left;
`;

export const IndicatorCreator = () => {
  const [indicator, setIndicator] = useState<number | null>();
  const [variable, setVariable] = useState<number | null>();
  const [turbineId, setTurbineId] = useState<number | null>();
  const [dateTimeValue, setDateTimeValue] = useState<Value>();
  const toast = useRef<Toast>(null);
  const navigate = useHistory();

  // Update indicator date
  const [createIndicator, { loading }] = useMutation<{
    createIndicator: Indicator;
  }>(CREATE_INDICATOR, {
    onCompleted: () => {
      if (toast && toast.current) {
        toast.current.show({
          severity: SEVERITY.info,
          summary: "Confirmed",
          detail: `Operation successful - Indicator is Created.`,
          life: DISPLAY_SECOND.success,
        });
      }

      // Forward to the main page after success creation
      navigate.push(PATH_ROUTES.home);
    },
    onError: (error) => {
      if (toast && toast.current) {
        toast.current.show({
          severity: SEVERITY.error,
          summary: "Not possible",
          detail: `Your request failed - Please check the indicator you would like to create.`,
          life: DISPLAY_SECOND.error,
        });
      }
    },
  });

  const handleIndicatorChange = (e: InputNumberValueChangeEvent) => {
    setIndicator(e.value);
  };

  const handleVariableChange = (e: InputNumberValueChangeEvent) => {
    setVariable(e.value);
  };

  const handleTurbineIdChange = (e: InputNumberValueChangeEvent) => {
    setTurbineId(e.value);
  };

  const handleIndicatorCreation = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createIndicator({
      variables: {
        createIndicatorInput: {
          indicator: Number(indicator),
          variable: Number(variable),
          turbineId: Number(turbineId),
          timestamp: dateTimeValue?.toISOString().replace("T", " "),
        },
      },
    });
  };

  const handleDateTimeUpdate = (e: Value) => {
    setDateTimeValue(e);
  };

  return (
    <Wrapper>
      <Toast ref={toast} />
      <Fieldset legend={`Create new indicator`} style={{ width: "50%" }}>
        <form onSubmit={handleIndicatorCreation}>
          <InputGroupContainer>
            <label>Indicator:</label>
            <StyledInputNumber
              value={indicator}
              onValueChange={handleIndicatorChange}
              name="indicator"
              id="indicator"
              minFractionDigits={2}
              maxFractionDigits={5}
              placeholder={"Please type the indicator here."}
            />
            <SpacerUp />
            <Hint message="Indicator is the matrix associated to the turbine based on wind." />
          </InputGroupContainer>
          <InputGroupContainer>
            <label>Turbine id:</label>
            <InputNumber
              value={turbineId}
              onValueChange={handleTurbineIdChange}
              name="turbine-id"
              id="turbine-id"
              placeholder={"Please type the turbine id."}
            />
            <SpacerUp />
            <Hint message="Turbine id the indentifier associated to the turbine matrix." />
          </InputGroupContainer>
          <InputGroupContainer>
            <label>Variable:</label>
            <InputNumber
              value={variable}
              onValueChange={handleVariableChange}
              name="variable"
              id="variable"
              placeholder={"Please type the variable here."}
            />
            <SpacerUp />
            <Hint message="Varibale is a matrix additional to the indicator in the turbine." />
          </InputGroupContainer>
          <DateTimePickerContainer>
            <DateTimePicker
              onChange={handleDateTimeUpdate}
              value={dateTimeValue}
              format={"y-MM-dd h:mm:ss a"}
            />
          </DateTimePickerContainer>
          <ButtonContainer>
            <Button
              loading={loading}
              label="Create"
              type="submit"
              disabled={
                !isValidFormValues({
                  indicator,
                  variable,
                  timestamp: dateTimeValue || undefined,
                  turbineId,
                })
              }
            />
          </ButtonContainer>
        </form>
      </Fieldset>
    </Wrapper>
  );
};
