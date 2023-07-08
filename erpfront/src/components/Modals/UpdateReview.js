import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import ReviewService from "../../services/ReviewService";
import ReactStars from 'react-rating-stars-component';

function UpdateReview(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[comment, setComment] = useState(props.review.comment)
    const[rating, setRating] = useState(props.review.rating)

    function update() {
        ReviewService.updateReview(props.review.reviewID, comment, rating, props.productId)
        .then(response => {
            console.log(response)
            window.location.reload()
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
             <Button variant="success" onClick={handleShow}>
               Izmeni
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                <Modal.Title>Izmeni proizvod</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-label-group">
                        <input type="text" id="inputName" onChange={e => setComment(e.target.value)} className="form-control" value={comment} required autoFocus/>
                        {/* <label htmlFor="inputName">{props.review.comment}</label> */}
                    </div>
                    <div className="form-label-group">
                        <ReactStars
                            count={5}
                            onChange={setRating}
                            value={rating}
                            size={24}
                            activeColor="#ffd700"
                        />
                        {/* <input type="text" id="inputPrice" onChange={e => setRating(e.target.value)} className="form-control" value={rating} required autoFocus/> */}
                        {/* <label htmlFor="inputPrice">{props.review.rating}</label> */}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={update}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UpdateReview