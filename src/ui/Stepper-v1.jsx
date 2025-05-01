import React, { cloneElement, createContext, useContext } from "react";
import { HiOutlineCheck } from "react-icons/hi2";
import styled, { css } from "styled-components";

const StyledStepper = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ numSteps }) => numSteps}, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
`;

const StyledStep = styled.div`
  grid-row: 1;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-self: center;
  align-self: center;

  & span {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid var(--color-grey-400);
    border-radius: 50%;
    width: 5rem;
    height: 5rem;

    color: var(--color-grey-800);
    background-color: var(--color-grey-0);

    & svg {
      color: var(--color-green-500);
      width: 2.5rem;
      height: 2.5rem;
    }

    ${({ isActive }) =>
      isActive &&
      css`
        border: 3px solid var(--color-brand-800);
      `}
  }

  & p {
    color: var(--color-grey-700);
    font-size: 1.5rem;
  }

  &:hover {
    cursor: pointer;
  }
`;

const Content = styled.div`
  grid-row: 2;
  grid-column: 1 / -1;
  padding: 2rem 0;
`;

const StepperContext = createContext(null);

function Stepper({ children, active }) {
  const numSteps = React.Children.count(children);

  return (
    <StepperContext.Provider
      value={{
        active,
        numSteps,
      }}
    >
      <StyledStepper numSteps={numSteps}>
        {children.map((child, i) => cloneElement(child, { number: i + 1 }))}
      </StyledStepper>
    </StepperContext.Provider>
  );
}

function Step({ children, label, number, completed }) {
  const { active } = useContext(StepperContext);
  return (
    <>
      <StyledStep isActive={active === number}>
        <span>{completed ? <HiOutlineCheck /> : number}</span>
        <p>{label}</p>
      </StyledStep>
      {active === number ? <Content>{children}</Content> : null}
    </>
  );
}

Stepper.Step = Step;

export default Stepper;
