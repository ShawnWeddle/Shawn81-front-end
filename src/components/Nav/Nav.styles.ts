import styled from "styled-components";

const StyledNavButton = styled.button`
  background: linear-gradient(150deg, #222 0% 60%, #004 75%, #006 100%);
  background-position: 0% 0%;
  background-size: 400%;
  border-radius: 0.5rem;
  border: #CCC solid 2px;
  color: #CCC;
  cursor: pointer;
  font-size: 2rem;
  margin: 0.375rem;

  &:hover{
    background-position: 100% 100%;
    transition: background-position 350ms;
  }
`

const StyledNav = styled.div`
  background-color: #333;
  border-bottom: solid #2b2b2b 2px;
  display: flex;
  justify-content: space-between;
`

const LogoButton = styled.button`
  background: linear-gradient(150deg, #222 0% 60%, #400 70%, #FF6F6F 85%, #006 100%);
  background-position: 0% 0%;
  background-size: 400%;
  border-radius: 0.5rem;
  border: #CCC solid 2px;
  color: #CCC;
  cursor: pointer;
  font-size: 2rem;
  margin: 0.375rem;

  &:hover{
    background-position: 100% 100%;
    transition: background-position 350ms;
  }
`

export {LogoButton, StyledNav, StyledNavButton}