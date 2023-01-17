import { useState, useEffect } from "react";
import { useWindowContext } from "../../hooks/useWindowContext";
import { useAuthContext } from "../../hooks/useAuthContext";

import { UnoccupiedMessageType, MessageDocument } from "../../algos/New";
import { StyledMessageCell } from "./MessageCell.styles";

interface MessageCellProps {
  location: number;
  messageProperties: UnoccupiedMessageType | MessageDocument;
}

const MessageCell: React.FC<MessageCellProps> = (props: MessageCellProps) => {
  const [index, setIndex] = useState<number>(props.location);

  const newOccupied: boolean = props.messageProperties._id !== "NoID";

  const { windowState, windowDispatch } = useWindowContext();
  const activeMessage = windowState.activeMessage;

  return (
    <StyledMessageCell
      occupied={newOccupied}
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
    </StyledMessageCell>
  );
};

export default MessageCell;
