import { Link, useNavigate } from 'react-router-dom'
import ReactRoutes from '../config/ReactRoutes'
import AddProduct from '../components/Modals/AddProduct'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApiRoutes from '../config/ApiRoutes';
import { Button } from "react-bootstrap";


const Admin = () => {
    const [categories, setCategories] = useState([]);
    const [peopleCategories, setPeopleCategories] = useState([]);

    useEffect(() => {
        // Dohvatite kategorije
        axios.get(ApiRoutes.PRODUCT_CATEGORY)
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        // Dohvatite ljudske kategorije
        axios.get(ApiRoutes.PEOPLE_CATEGORY)
            .then(response => {
                setPeopleCategories(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <div>
            <section id="scroll">
                <div className="container px-5">
                    <div className="row gx-5 align-items-center">
                        <div className="col-lg-6 order-lg-2">
                            <div className="p-5"><img className="img-fluid rounded-circle" src="./Assets/img/slider/admin1.avif" alt="..." /></div>
                        </div>
                        <div className="col-lg-6 order-lg-1">
                            <div className="p-5">
                                <h2 className="display-4">Dobrodosli na admin stranicu</h2>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container px-5">
                    <div className="row gx-5 align-items-center">
                        <div className="col-lg-6">
                            <div className="p-5"><img className="img-fluid rounded-circle" src="./Assets/img/slider/admin2.avif" alt="..." /></div>
                        </div>
                        <div className="col-lg-6">
                            <div className="p-5">
                                <h2 className="display-4">Dodaj nove proizvode</h2>
                                <AddProduct categories={categories} peopleCategories={peopleCategories} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container px-5">
                    <div className="row gx-5 align-items-center">
                        <div className="col-lg-6 order-lg-2">
                            <div className="p-5"><img className="img-fluid rounded-circle" src="./Assets/img/slider/admin3.avif" alt="..." /></div>
                        </div>
                        <div className="col-lg-6 order-lg-1">
                            <div className="p-5">
                                <h2 className="display-4"><Link className="nav-link link-dark px-2" to={ReactRoutes.MY_ORDERS}>Pregledajte sve pristigle porudzbine</Link></h2>
                                <Button variant="light"><Link className="nav-link link-dark px-2" to={ReactRoutes.MY_ORDERS}>Porudzbine</Link> </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="py-5 bg-black">
                <div className="container px-5"><p className="m-0 text-center  small">Copyright &copy; Your Website 2023</p></div>
            </footer>
        </div>
    )
}

export default Admin