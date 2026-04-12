import React from 'react'
import Rating from '@mui/material/Rating'
import CurrentFormat from './currentFormat'
import classes from './product.module.css'
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { DataContext } from '../dataProvider/dataProvider'
import { Type } from '../../utility/action.type'
function ProductCard({ product,flex,discr,addto }) {
  const { thumbnail, title, rating, price, id, description } = product


const [state,dispatch]=useContext(DataContext)

// console.log(state)
const addtocart=()=>{
  dispatch({
    type:Type.ADD_TO_CART,

    item:{thumbnail, title, rating, price,id,description}
  })
}
  return (
    <div className={`${classes.card_container} ${flex?classes.product_flexed:" "}`}>
      <Link to={`/product/${id}`}>
        <img src={thumbnail} alt={title} />
      </Link>

      <div>
        <h3>{title}</h3>
        {discr && <div style={{ maxWidth:'750px'}}>{description}</div>}

        <div className={classes.rating}>
          <Rating value={rating?.rate} precision={0.1} readOnly />
          <small>{rating?.count}</small>
        </div>

        <div>
          <CurrentFormat amount={price} />
        </div>
         {addto && <button className={classes.button} onClick={addtocart}>Add to cart</button>}
        
      </div>
    </div>
  )
}

export default ProductCard