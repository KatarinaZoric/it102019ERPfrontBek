import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import ProductService from "../../services/ProductService";



function DeleteProduct (props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const deleteProduct = () => {
        ProductService.deleteProduct(props.product.productID)
        .then(response => {
            window.location.reload()
        })
    }
  return (
    <div>
      <Button variant="danger" onClick={handleShow}>
        Brisanje
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>Brisanje prizvoda</Modal.Title>
        </Modal.Header>
        <Modal.Body>Da li ste stigurni da zelite da izbrisete proizvod?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteProduct}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteProduct