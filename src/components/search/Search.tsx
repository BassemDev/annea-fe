import React, { FormEvent, useState } from "react";
import { InputText } from "primereact/inputtext";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { Spinner } from "../shared/spinner/Spinner";

import { Hint } from "../shared/Hint/Hint";

const SearchWrapper = styled.div`
  margin-bottom: 18px;
  width: 100%;

  text-align: left;
`;

const InputWrapper = styled.div`
  margin-top: 5px;
  margin-bottom: 3px;
  width: 100%;

  text-align: left;
`;

const InputTextStyled = styled(InputText)`
  width: 100%;

  border: 1px solid #44448d;
`;

const Container = styled.div`
  margin-top: 10px;

  text-align: left;
`;

const LabelStyle = styled.label`
  color: #44448d;
`;

interface Props {
  searchIndicatorById: (id: string) => void;
  loading: boolean;
}

export const Search: React.FunctionComponent<Props> = ({
  searchIndicatorById,
  loading,
}) => {
  const [textSearched, setTextSearched] = useState("");

  const handleSearchInputChange = (e: FormEvent<HTMLInputElement>) => {
    searchIndicatorById(e.currentTarget.value);
    setTextSearched(e.currentTarget.value);
  };

  return (
    <SearchWrapper>
      <Container>
        <LabelStyle htmlFor="search-input">Search for indicator:</LabelStyle>
      </Container>
      <InputWrapper className="p-input-icon-left">
        {loading ? (
          <Spinner size={20} />
        ) : (
          <BiSearch size={20} color="#44448d" />
        )}
        <InputTextStyled
          keyfilter="int"
          id="search-input"
          placeholder="Type an id to start searching..."
          onChange={handleSearchInputChange}
          value={textSearched}
        />
      </InputWrapper>
      <Hint message="The text input below allow you to fetch element ONLY by their ID." />
    </SearchWrapper>
  );
};
