import React from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import classes from "./header.module.css"
const lowerheader = () => {
  return (
    <div className={classes.lower_container}>
      <ul>
        <li>
            <AiOutlineMenu />
            <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Prime Video</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Costumer Service</li>
        <li>Sell</li>
      </ul>
    </div>
  )
}

export default lowerheader
