import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router";
import QuestionService from "../../services/QuestionService";

function UpdateMessage (props) {

    const navigate = useNavigate();

    const [messageText, setMessageText] = useState(props.message.messageText)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function updateMessage () {
        QuestionService.updateMessage(props.question, props.message.messageID, messageText)   
    }

    return (
        <div>
             <Button variant="btn btn-success" onClick={handleShow}>
               Izmeni
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                <Modal.Title>Izmeni poruku</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-label-group">
                        <input type="text" id="inputName" className="form-control" value={messageText} onChange={e => setMessageText(e.target.value)} placeholder="Name" required autoFocus/>           
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={updateMessage}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UpdateMessage