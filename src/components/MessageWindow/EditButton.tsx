import { useWindowContext } from "../../hooks/useWindowContext";
import Button from "react-bootstrap/Button";

interface EditButtonProps {}

const EditButton: React.FC<EditButtonProps> = () => {
  const { windowState, windowDispatch } = useWindowContext();
  const mode = windowState.mode;
  const activeMessage = windowState.activeMessage;

  return (
    <Button
      variant="primary"
      onClick={() => {
        windowDispatch({
          type: "DISPLAY-TO-EDIT",
          payload: { mode: "update", activeMessage: activeMessage },
        });
      }}
    >
      Edit
    </Button>
  );
};

export default EditButton;
