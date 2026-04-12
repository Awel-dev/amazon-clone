import React, { useState, useEffect } from 'react'
import Layout from '../../layOut/layout'
import { useParams } from 'react-router-dom'
import { currenturl } from '../../../api/Endpoint'
import ProductCard from '../../product/productCard'
import Loader from "../../loader/loader"
function ProductDetail() {
  const { productId } = useParams()
  const [detail, setDetail] = useState(null)
  const [isLoading, setIsloading]= useState(false)

  useEffect(() => {
      setIsloading(true)
    async function getProduct() {
      try {
        const res = await fetch(`${currenturl}/${productId}`)
        const data = await res.json()
        setDetail(data)
        // console.log(data)
        setIsloading(false)
      } catch (error) {
        console.error("Fetch error:", error)
        setIsloading(false)
      }
    }

    getProduct()
  }, [productId])

  return (
    <Layout>
       {isLoading ? (
        <Loader />
      ) : detail ? (
        <div style={{ padding: "30px" }}>
          <ProductCard product={detail} 
          flex={true}
          discr={true}
          addto={true}/>
        </div>
      ) : (
        <p>Product not found</p>
      )}
      
    </Layout>
  )
}

export default ProductDetail