import { React, useEffect, useState } from 'react'
import ReactRoutes from '../config/ReactRoutes'
import UserUtility from '../utility/UserUtility'
import LoginService from '../services/LoginService'
import { Link, useNavigate } from 'react-router-dom'
import ProductCategoryService from '../services/ProductCategoryService'
import PeopleCategoryService from '../services/PeopleCategoryService'

function Nav({ numberOfCartItems, cartTotalAmount }) {

    const [productCategories, setProductCategories] = useState([])
    const [peopleCategories, setPeopleCategories] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        Promise.all([
            ProductCategoryService.getCategores(),
            PeopleCategoryService.getPeople()
        ])
            .then(([productCategories, peopleCategories]) => {
                setProductCategories(productCategories)
                setPeopleCategories(peopleCategories)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const logOutBtn = () => {
        LoginService.logOut()
        navigate(ReactRoutes.HOME)
    }

    const loginRegister = () => {
        if (!UserUtility.isLoggedIn()) {
            return (<ul className="nav">
                <li className="nav-item"><Link className="nav-link link-dark px-2" to={ReactRoutes.LOGIN}>Login</Link></li>
                <li className="nav-item"><Link className="nav-link link-dark px-2" to={ReactRoutes.REGISTER}>Sign up</Link></li>
            </ul>
            )

        }
        else {
            return (
                <form className="d-flex">
                    {UserUtility.isEmployee() ? <p></p> : <Link to={ReactRoutes.CART} className="btn btn-outline-dark">
                        <i className="bi-cart-fill me-1"></i>
                        Korpa
                        <span className="badge bg-dark text-white ms-1 rounded-pill">{numberOfCartItems}</span>
                        <span className="badge bg-dark text-white ms-1 rounded-pill">{cartTotalAmount} rsd</span>
                    </Link>}
                    {UserUtility.isEmployee() && (
                        <p>
                            <Link to={ReactRoutes.ADMIN_PAGE} className="btn btn-pink">
                                <i className="bi-some-icon me-1"></i>
                                Admin stranica
                            </Link>
                        </p>
                    )}

                    <div className="dropdown text-end">
                        <a className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="/Assets/img/profileIcon.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                        </a>
                        <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                            <li><Link className="dropdown-item" to={ReactRoutes.ACCOUNT}>Settings</Link></li>
                            <li><Link className="dropdown-item" to={ReactRoutes.MY_ORDERS}>
                                {(UserUtility.isEmployee() ? <p style={{ margin: "0" }}>Orders</p> : <p style={{ margin: "0" }}>My Orders</p>)}</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" onClick={() => logOutBtn()}>Sign out</a></li>
                        </ul>
                    </div>
                </form>
            )
        }
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <Link className="navbar-brand" to={ReactRoutes.HOME}>Butik Kaja</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item"><Link className="nav-link active" to={ReactRoutes.HOME}>Home</Link></li>
                       
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Kategorije</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {productCategories.map(category => {
                                    return <li key={"prodCat" + category.productCategoryID}><Link className="dropdown-item" to={"/category/" + category.productCategoryID}>{category.name}</Link></li>
                                })}
                            </ul>
                        </li>
                    </ul>
                    {loginRegister()}
                </div>
            </div>
        </nav>
    );
}

export default Nav;