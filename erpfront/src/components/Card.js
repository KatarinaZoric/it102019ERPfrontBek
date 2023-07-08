import React, { useEffect, useState } from 'react'
import UserUtility from '../utility/UserUtility'
import UpdateProduct from './Modals/UpdateProduct'
import DeleteProduct from './Modals/DeleteProduct'
import {Link} from 'react-router-dom'
import ReactRoutes from '../config/ReactRoutes'

const Card = ({product, categories, addToCart, peopleCategories}) =>{

    const [numberToAdd, setNumberToAdd] = useState(1)

    useEffect(() => {
        if (numberToAdd < 1) {
            setNumberToAdd(1)
        }
    }, [numberToAdd])

    const renderActions = () => {
        if(UserUtility.isEmployee()){
            return (
                <div> 
                    <UpdateProduct peopleCategories={peopleCategories} product={product}
                    categories={categories}/>
                    <DeleteProduct product={product} />
                </div>
            )
        }
        else {
            if(UserUtility.isLoggedIn())
            {
                return (
                    <div className="text-center d-flex align-items-center justify-content-center">
                        <input type="number" style={{width: "3rem", marginRight: "1rem"}} value={numberToAdd} onChange={(e) => setNumberToAdd(e.target.value)}></input>
                        <button onClick={() => addToCart(product, numberToAdd)} className="btn btn-outline-dark mt-auto">Add to cart</button>
                    </div>
                )
            }
            else {
                return (
                    <button className="btn btn-outline-dark mt-auto "><a style={{textDecoration: "none", color:"black"}} href={ReactRoutes.LOGIN}>Sign in </a></button>
                )
            }
        }
    }

    const renderImage = () => {
        if (product.image === null)
            return <img className="card-img-top" src="/Assets/img/no-image.png" alt={product.name} />

        return <img className="card-img-top" src={product.image} alt={product.name} style={{width:"250px", height:"250px"}}/>
    }

    return(
        <div className="col mb-5">
        <div className="card h-100">
            {/* // Product image */}
            {renderImage()}
            {/* <!-- Product details--> */}
            <div className="card-body p-4">
                <div className="text-center">
                    {/* <!-- Product name--> */}
                    <Link className="fw-bolder" to={"/product/" + product.productID} style={{textDecoration:"none", color:"black", paddingRight: "5px"}} >{product.name}</Link> 
                    {/* <!-- Product price--> */}
                    {product.price} RSD
                </div>
            </div>
            {/* <!-- Product actions--> */}
            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                {renderActions()}
            </div>
        </div>
    </div>
    )
}

export default Card;