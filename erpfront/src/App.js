import Category from './pages/Category'
import ReactRoutes from './config/ReactRoutes'
import Login from './pages/Login';
import Register from './pages/Register';
import UserOrders from './pages/UserOrders'
import Account from './pages/Account';
import Home from './pages/Home';
import Nav from './components/Nav';
import Product from './pages/Product';
import Blog from './pages/Blog';
import { useEffect, useState } from 'react';
import Cart from './pages/Cart';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import AdminPage from './pages/AdminPage';
import AddProduct from './components/Modals/AddProduct';
import ProductList from './components/ProductList';


function App() {

  const [cart, setCart] = useState([])
  const [numberOfCartItems, setNumberOfCartItems] = useState(0)
  const [cartTotalAmount, setCartTotalAmount] = useState(0)

  const loadCartFromLocalStorage = () => {
    let cartFromLocalStorage = localStorage.getItem("ButikCart")

    if (cartFromLocalStorage == null) {
      return
    }

    setCart(JSON.parse(cartFromLocalStorage))
  }

  useEffect(() => {
    loadCartFromLocalStorage()
  }, [])

  useEffect(() => {
    let count = 0;
    let sum = 0;

    cart.forEach(c => {
      count += parseInt(c.amount)
      sum += parseInt(c.amount) * parseInt(c.product.price)
    })

    setNumberOfCartItems(count)
    setCartTotalAmount(sum)

    localStorage.setItem("ButikCart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, amount) => {
    let tmpCart = [...cart]

    tmpCart.push({
      product: product,
      amount: amount
    })

    setCart(tmpCart)
  }

  const deleteFromCart = productId => {
    let tmpCart = [...cart]

    setCart(tmpCart.filter(item => item.product.productID !== productId))
  }

  const updateCart = (productId, amount) => {
    if (amount < 1) return

    let tmpCart = [...cart]

    tmpCart.forEach((item, index) => {
      if (item.product.productID == productId) {
        tmpCart[index].amount = amount
      }
    })

    setCart(tmpCart)
  }

  const emptyCart = () => {
    setCart([])
  }

  return (
    <div>
      <Nav numberOfCartItems={numberOfCartItems} cartTotalAmount={cartTotalAmount}/>

      <Routes>
      <Route path={ReactRoutes.HOME} element={<Home />} />
      <Route path={ReactRoutes.ACCOUNT} element={<Account />} />
      <Route path={ReactRoutes.MY_ORDERS} element={<UserOrders />} />
      <Route path={ReactRoutes.PRODUCT} element={<Product addToCart={addToCart} />} />
      <Route path={ReactRoutes.LOGIN} element={<Login />} />
      <Route path={ReactRoutes.REGISTER} element={<Register />} />
      <Route path={ReactRoutes.CATEGORY} element={<Category addToCart={addToCart} />} />
      <Route path={ReactRoutes.BLOG} element={<Blog />} />
      <Route path={ReactRoutes.CART} element={<Cart cart={cart} updateCart={updateCart} deleteFromCart={deleteFromCart} emptyCart={emptyCart} />} />
      <Route path={ReactRoutes.ADMIN_PAGE} element={<AdminPage />} />
      <Route path={ReactRoutes.ADD_PRODUCT} element={<AddProduct />} />
  


      </Routes>

    </div>
  );
}

export default App;
