import React, { useEffect, useState } from 'react'
import ProductCard from './productCard';
import Classes from "./product.module.css"
import Loader from '../loader/loader'
function Product() {
    const [first,setFirst] = useState([]);
    const  [isloading,setIsLoading]=useState(false)
   useEffect(() => {
    setIsLoading(true)
  async function getProducts() {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
     setFirst(data.products);
    console.log(data.products);
    setIsLoading(false)
  }

  getProducts();
}, []);
  return (
    <> {
    isloading?(<Loader/>):(
    <section className={Classes.product_container}>
      {first?.map((singleProduct)=>(
        <ProductCard product={singleProduct} key={singleProduct.id}
        addto={true}/>
      ))}
    </section>)} 
    </>
    )
    
  }

export default Product
