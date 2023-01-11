import { useState, useEffect } from "react";
import { useWindowContext } from "../../hooks/useWindowContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import {
  SetTextColorByCellColor,
  SetHoverColorByCellColor,
} from "../../algos/ColorAlgos";
import { UnoccupiedMessageType, MessageDocument } from "../../algos/New";
import { StyledMessageCell } from "./MessageCell.styles";

interface MessageCellProps {
  location: number;
  messageProperties: UnoccupiedMessageType | MessageDocument;
}

const MessageCell: React.FC<MessageCellProps> = (props: MessageCellProps) => {
  const [hoverColor, setHoverColor] = useState<string>();
  const [shadowColor, setShadowColor] = useState<string>();
  const [textColor, setTextColor] = useState<string>();
  const [index, setIndex] = useState<number>(props.location);

  const { windowState, windowDispatch } = useWindowContext();
  const activeMessage = windowState.activeMessage;

  useEffect(() => {
    if (props.messageProperties._id !== "NoID") {
      setHoverColor(SetHoverColorByCellColor(props.messageProperties.color));
      setShadowColor("#888888");
      setTextColor(SetTextColorByCellColor(props.messageProperties.color));
    } else {
      setHoverColor("#444444");
      setShadowColor("#FF0000");
      setTextColor("#880000");
    }
  }, [activeMessage]);

  return (
    <StyledMessageCell
      cellColor={props.messageProperties.color}
      hoverColor={hoverColor}
      shadowColor={shadowColor}
      textColor={textColor}
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

/*   const { authState } = useAuthContext();
  const user = authState.user;
  if (user) {
  } */
