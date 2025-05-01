import { HiOutlineBackspace } from "react-icons/hi2";
import styled from "styled-components";
import { useQueryParam } from "../hooks/useQueryParam";
import { useRef, useState } from "react";

const StyledInputFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  width: 14dvw;
`;

const Input = styled.input`
  border: none;
  background-color: inherit;
  width: 100%;
  padding-left: 0.4rem;
  &:focus {
    outline: none;
  }
`;

const Clear = styled.div`
  display: flex;
  align-items: center;
  & svg {
    width: 3rem;
    height: 3rem;
    color: var(--color-grey-400);

    &:hover {
      color: var(--color-grey-700);
    }
    &:active {
      color: var(--color-brand-600);
    }
  }
`;

/*
-An input that adds a query param for filtering
*/
function InputFilter({ fieldName }) {
  const { queryParam, setQueryParam } = useQueryParam(fieldName);
  const [name, setName] = useState(queryParam ? queryParam : "");
  const timeoutRef = useRef(null);

  function handleParamChange(value) {
    setName(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setQueryParam(value);
    }, 1500);
  }

  return (
    <StyledInputFilter>
      <Input
        placeholder={`Search by ${fieldName}`}
        value={name}
        onChange={(e) => handleParamChange(e.target.value)}
      />
      <Clear
        onClick={() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          setQueryParam("");
          setName("");
        }}
      >
        <HiOutlineBackspace />
      </Clear>
    </StyledInputFilter>
  );
}

export default InputFilter;
