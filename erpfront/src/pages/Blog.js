import {useEffect, useState} from 'react'
import QuestionService from '../services/QuestionService';
import DateTimeUtility from '../utility/DateTimeUtility';
import UserUtility from '../utility/UserUtility';
import UpdateMessage from '../components/Modals/UpdateMessage';
import AddQuestion from '../components/Modals/AddQuestion';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


function Blog() {

    const [questions, setQuestions] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        QuestionService.getQuestions()
        .then( question => {
            setQuestions(question)
            console.log(question)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    function addMessage (questionId) {
        QuestionService.addMessage(message, questionId)
        .then(response => console.log(response))
        window.location.reload();
    }
    
    function deleteMessage (questionId, messageId) {
        QuestionService.deleteMessage(questionId, messageId)
        .then(response => {console.log(response)})
        window.location.reload();
    }

    function updateCommentCmd (userID, question, message) {
        let userId = localStorage.getItem("UserID");

        if(userId == userID)
        {
            return (
                <div className="d-flex align-items-center justify-content-end">
                    <button className="btn btn-danger" onClick={() => deleteMessage(question, message.messageID)}>&#10006;</button>
                    <UpdateMessage message={message}
                                    question={question}/>
                </div>
            )
        }
    }

    function deleteQuestionBtn (userId, questionId) {
        if(localStorage.getItem("UserID") == userId)
        {
            return (
                <div className="d-flex align-items-center justify-content-end">
                    <button className="btn btn-danger" onClick={() => deleteQuestion(questionId)}>Delete</button>
                </div>
            )
        }
    }

    function deleteQuestion(questionId) {
        QuestionService.deleteQuestion(questionId)
    }

    return (
        <div style={{margin:"50px"}}>
            <h1 className="text-center">Pitajte nase zaposlene</h1>
            <div className="blog-div">
                <AddQuestion/>
            </div>
            {questions.map(question => {
                return (<Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} eventKey={question.questionID}>
                                {question.theme}
                            </Accordion.Toggle>
                            {deleteQuestionBtn(question.user.userID, question.questionID)}
                        </Card.Header>
                        <Accordion.Collapse eventKey={question.questionID}>
                            <Card.Body>
                                <ListGroup variant="flush">
                                {question.messages.map(message => {
                                    if(message.user == null)
                                    {
                                        return <p></p>
                                    }
                                    else {
                                        return (
                                            <ListGroup.Item key={message.messageID}>
                                            <h5 style={{marginBottom:0}}>{message.user.name} {message.user.surname}</h5>
                                            <p style={{opacity:"0.5", marginTop:"0"}}>{DateTimeUtility.formatDate(message.date)}</p>
                                            <p>{message.messageText}</p>
                                            {updateCommentCmd(message.user.userID, question.questionID, message)}
                                        </ListGroup.Item>
                                        )
                                    }
                                })}
                                    {UserUtility.isLoggedIn()? 
                                    <div><h4>Leave a comment</h4> 
                                        <textarea cols="30" rows="5" className="form-control" onChange={e => setMessage(e.target.value)}></textarea>
                                        <div className="form-group" style={{marginTop: "10px"}}> 
                                        <button type="button" className="btn btn-outline-dark mt-auto" onClick={() => addMessage(question.questionID)}>Post Comment</button> 
                                        </div>
                                    </div> : <p></p>}
                                
                                </ListGroup>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>)
            })}
        </div>
    )
}

export default Blog