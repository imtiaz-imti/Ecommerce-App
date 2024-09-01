import React from 'react'
import ReactStars from 'react-rating-stars-component'
const Star = ({rating}) => {   
 const reviewRating = {
    edit:false,
    color:'rgba(20,20,20,0.1)',
    activeColor:'tomato',
    value:rating,
    isHalf:true
 }
  return (
    <ReactStars size={30} {...reviewRating}/>
  )
}

export default Star
