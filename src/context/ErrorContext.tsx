import { createContext, useReducer } from "react";

export const ErrorContext = createContext<ContextType | null>(null);

type ContextType = {
  errorState: { error: { message: string; type: string } }[];
  errorDispatch: React.Dispatch<{
    type: string;
    payload: { error: { message: string; type: string } };
  }>;
};

type ErrorContextProviderProps = {
  children: React.ReactNode;
};

type ErrorReducerState = { error: { message: string; type: string } }[];
type ErrorReducerAction = {
  type: string;
  payload: { error: { message: string; type: string } };
};

export const errorReducer = (
  state: ErrorReducerState,
  action: ErrorReducerAction
) => {
  switch (action.type) {
    case "SET_ERROR":
      return [...state, action.payload];
    case "REMOVE_ALL_ERRORS":
      return [];
    default:
      return state;
  }
};

export const ErrorContextProvider = ({
  children,
}: ErrorContextProviderProps) => {
  const [errorState, errorDispatch] = useReducer(errorReducer, []);

  return (
    <ErrorContext.Provider value={{ errorState, errorDispatch }}>
      {children}
    </ErrorContext.Provider>
  );
};
