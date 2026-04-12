import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import { img } from "./imgdata"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import classes from "./carousal.module.css"
function CarouselSlider() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((item, index) => (
          <div key={index}>
            <img src={item} />
          </div>
        ))}
      </Carousel>
      <div className={classes.hero_img}>
      </div>
    </div>
  )
}

export default CarouselSlider
