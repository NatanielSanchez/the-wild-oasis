import styled, { css } from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
  //width: 30rem; // so it can have the same size as the React-Select
  &:hover {
    border: 1px solid var(--color-grey-700);
  }

  ${(props) =>
    !props.withSpinners &&
    css`
      /* Remove arrow spinners for Chrome, Safari, Edge, Opera */
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Remove arrow spinners for Firefox */
      &[type="number"] {
        -moz-appearance: textfield;
        appearance: textfield;
      }
    `}
`;

Input.defaultProps = {
  withSpinners: false,
};

export default Input;
