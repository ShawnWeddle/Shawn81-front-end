import styled from "styled-components";


const StyledMessageCell = styled.button.attrs(
  (props: { cellColor: string; hoverColor: string; shadowColor: string; textColor: string; onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined }) => props
)`
  border-radius: 0.375rem;
  border: solid 0px;

  margin:0.125rem;

  text-shadow: 1px 1px 2px ${(props) => props.shadowColor};
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.cellColor};

  &:hover{
    background-color: ${(props) => props.hoverColor};
    border: solid ${(props) => props.textColor} 3px;
    transition: background-color 0.3s, border 0.15s;
  }

  &:active{
    background-color: ${(props) => props.hoverColor};
    border: solid ${(props) => props.textColor} 3px;
  }
`

export {StyledMessageCell};