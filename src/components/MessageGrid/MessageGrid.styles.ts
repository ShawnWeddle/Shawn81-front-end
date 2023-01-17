import styled from "styled-components";

const StyledMessageGrid = styled.div`
  background-color: #2b2b2b;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  width: 100vw;
  height: 100vw;
  @media (min-width: 576px) {
    width: 576px;
    height: 576px;
    border-radius: 0.375rem;
    margin: 1rem;
  }
`

export {StyledMessageGrid};