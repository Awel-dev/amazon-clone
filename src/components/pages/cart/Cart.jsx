import React, { useContext } from 'react'
import  Layout from '../../layOut/layout'
import { DataContext } from '../../dataProvider/dataProvider'
import ProductCard   from '../../product/productCard'
import CurrentFormat from '../../../components/product/currentFormat'
import { Link } from 'react-router-dom'
import Classes from './cart.module.css'
import { Type } from '../../../utility/action.type'
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";


function Cart() {
  const [{basket,user},dispatch]=useContext(DataContext)
  const total=basket.reduce((amount,item)=>{
       return item.price*item.amount + amount},0)

 const increment =(item)=>{
  dispatch({type:Type.ADD_TO_CART,item})
 }
 const decrement=(id)=>{
  dispatch({
    type:Type.REMOVE_FROM_CART,id
  })
 }
  return (
   <Layout>
    <section  className={Classes.container}>
      <div className={Classes.cart_container}>
        <h2>Hello</h2>
        <h3>Your shopping basket</h3>
        <hr />
       {basket?.length===0?( <p>Oops ! No item in your cart</p>):(
        basket?.map((item)=>{
         return  <section key={item.id}  className={Classes.cart_product}>
          <ProductCard className={Classes.pro}
          key={item.id} 
             product={item}
             discr={true}
             flex={true}
             addto={false}
          />
 
           <div className={Classes.btn_container}>
            <button className={Classes.btn} onClick={()=>increment(item)}><MdKeyboardArrowUp size={25}/></button>
            <span>{item.amount}</span>
            <button className={Classes.btn} onClick={()=>decrement(item.id)}><MdKeyboardArrowDown  size={25}/></button>
           </div>
          </section>
           
        })
       )}
      </div>  
      {basket?.length !==0&&(
        <div className={Classes.subtotal}>
          <div>
            <div className={Classes.flex}>
            <p>Subtotal ({basket?.length}) items</p>
            <CurrentFormat amount={total}/>
            </div>
            <span className={Classes.small}>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link className={Classes.link} to="/payment">Continue to checkout</Link>
          </div>
        </div>
      )}
    </section>
   </Layout>
  )
}

export default Cart
