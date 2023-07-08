import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router";
import ReviewService from "../../services/ReviewService";


function DeleteReview (props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    const deleteReview = () => {
        ReviewService.deleteReview(props.review.reviewID, props.productId)
        .then(response => {
            console.log(response)
            // navigate('/product/' + props.productId)
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
          <Modal.Title>Brisanje recenzije</Modal.Title>
        </Modal.Header>
        <Modal.Body>Da li ste stigurni da zelite da izbrisete recenziju?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteReview}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteReview