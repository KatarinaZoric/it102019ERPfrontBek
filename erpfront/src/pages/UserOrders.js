import React, { useEffect, useState } from 'react'
import { OrderService } from '../services/OrderService'
import DateTimeUtility from '../utility/DateTimeUtility'
import UserUtility from '../utility/UserUtility'


function UserOrders () {

    const [orders, setOrders] = useState([])
    let userId = localStorage.getItem("UserID")

    useEffect(() => {
        if(UserUtility.isEmployee())
        {
            OrderService.getAllOrders()
            .then(setOrders)
        }
        else {
            OrderService.getAllOrdersForUser(userId)
            .then(setOrders)
            console.log(orders)
        }   
    },[])


    function deleteOrder(orderId) {
        OrderService.deleteOrder(orderId)
        .then(response => 
            console.log(response))

        window.location.reload();
        
    }
    return (
        <div style={{backgroundColor:"#f7faf7", margin:"0"}}>
            <h2 className="d-flex align-items-center justify-content-center" style={{padding: "15px"}}>Moje porudzbine</h2>
            {orders.map(order => {
                return (
                <div>
                    <table className="table table-striped table-dark">
                        <thead> 
                            <p>{UserUtility.isEmployee()? <span>{order.user.name} {order.user.surname}</span>: ""}</p>
                            <tr className="d-flex">
                                <th className="col-1">{DateTimeUtility.formatDate(order.date)}</th>
                                <th className="col-2">Proizvod</th>
                                <th className="col-3">Kolicina</th>
                                <th className="col-4">Cena po jedinici</th>
                                <th className="col-2" >Ukupna cena</th>
                            </tr>
                        </thead>
                        <tbody>
                                {order.orderItems.map(item => {
                                    return (
                                        <tr className="d-flex">
                                            <th className="col-1"></th>
                                            <td className="col-2">{item.product.name}</td>
                                            <td className="col-3">{item.amount}</td>
                                            <td className="col-4">{item.price} RSD</td>
                                            <td className="col-2">{(item.price * item.amount).toFixed(2)} RSD</td>
                                        </tr>
                                        
                                    )
                                })}
                        </tbody>
                    </table>
                    <div className="d-flex align-items-center justify-content-end" style={{margin:"20px"}}>
                        <h3 style={{marginRight:"10px"}}>Total: {order.total} RSD</h3>
                        <button className="btn btn-danger me-3" onClick={ () => deleteOrder(order.orderID)}>Obrisi porudzbinu</button>
                    </div>
                </div>
                )
            })}
        </div>
    )
}

export default UserOrders