import {React,useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ReactRoutes from '../config/ReactRoutes'
import RegisterService from '../services/RegisterService'

function Register () {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        document.body.classList.add("login");
        return () => {
            document.body.classList.remove("login");
        }
    }, [])

    const register = (e) => {
        e.preventDefault();
        console.log([email, password]);
        RegisterService.register(name, surname, email, username, password)
            .then(response => {
                if (response.hasOwnProperty("tokenRole") && response.tokenRole !== "") {
                    localStorage.setItem("ButikJWT", response.tokenRole.userToken);
                    localStorage.setItem("ButikRole", response.tokenRole.role);
                    localStorage.setItem("UserID", response.tokenRole.userId);
                    navigate(ReactRoutes.HOME)
                    window.location.reload()
                }
            })
            .catch(setError)
    }
    return (
        <div className="container login">
        <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
            <div className="card-body">
                <h5 className="card-title text-center">Sign Up</h5>
                <form className="form-signin">
                <div className="form-label-group">
                    <input type="text" id="inputName" onChange={e => setName(e.target.value)} className="form-control" placeholder="Name" required autoFocus/>
                    <label htmlFor="inputName">Name</label>
                </div>
                <div className="form-label-group">
                    <input type="text" id="inputSurname" onChange={e => setSurname(e.target.value)} className="form-control" placeholder="Surname" required autoFocus/>
                    <label htmlFor="inputSurname">Surname</label>
                </div>
                <div className="form-label-group">
                    <input type="text" id="inputEmail" onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Email" required autoFocus/>
                    <label htmlFor="inputEmail">Email</label>
                </div>
                <div className="form-label-group">
                    <input type="text" id="inputUsername" onChange={e => setUsername(e.target.value)} className="form-control" placeholder="Username" required autoFocus/>
                    <label htmlFor="inputUsername">Username</label>
                </div>
                <div className="form-label-group">
                    <input type="password" id="inputPassword" onChange={e => setPassword(e.target.value)} className="form-control" placeholder="Password" required/>
                    <label htmlFor="inputPassword">Password</label>
                    <Link to={ReactRoutes.LOGIN}>Have an account? Sign In</Link>
                </div>
                <p>{(error !== "") ? <span className="error">{error}</span> : "" }</p>
                <button className="btn btn-lg btn-primary btn-block text-uppercase btn-submit" onClick={register} >Sign Up</button>
                </form>
            </div>
            </div>
        </div>
        </div>
    </div>
    )
}

export default Register