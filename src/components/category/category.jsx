import React from 'react'
import { Categoryinfo } from './categoryInfo'
import CategoryCard from './categoryCard'
import Classes from "./category.module.css"
function Category() {
  return (
    <section className={Classes.container}>
      {Categoryinfo.map((infos)=>(
        <CategoryCard key={infos.name} data={infos}/>
      ))}
    </section>
    )
}

export default Category
