import styled from "styled-components";

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: ${({ justifyContent }) => justifyContent};
`;

ButtonGroup.defaultProps = {
  justifyContent: "flex-end",
};

export default ButtonGroup;
