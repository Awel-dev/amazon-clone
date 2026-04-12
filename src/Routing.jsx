import React from 'react'
import { Routes, Route } from "react-router-dom"

import Landing from './components/landing/landing'
import Auth from './components/pages/Auth/Auth'
import Payment from './components/pages/payment/Payment'
import Cart from './components/pages/cart/Cart'
import Orders from './components/pages/orders/orders'
import Results from './components/pages/results/Results'
import ProductDetail from './components/pages/productDetail/ProductDetail'
import ProtectedRouting from './components/protectedRouting/protectedroting'


import { Elements } from '@stripe/react-stripe-js'; // ✅ FIXED
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51TKLc4FCJhqurnO8pyR8aSsjGF5UWZXtef0d2LFBtEnKtX96JboS37UnfsNvk1YFkbDKaVeOL0gtEKENLppq4Yaf00YliAaSC0');

function Routing() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/auth' element={<Auth />} />
     
      <Route
        path='/payment'
        element={
           <ProtectedRouting msg="You need to login to access the payment page" redirect="/payment">
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        </ProtectedRouting>
        }
      />
     
      

      <Route path='/orders' element={
        <ProtectedRouting msg="You need to login to access the orders page" redirect="/orders">
          <Orders />
        </ProtectedRouting>
      } />
      <Route path='/cart' element={<Cart />} />
      <Route path='/category/:categoryName' element={<Results />} />
      <Route path='/product/:productId' element={<ProductDetail />} />
    </Routes>
  )
}

export default Routing