import React, { cloneElement, createContext, useContext } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import styled, { css } from "styled-components";

const Steps = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledStep = styled.button`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem;
  border: none;
  outline: none;
  border-radius: var(--border-radius-lg);
  background-color: inherit;

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
        border: 3px solid var(--color-brand-800) !important;
      `}

    ${({ completed }) =>
      completed &&
      css`
        border: 3px solid var(--color-green-500);
      `}
  }

  & p {
    color: var(--color-grey-700);
    font-size: 1.5rem;
  }

  &:hover {
    cursor: pointer;
    background-color: var(--color-grey-100);
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:focus:active {
    outline: 2px solid var(--color-brand-200);
  }
`;

const Content = styled.div`
  padding: 1rem 0;
`;

const Line = styled.div`
  flex: 1;
  height: 3px;
  border-radius: var(--border-radius-lg);
  margin: 0 1rem;
  background-color: var(${({ colored }) => (colored ? "--color-brand-600" : "--color-grey-300")});
`;

const StepperContext = createContext(null);
/* my humble attempt at a Stepper, similar to the one from Mantine */
function Stepper({ children, active, onActiveChange }) {
  const childrenArray = React.Children.toArray(children);

  const steps = childrenArray.filter((child) => child.type !== Stepper.Completed);
  const numSteps = steps.length;
  const completedContent = childrenArray.filter((child) => child.type === Stepper.Completed);

  let currentContent = active > numSteps ? completedContent : steps[active - 1].props?.children;

  return (
    <StepperContext.Provider
      value={{
        active,
        onActiveChange,
        numSteps,
      }}
    >
      <Steps>
        {steps.map((child, i) => (
          <>
            {cloneElement(child, { number: i + 1 })}{" "}
            {i < numSteps - 1 ? <Line colored={i < active - 1} /> : null}
          </>
        ))}
      </Steps>
      <Content>{currentContent}</Content>
    </StepperContext.Provider>
  );
}

function Step({ label, number, completed, disableSelection }) {
  const { active, onActiveChange } = useContext(StepperContext);
  let isActive = active === number;
  let isStepCompleted = completed !== undefined ? completed : active > number;

  return (
    <StyledStep
      isActive={isActive}
      completed={isStepCompleted}
      onClick={() => {
        onActiveChange(number);
      }}
      disabled={disableSelection || false}
    >
      <span>{isStepCompleted ? <FaCircleCheck /> : number}</span>
      <p>{label}</p>
    </StyledStep>
  );
}

function Completed({ children }) {
  return children;
}

Stepper.Step = Step;
Stepper.Completed = Completed;

export default Stepper;
