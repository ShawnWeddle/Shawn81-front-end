import styled from "styled-components";


const StyledMessageCell = styled.button.attrs(
  (props: { occupied: boolean }) => props
)`
  background: ${(props) => {
    if (props.occupied) {
      return "linear-gradient(135deg, #222 0% 60%, #004 75%, #006 100%)";
    } else {
      return "linear-gradient(135deg, #2B2B2B 0% 60%, #400 75%, #600 100%)";
    }
  }};
  background-position: 0% 0%;
  background-size: 400%;
  border: none;
  border-radius: 0.375rem;
  color: #bbb;
  cursor: pointer;
  margin: 0.125rem;

  &:hover {
    background-position: 100% 100%;
    transition: background-position 350ms;
  }
`

export {StyledMessageCell};