import React, { useState, useEffect } from "react";
import Layout from "../../layOut/layout";
import { useParams } from "react-router-dom";
import ProductCard from "../../product/productCard";
import classes from "./results.module.css";
import Loader from "../../loader/loader";
import { currenturl } from "../../../api/Endpoint";
function Results() {
  const { categoryName } = useParams();
  const [product, setProduct] = useState([]);
  const [isLoading,setIsLoading]=useState(false)

  useEffect(() => {
    
    async function getProducts() {
      setIsLoading(true)
        const res = await fetch(`${currenturl}/category/${categoryName}`);
        const data = await res.json();
        setProduct(data.products);
        console.log(data);
        setIsLoading(false)
    }

    getProducts();
  }, [categoryName]); 

  return (
    <Layout>
      {isLoading?(<Loader/>):(
        <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/{categoryName}</p>
        <hr />
        <div className={classes.product_container}>
          {product?.map((item) => (
            <ProductCard key={item.id} product={item} 
            addto={true}/>
          ))}
        </div>
      </section>
      )}
    </Layout>
  );
}

export default Results;