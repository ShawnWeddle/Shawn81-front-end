import { createContext, useReducer } from "react";
import {
  MessageDocument,
  UnoccupiedMessageType,
  baseMessageArray,
} from "../algos/EmptyMessages";

export const MessageContext = createContext<ContextType | null>(null);

type ContextType = {
  messageState: {
    messages: (MessageDocument | UnoccupiedMessageType)[];
  };
  messageDispatch: React.Dispatch<{
    type: string;
    payload: {
      messages: (MessageDocument | UnoccupiedMessageType)[];
    };
  }>;
};

type MessageContextProviderProps = {
  children: React.ReactNode;
};

type MessageReducerState = {
  messages: (MessageDocument | UnoccupiedMessageType)[];
};
type MessageReducerAction = {
  type: string;
  payload: {
    messages: (MessageDocument | UnoccupiedMessageType)[];
  };
};

export const messageReducer = (
  state: MessageReducerState,
  action: MessageReducerAction
) => {
  const activeMessages: (MessageDocument | UnoccupiedMessageType)[] =
    action.payload.messages;
  switch (action.type) {
    case "ADD-ALL-MESSAGES":
      activeMessages.map((message, index) => {
        state.messages[message.location] = message;
      });
      return state;
    case "CREATE-MESSAGE":
      state.messages[activeMessages[0].location] = activeMessages[0];
      return state;
    case "UPDATE-MESSAGE":
      state.messages[activeMessages[0].location] = activeMessages[0];
      return state;
    case "DELETE-MESSAGE":
      state.messages[activeMessages[0].location] = {
        _id: "NoID",
        username: "",
        msg: "",
        location: activeMessages[0].location,
      };
      return state;
    default:
      return state;
  }
};

export const MessageContextProvider = ({
  children,
}: MessageContextProviderProps) => {
  const [messageState, messageDispatch] = useReducer(messageReducer, {
    messages: baseMessageArray(),
  });

  return (
    <MessageContext.Provider value={{ messageState, messageDispatch }}>
      {children}
    </MessageContext.Provider>
  );
};
