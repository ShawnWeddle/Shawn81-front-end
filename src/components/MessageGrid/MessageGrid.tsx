import { useState, useEffect } from "react";
import { useMessageContext } from "../../hooks/useMessageContext";
import { StyledMessageGrid } from "./MessageGrid.styles";
import MessageCell from "../MessageCells/MessageCell";
import { MessageDocument, UnoccupiedMessageType } from "../../algos/New";

const MessageGrid: React.FC = () => {
  const { messageState, messageDispatch } = useMessageContext();
  const [messages, setMessages] =
    useState<(MessageDocument | UnoccupiedMessageType)[]>();

  useEffect(() => {
    setMessages(messageState.messages);
  }, [messages]);

  if (!messages) {
    return <></>;
  }

  const displayMessages = messages.map((message, index) => (
    <MessageCell
      key={index}
      location={index}
      messageProperties={message}
    ></MessageCell>
  ));

  return <StyledMessageGrid>{displayMessages}</StyledMessageGrid>;
};

export default MessageGrid;
