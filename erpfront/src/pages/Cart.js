import { useNavigate } from "react-router";
import ReactRoutes from "../config/ReactRoutes";
import { OrderService } from "../services/OrderService";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";

const stripeKey = "pk_test_51NQoVqBeidpauHg4CSquTpExwZQYWZQJuRLocTvLRveB3GPou2sMXYIHNbpHs8rRf7EQv5uMt5xhuGBcXOAEE6jI00fIVLi2BV";
const stripePromise = loadStripe(stripeKey);

const Cart = ({ cart, updateCart, deleteFromCart, emptyCart }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    loadOrders();
  }, []);
  
  const loadOrders = () => {
    OrderService.fetchOrders()
      .then((response) => {
        setOrders(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const makeNewOrder = () => {
    OrderService.makeOrder(cart)
      .then((response) => {
        console.table(response);
        emptyCart();
        navigate(ReactRoutes.MY_ORDERS);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleToken = async (token) => {
    try {
      const response = await OrderService.createOrder(cart, token.id);
      console.table(response);
      handlePaymentSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePaymentSuccess = () => {
    emptyCart();
    navigate(ReactRoutes.MY_ORDERS);
    makeNewOrder();
  };

  const renderTable = () => {
    return (
      <div>
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th>Proizvod</th>
              <th>Kolicina</th>
              <th>Cena po jedinici</th>
              <th>Ukupna cena</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item) => {
              return (
                <tr key={item.product.productID}>
                  <td>{item.product.name}</td>
                  <td>
                    <input
                      type="number"
                      style={{ width: "3rem" }}
                      value={item.amount}
                      onChange={(e) =>
                        updateCart(item.product.productID, e.target.value)
                      }
                    ></input>
                  </td>
                  <td>{item.product.price} rsd</td>
                  <td>{item.amount * item.product.price} rsd</td>
                  <td>
                    <button
                      onClick={() => deleteFromCart(item.product.productID)}
                      className="btn btn-danger btn-sm"
                    >
                      &#10006;
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="d-flex align-items-center justify-content-end mt-5">
          <button onClick={emptyCart} className="btn btn-danger me-3">
            Obrisi sve
          </button>
          <StripeCheckout
            stripeKey={stripeKey}
            token={handleToken}
            amount={calculateOrderAmount(cart)*100}
            name="Butik Kaja"
            description="Narudžbina"
            currency="RSD"
            email="email@example.com"
          >
            <button onClick={handlePaymentSuccess} className="btn btn-success">Plati</button>
          </StripeCheckout>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      {cart.length !== 0 ? (
        renderTable()
      ) : (
        <h1>Korpa je prazna!</h1>
      )}
    </div>
  );
};

const calculateOrderAmount = (cart) => {
  return cart.reduce((total, item) => total + item.amount * item.product.price, 0);
};

export default Cart;
