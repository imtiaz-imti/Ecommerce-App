import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import ReactStars from 'react-rating-stars-component'
import {getProductDetails,addOrder,getUserDetails} from './productAction'
import { useParams,useLocation} from 'react-router'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import Toast from './Toast'
import PageNF from './PageNF'
const ProductDetails = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const myQueryParam = queryParams.get('r')
  const options = {
    edit:false,
    color:'rgba(20,20,20,0.1)',
    activeColor:'tomato',
    value:myQueryParam,
    isHalf:true,
  } 
  const params= useParams() 
  const dispatch = useDispatch()
  useEffect(()=>{
      dispatch(getProductDetails(params.id))
      dispatch(getUserDetails())
    },[dispatch])
    const {product,failed} = useSelector((state) => state.product)
    const {userDetails} = useSelector((state) => state.userDetails)   
    const orders = useSelector((state) => state.addOrder.orders)
    const addNewOrder = ()=>{
      const newOrder = {
        name:product.name,
        price:product.price,
        quantity:1,
        image:product.images[0].url,
        productID:params.id
      }
      let newOrders = []
      newOrders = orders.map(order=>order)
      const alreadyPresent = newOrders.find(ele=>ele.productID===newOrder.productID)
      if(!alreadyPresent){newOrders.push(newOrder)}
      dispatch(addOrder(newOrders))
      document.getElementById('tao').style.visibility = 'visible'
      setTimeout(()=>{
        document.getElementById('tao').style.visibility = 'hidden'
      },2000)
    }
    const [loading,setLoading] = useState(true)
    setTimeout(()=>{
      setLoading(false)
    },2000)
  return (
    <div className='productdetails'>
      {loading ? <Loader/> : (failed ? <PageNF props='Product not found'/> : 
      <> 
      {product.images ? <div className='productimg'><img src={product.images[0].url} alt='#'/></div>:<></>}
      <div className='producttext'>
        <div className='namethis'>{product.name}</div>
        <div className='deshis'>{product.description ? product.description.substring(-1,50)+'...':''}</div>
        <div className='pricethis'>{product.price}$</div>
         <ReactStars {...options}/>
        <div className='categorythis'>{product.category}</div>
        <div className='addreviews'>Number of Reviews - {product.numOfReviews}</div>
        <Link to={`/product/details/${params.id}/reviews`} className='addreviews'>
          Some of the reviews of this product
        </Link>
        {userDetails ? <Link to={`/product/details/${params.id}/add/review`} className='addreviews'>
           <div className='addreviews' id='addreviews'>Add reviews for this product</div>
        </Link> : <></>}
        {userDetails ? <div className='addorder' onClick={addNewOrder} id='addorder'>Add to order list</div> : <></>}
      </div>
      </>)}
      <Toast toast={'Product is added to order list'}/>
    </div>
  )
}

export default ProductDetails
