import React from 'react'
import {Link} from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
const options = {
    edit:false,
    color:'rgba(20,20,20,0.1)',
    activeColor:'tomato',
    value:2.5,
    isHalf:true,
}
const Newproele = ({product}) => {
  options.value = product.rating
  return (
    
       <Link to={`/product/details/${product._id}?r=${product.rating}`} className='elelink' style={{color:'black'}}>
          <img src={product.images[0].url} alt='#'/>
          <div className='text1'>{product.name}</div>
          <div className='text2'>{product.description ? product.description.substring(-1,100)+'...':''}</div>
          <div className='text3'>{product.price}$</div>
          <ReactStars {...options}/>
          <div className='text4'>({product.numOfReviews} Reviews)</div>
       </Link> 
  )
}

export default Newproele
