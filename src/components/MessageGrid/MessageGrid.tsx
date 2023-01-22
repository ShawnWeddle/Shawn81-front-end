import { useState, useEffect } from "react";
import { useMessageContext } from "../../hooks/useMessageContext";
import MessageCell from "../MessageCells/MessageCell";
import {
  MessageDocument,
  UnoccupiedMessageType,
} from "../../algos/EmptyMessages";

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
    <MessageCell key={index} location={index} messageProperties={message} />
  ));

  return (
    <div className="max-width-mid">
      <div className="message-grid">{displayMessages}</div>
    </div>
  );
};

export default MessageGrid;
