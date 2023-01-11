import { ErrorContext } from "../context/ErrorContext";
import { useContext } from "react";

export const useErrorContext = () => {
  const context = useContext(ErrorContext);

  if(!context){
    throw Error("useErrorContext must be used inside an ErrorContextProvider");
  }

  return context;
}