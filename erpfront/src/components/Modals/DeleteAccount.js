import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router";


function DeleteAccount (props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let userID = localStorage.getItem("UserID");

    const navigate = useNavigate();

    const deleteAccount = () => {
        UserService.deleteUser(userID)
        .then(response => {
           navigate("/category/1")
            console.log(response)
        })
    }
  return (
    <div>
      <Button variant="danger" onClick={handleShow}>
        Brisanje
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>Brisanje naloga</Modal.Title>
        </Modal.Header>
        <Modal.Body>Da li ste stigurni da zelite da izbrisete nalog?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteAccount}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteAccount