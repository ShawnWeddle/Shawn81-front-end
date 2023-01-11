import styled from "styled-components";

const StyledBackground = styled.div.attrs(
  (props: { backgroundColor: string; textColor: string }) => props
)`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
`


export {StyledBackground};