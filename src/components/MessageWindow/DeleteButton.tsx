import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDeleteMessage } from "../../hooks/useDeleteMessage";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface DeleteButtonProps {}

const DeleteButton: React.FC<DeleteButtonProps> = () => {
  const navigate = useNavigate();

  const { authState } = useAuthContext();
  const user = authState.user;

  const { deleteMessage, error, isLoading } = useDeleteMessage();

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const handleDelete = async (e: any) => {
    setShowDeleteModal(false);
    await deleteMessage();
    navigate("/");
  };

  return (
    <>
      <Button variant="danger" onClick={handleShowDeleteModal}>
        Delete
      </Button>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Hold up, {user?.username}!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your message?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteButton;
