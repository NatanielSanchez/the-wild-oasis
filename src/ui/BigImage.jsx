import styled from "styled-components";

const StyledBigImage = styled.img`
  width: fit-content;
  padding: 1rem;
`;

function BigImage({ image }) {
  return <StyledBigImage src={image} alt="" />;
}

export default BigImage;
