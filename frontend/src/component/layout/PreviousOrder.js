import React,{useEffect,useState}from 'react'
import OrderList from './OrderList'
import {useSelector,useDispatch} from 'react-redux'
import {orderDet,getUserDetails} from './productAction'
import Loader from './Loader'
import PageNF from './PageNF'
const PreviousOrder = () => {
  const [compoLoading,setcompoLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getUserDetails())
    dispatch(orderDet())
  },[dispatch])
  const {loginFailed} = useSelector((state) => state.userDetails)
  const orderDetails = useSelector((state) => state.addOrder.orderDetails)
  setTimeout(()=>{
    setcompoLoading(false)
  },2000)
  return (
    <>
    {compoLoading ? <Loader/> : (loginFailed ? <PageNF props='Please log in to access'/> : (!orderDetails || orderDetails.length === 0 ? <PageNF props='No order yet'/> :
    <div className='prevorder'>{orderDetails.map(orderDet=><OrderList orderDet={orderDet}/>)}</div>))}
    </>
  )
}

export default PreviousOrder
