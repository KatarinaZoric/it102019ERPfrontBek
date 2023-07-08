import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import QuestionService from "../../services/QuestionService";

function AddQuestion () {

    const [question, setQuestion] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function addQuestion() {
        QuestionService.addQuestion(question);
    }
    return (
        <div>
             <Button variant="outline-dark mt-auto" onClick={handleShow}>
                Postavi pitanje
            </Button>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                <Modal.Title> Postavi pitanje</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-label-group">
                        <input type="text" onChange={e => setQuestion(e.target.value)} className="form-control" placeholder="Question" required autoFocus/>           
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={addQuestion}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddQuestion