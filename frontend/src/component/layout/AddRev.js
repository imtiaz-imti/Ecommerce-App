import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {getProductDetails,getUserDetails} from './productAction'
import Loader from './Loader'
import Toast from './Toast'
import PageNF from './PageNF'
const AddRev = () => {
    const [loading,setLoading] = useState(true)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getProductDetails(params.id))
        dispatch(getUserDetails())
    },[dispatch])
    const {product,failed} = useSelector((state) => state.product)
    const {loginFailed} = useSelector((state) => state.userDetails)
    const params= useParams()
    const submitReview = async ()=>{
      const comment = document.getElementById('comment').value
      const rating = document.getElementById('rating').value
      if(comment && rating){
        const body = {comment,rating}
        await axios.post('/api/v1/products/review/'+params.id,body)
        document.getElementById('tao').style.visibility = 'visible'
        setTimeout(()=>{
          document.getElementById('tao').style.visibility = 'hidden'
        },2000)
      }
    }
    setTimeout(()=>{
      setLoading(false)
    },2000)
  return (
    <>
    {loading ? <Loader/> : (loginFailed ? <PageNF props='Please log in to add review'/> : (failed ? <PageNF props='Product not found'/> : <>
    <div className='addrev'>
         <div className='useraddreview' id='useraddreview'>
         <div className='n1'><Link to={`/product/details/${product._id}?r=${product.rating}`}>
          <img src='https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_640.png' alt='#'/>
         </Link></div>
         <div className='f1div'><input autoComplete='off' type='text' placeholder='Comment' className='f1divc' id='comment'></input></div>
         <div className='f1div'><input autoComplete='off' type='number' placeholder='Rating' className='f1divc' id='rating'></input></div> 
         <div className='f2div' onClick={submitReview}>Add Review</div>    
        </div>
    </div>
    <Toast toast={'Review added successfully'}/>
     </>))}
    </>
  )
}

export default AddRev
