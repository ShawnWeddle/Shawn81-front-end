import { createContext, useReducer } from "react";
import {
  MessageDocument,
  UnoccupiedMessageType,
  baseMessageArray,
} from "../algos/New";

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
  payload: { messages: (MessageDocument | UnoccupiedMessageType)[] };
};

export const messageReducer = (
  state: MessageReducerState,
  action: MessageReducerAction
) => {
  switch (action.type) {
    case "ADD-ALL-MESSAGES":
      action.payload.messages.map((message, index) => {
        state.messages[message.location] = message;
      });
      return state;
    case "UPDATE-MESSAGE":
      action.payload.messages.map((message, index) => {
        state.messages[message.location] = message;
      });
      return state;
    case "DELETE-MESSAGE":
      state.messages[action.payload.messages[0].location] =
        action.payload.messages[0];
      console.log(action.payload.messages[0].location);
      console.log(state.messages);
      state.messages.shift();
      console.log(state.messages);
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
