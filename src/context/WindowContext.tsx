import { createContext, useReducer } from "react";
import { MessageDocument, UnoccupiedMessageType } from "../algos/New";

export const WindowContext = createContext<ContextType | null>(null);

type ContextType = {
  windowState: {
    mode: string;
    activeMessage: MessageDocument | UnoccupiedMessageType | null;
  };
  windowDispatch: React.Dispatch<{
    type: string;
    payload: {
      mode: string;
      activeMessage: MessageDocument | UnoccupiedMessageType | null;
    };
  }>;
};

type WindowContextProviderProps = {
  children: React.ReactNode;
};

type WindowReducerState = {
  mode: string;
  activeMessage: MessageDocument | UnoccupiedMessageType | null;
};
type WindowReducerAction = {
  type: string;
  payload: {
    mode: string;
    activeMessage: MessageDocument | UnoccupiedMessageType | null;
  };
};

export const windowReducer = (
  state: WindowReducerState,
  action: WindowReducerAction
) => {
  switch (action.type) {
    case "CLOSED":
      return { mode: action.payload.mode, activeMessage: null };
    case "SET-DISPLAY":
      return {
        mode: action.payload.mode,
        activeMessage: action.payload.activeMessage,
      };
    case "SET-EDIT-NEW":
      return {
        mode: action.payload.mode,
        activeMessage: action.payload.activeMessage,
      };
    case "DISPLAY-TO-EDIT":
      return {
        mode: action.payload.mode,
        activeMessage: action.payload.activeMessage,
      };
    case "SET-PROFILE-DISPLAY":
      if (action.payload.activeMessage?._id === "NoID") {
        return {
          mode: "create",
          activeMessage: action.payload.activeMessage,
        };
      } else {
        return {
          mode: action.payload.mode,
          activeMessage: action.payload.activeMessage,
        };
      }

    default:
      return state;
  }
};

export const WindowContextProvider = ({
  children,
}: WindowContextProviderProps) => {
  const [windowState, windowDispatch] = useReducer(windowReducer, {
    mode: "closed",
    activeMessage: null,
  });

  return (
    <WindowContext.Provider value={{ windowState, windowDispatch }}>
      {children}
    </WindowContext.Provider>
  );
};
