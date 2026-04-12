import React from 'react'
import Classes from "./category.module.css"
import { Link } from 'react-router-dom'
function CategoryCard({data}) {
  return (
    <div className={Classes.category}>
      <Link to={`/category/${data.name}`}>
        <span>
            <h3>{data.title}</h3>
        </span>
        <img src={data.imglink} alt="" />
        <p>shop now</p>
      </Link>
    </div>
  )
}

export default CategoryCard
