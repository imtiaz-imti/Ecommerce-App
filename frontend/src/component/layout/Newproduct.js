import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Newproele from './Newproele'
import MetaData from './MetaData'
import {getProduct} from './productAction'
import Loader from './Loader'
import {useSelector,useDispatch} from 'react-redux'
const Newproduct = () =>{
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(()=>{
    navigate("/product")
    navigate("/product", { replace: true })
    dispatch(getProduct(''))
  },[dispatch,navigate])
  const {products,loading} = useSelector((state) => state.products)
  return (
    <div className='productcompo'>
      <MetaData title='Product Page'/>
      {loading ? <Loader/> : products && products.map(product=><Newproele product={product}/>)}
    </div>
  )
}

export default Newproduct
