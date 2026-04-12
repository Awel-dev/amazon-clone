import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { FiSearch } from "react-icons/fi"
import { GrLocation } from "react-icons/gr"
import { PiShoppingCartSimpleBold } from "react-icons/pi"
import flag from "../../assets/favicon-(3).ico"
import classes from "./header.module.css"
import Lowerheader from './lowerheader'
import { DataContext } from '../dataProvider/dataProvider'
import { auth } from '../../assets/firebase'

function Header() {

  const [{basket, user},dispatch]=useContext(DataContext)
  const totalItem=basket?.reduce((amount,item)=>{
    return item.amount + amount
  },0)

  return (
    <section className={classes.fixed}>
    <>
      <div className={classes.header_container}>

        {/* Logo + Location */}
        <div className={classes.logo_container}>
          <Link to="/">
            <img src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png" alt="amazon" />
          </Link>
          <div className={classes.delivery}>
            <span><GrLocation /></span>
            <div>
              <p>Deliver to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className={classes.search}>
          <select>
            <option>All</option>
          </select>
          <input type="text" placeholder="Search product" />
          <FiSearch size={30} />
        </div>

        {/* Right section: language, account, orders, cart */}
        <div className={classes.order_container}>

          {/* Language selector */}
          <div className={classes.language}>
            <img src={flag} alt="flag" />
            <select>
              <option>EN</option>
            </select>
          </div>

          {/* Sign In */}
          <Link to={!user ? "/auth" : "#"}>
            <div>
              {user? (<>
              <p>Hello, {user?.email?.split("@")[0].slice(0, 6)}</p>
               <span onClick={()=>auth.signOut()}>Sign Out</span></>): 
              (<><p>Sign in</p>
              <span>Account & Lists</span>
              </>)
             }
            </div>
          </Link>

          {/* Orders */}
          <Link to="/orders">
            <div>
              <p>Returns</p>
              <span>& Orders</span>
            </div>
          </Link>

          {/* Cart */}
          <Link to="/cart" className={classes.cart}>
            <PiShoppingCartSimpleBold size={35} />
            <span>{totalItem}</span>
          </Link>

        </div>
      </div>

      {/* Lower header */}
      <Lowerheader />
    </>
    </section>
  )
}

export default Header