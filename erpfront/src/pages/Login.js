import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LoginService } from '../services/LoginService';
import ReactRoutes from '../config/ReactRoutes'

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        document.body.classList.add("login");
        return () => {
            document.body.classList.remove("login");
        }
    }, [])

    const login = (e) => {
        e.preventDefault();
        console.log([email, password]);
        LoginService.logIn(email, password)
          .then((response) => {
            if (response.hasOwnProperty("tokenRole") && response.tokenRole !== "") {
              localStorage.setItem("ButikJWT", response.tokenRole.userToken);
              localStorage.setItem("ButikRole", response.tokenRole.role);
              localStorage.setItem("UserID", response.tokenRole.userId);
      
             
              if (response.tokenRole.role === "Employee") {
                navigate(ReactRoutes.ADMIN_PAGE); 
              } else {
                navigate(ReactRoutes.HOME); 
              }
              
              window.location.reload();
            }
          })
          .catch(setError);
      };
      

    return(
        <div className="form-signin login">
            <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-signin my-5">
                <div className="card-body">
                    <h5 className="card-title text-center">Sign In</h5>
                    <form className="form-signin">
                    <div className="form-label-group">
                        <input type="email" onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Email" required autoFocus/>
                        <label htmlFor="email" className="form-label">Email</label>
                    </div>
                    <div className="form-label-group">
                        <input type="password" id="inputPassword" onChange={e => setPassword(e.target.value)} className="form-control" placeholder="Password" required/>
                        <label htmlFor="inputPassword">Password</label>
                        <Link to={ReactRoutes.REGISTER}>Don't have an account? Sign Up</Link>
                    </div>
                    <p>{(error !== "") ? <span className="error">{error}</span> : "" }</p>
                    <button className="btn btn-lg btn-primary btn-block text-uppercase btn-submit" onClick={login} >Sign in</button>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Login