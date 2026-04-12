import React from 'react'
import Layout from '../../layOut/layout'
import classes from './orders.module.css'
import { DataContext } from '../../dataProvider/dataProvider'
import { useContext,useEffect, useState} from 'react'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../../assets/firebase";
import ProductCard from '../../product/productCard'


function Orders() {
  const [{ user },dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);



  

useEffect(() => {
  if (!user?.uid) return;

  const ordersRef = collection(db, "users", user.uid, "orders");
  const q = query(ordersRef, orderBy("created", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // console.log(data);
    setOrders(data);
  });

  return () => unsubscribe();
}, [user]);






  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {orders?.length === 0 && (
            <p style={{padding:"20px"}}>You have no orders yet.</p>
          )}
          <div className={classes.orders}>
  {orders?.map((order) => (
    <div key={order.id}>
      <hr />
      <p>Order ID: {order.id}</p>

      {order?.basket?.map((item) => (
        <ProductCard className={classes.product_card}
         discr={true}
          key={item.id}
          id={item.id}
          flex={true}
          product={item}
        />
      ))}
    </div>
  ))}
</div>
        </div>
      </section>
    </Layout>
  )
}

export default Orders
