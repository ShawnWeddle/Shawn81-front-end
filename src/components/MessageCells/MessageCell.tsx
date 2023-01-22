import { useState } from "react";
import { useWindowContext } from "../../hooks/useWindowContext";
import { useAuthContext } from "../../hooks/useAuthContext";

import {
  UnoccupiedMessageType,
  MessageDocument,
} from "../../algos/EmptyMessages";

interface MessageCellProps {
  location: number;
  messageProperties: UnoccupiedMessageType | MessageDocument;
}

const MessageCell: React.FC<MessageCellProps> = (props: MessageCellProps) => {
  const [index, setIndex] = useState<number>(props.location);

  const occupied: boolean = props.messageProperties._id !== "NoID";

  const { windowState, windowDispatch } = useWindowContext();
  const activeMessage = windowState.activeMessage;

  const dynamicClassName: string = occupied
    ? "message-cell blue-on-hover"
    : "message-cell red-on-hover-secondary";

  return (
    <div
      className={dynamicClassName}
      onClick={() => {
        if (props.messageProperties._id === "NoID") {
          windowDispatch({
            type: "SET-EDIT-NEW",
            payload: { mode: "create", activeMessage: props.messageProperties },
          });
        } else {
          windowDispatch({
            type: "SET-DISPLAY",
            payload: {
              mode: "display",
              activeMessage: props.messageProperties,
            },
          });
        }
      }}
    >
      {index}
    </div>
  );
};

export default MessageCell;
