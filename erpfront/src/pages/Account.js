import React, { useEffect, useState } from 'react'
import UserService from '../services/UserService'
import DeleteAccount from '../components/Modals/DeleteAccount'

function Account() {
    let userID = localStorage.getItem("UserID");

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassord] = useState("");
    const [updateError, setUpdateError] = useState("");
    const [feedback, setFeedback] = useState("");
    const [errors, setErrors] = useState({
        name: null,
        surname: null,
        email: null,
        username: null,
        password: null,
        confirmPassword: null,
        isValid: true,
        general: null
    });


    useEffect(() => {
        UserService.getUserByID(userID)
        .then(user => {
            setName(user.name);
            setSurname(user.surname);
            setEmail(user.email);
            setUsername(user.username);
        })
    }, [])


    function validateInput() {
        setUpdateError("");
        const tempErrors = {
            name: null,
            surname: null,
            email: null,
            username: null,
            password: null,
            confirmPassword: null,
            isValid: true,
            general: null
        }
        tempErrors.isValid = true

        if(name === "") {
            tempErrors.isValid = false;
            tempErrors.name = "Polje ime mora biti popunjeno"
        }
        if(surname === "") {
            tempErrors.isValid = false;
            tempErrors.surname = "Polje prezime mora biti popunjeno"
        }
        if(email === "") {
            tempErrors.isValid = false;
            tempErrors.email = "Polje email mora biti popunjeno"
        }
        if(username === "") {
            tempErrors.isValid = false;
            tempErrors.username = "Polje korisnicko ime mora biti popunjeno"
        }
        if(password === "") {
            tempErrors.isValid = false;
            tempErrors.password = "Polje lozinka lozinka je obavezno"
        }
        if(confirmPassword === "") {
            tempErrors.isValid = false;
            tempErrors.confirmPassword = "Polje potrvda lozinke lozinka je obavezno"
        }
        if(password !== "" && confirmPassword !== "" && password !== confirmPassword)
        {
            tempErrors.isValid = false;
            tempErrors.password = "Lozinke se moraju podudarati"
            tempErrors.confirmPassword = "Lozinke se moraju podudarati"
        }

        setErrors(tempErrors)

        return tempErrors.isValid;
    }


    function updateProfile() {
        if(validateInput())
        {
            UserService.updateUser(userID, name, surname, email, username, password)
            .then(response => (
                console.log(response),
                setFeedback("Uspesno ste izmenili profil")
            ))
            .catch(error => {
                setUpdateError(error)
            })
        }
        
    }

    return(
        <div style={{margin:"30px"}}>
            <div className="wrapper bg-white mt-sm-5">
            { /*<Link to='/category/1'><img src="/Assets/img/home2.png" style={{width:"30px", height:"30px"}}/></Link> */}
                <h4 className="pb-4 border-bottom">Account settings</h4>
                <div className="py-2">
                    <div className="row py-2">
                        <div className="col-md-6"> <label htmlFor="firstname">First Name { (!errors.isValid && errors.name) ? <span className="error">{errors.name}</span> : "" }</label> <input onChange={e => setName(e.target.value)} type="text" className="bg-light form-control" value={name}/> </div>
                        <div className="col-md-6 pt-md-0 pt-3"> <label htmlFor="lastname">Last Name{ (!errors.isValid && errors.surname) ? <span className="error">{errors.surname}</span> : "" }</label> <input onChange={e => setSurname(e.target.value)} type="text" className="bg-light form-control" value={surname}/> </div>
                    </div>
                    <div className="row py-2">
                        <div className="col-md-6"> <label htmlFor="email">Email Address{ (!errors.isValid && errors.email) ? <span className="error">{errors.email}</span> : "" }</label> <input onChange={e => setEmail(e.target.value)} type="text" className="bg-light form-control" value={email}/> </div>
                        <div className="col-md-6 pt-md-0 pt-3"> <label htmlFor="username">Username{ (!errors.isValid && errors.username) ? <span className="error">{errors.username}</span> : "" }</label> <input onChange={e => setUsername(e.target.value)} type="text" className="bg-light form-control" value={username}/> </div>
                    </div>
                    <div className="row py-2">
                        <div className="col-md-6"> <label htmlFor="password">Password{ (!errors.isValid && errors.password) ? <span className="error">{errors.password}</span> : "" }</label> <input onChange={e => setPassword(e.target.value)} type="password" className="bg-light form-control" placeholder="password"/> </div>
                        <div className="col-md-6 pt-md-0 pt-3"> <label htmlFor="username">Confirm password{ (!errors.isValid && errors.confirmPassword) ? <span className="error">{errors.confirmPassword}</span> : "" }</label> <input onChange={e => setConfirmPassord(e.target.value)} type="password" className="bg-light form-control" placeholder="password"/> </div>
                    </div>
                    <p>{ (updateError !== "") ? <span className="error">{updateError}</span> : "" }</p>
                    <p>{(feedback !== "") ? <span style ={{color: "green"}}>{feedback}</span> : ""}</p>
                    <div className="py-3 pb-4 border-bottom"> <button onClick={updateProfile} className="btn btn-primary mr-3">Save Changes</button> <button className="btn border button">Cancel</button> </div>
                    <div className="d-sm-flex align-items-center pt-3" id="deactivate">
                        <div> 
                            <b>Deactivate your account</b>
                        </div>
                        <div className="ml-auto"> <DeleteAccount />
                             </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account