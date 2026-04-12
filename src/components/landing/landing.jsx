import React from 'react'
import Carousal from "../carousal/carousal"
import Category from "../category/category"
import Product from "../product/product"
import Layout from '../layOut/layout'

function Landing() {
  return (
    <Layout>
      <Carousal />
      <Category />
      <Product />
    </Layout>
  )
}

export default Landing