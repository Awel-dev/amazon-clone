import React, {useContext,useState} from 'react'
import Layout from '../../layOut/layout'
import classes from './payment.module.css'
import { DataContext } from '../../dataProvider/dataProvider'
import  ProductCard  from '../../product/productCard'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrentFormat from '../../../components/product/currentFormat'
import { instance } from '../../../api/axios';
import { ClipLoader } from 'react-spinners'
import { db } from "../../../assets/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'
import { Type } from '../../../utility/action.type'

function Payment() {
  const [{ user, basket },dispatch] = useContext(DataContext);
  const [cardError,setCarderror]=useState(null)
  const [processing,setProcessing]=useState(false)

  const stripe = useStripe();       
  const elements = useElements(); 
  const navigate=useNavigate()


     const handleChange = (e) => {
       e?.error?.message? setCarderror(e.error.message):(null)
     }  

     const handleSubmit=async (e)=>{
      e.preventDefault();
      try {
          setProcessing(true)
        const response= await instance({
          method:"post",
         url:`/payment/create?total=${total*100}`,
          
        })
        console.log(response.data);
        const clientSecret=response?.data?.clientSecret;
         
       const {paymentIntent}= await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    await setDoc(
    doc(db, "users", user.uid, "orders", paymentIntent.id),
    {
    basket: basket,
    amount: paymentIntent.amount,
    created: paymentIntent.created,
  }
);
// remove from the basket
dispatch({type:Type.EMPTY_BASKET})

    setProcessing(false)
    navigate("/orders",{state:{msg:"Your order has been placed successfully"}})
      } 
      catch (error) {
        console.log(error);
        setProcessing(false)
      }
    }

    
  const totalItem=basket?.reduce((amount,item)=>{
    return item.amount + amount
  },0)


  const total=basket.reduce((amount,item)=>{
       return item.price*item.amount + amount},0)

  return (
    <Layout>
      <div className={classes.paymentHeader}>
        Checkout ({totalItem || 0}) items
      </div>

      <section className={classes.paymentSection}>
        {/* Address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Los Angeles, CA</div>
          </div>
        </div>

        <hr />

        {/* Products */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                flex={true}
                discr={true}
              />
            ))}
          </div>
        </div>

        <hr />

        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.cardForm}>
            <div className={classes.cardDetails}>
            <form onSubmit={handleSubmit} >
              {cardError && <small style={{color:"red"}} className={classes.cardError}>{cardError}</small>}
              <CardElement  onChange={handleChange}/>
              <div className={classes.price}>
                <div>
                  <span style={{display:"flex",gap:"10px"}}><p>Total order amount:  </p> <CurrentFormat amount={total}/></span>
                </div>
                <button className={classes.payBtn} type="submit">
                    {processing?(<div className={classes.processing}>
                      <ClipLoader size={12}/> <p>Please wait...</p>
                    </div>):"Pay Now"}
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
export default Payment
