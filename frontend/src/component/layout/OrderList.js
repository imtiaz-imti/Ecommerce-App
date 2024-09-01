import React,{useState,useEffect}from 'react'
import PreviousItem from './PreviousItem'
import {useSelector} from 'react-redux'
import axios from "axios"
import MetaData from './MetaData'
const OrderList = ({orderDet}) => {
  const {userDetails} = useSelector((state) => state.userDetails)
  const [status,setStatus] = useState(orderDet.orderStatus)
  const [delc,setDelc] = useState('')
  const [delv,setDelv] = useState('')
  useEffect(()=>{
    if(status === 'delivered'){
      setDelc('green')
      setDelv('hidden')
   }
   else{
      setDelc('orange')
      setDelv('visible')
   } 
  },[status])
  const onDeliver = async ()=>{
    await axios.put('/api/v1/order/status/'+orderDet._id)
    setStatus('delivered')
  }
  return (
    <>
    <MetaData title='Order List'/>
    <div className='ordershow'>
          <div className='dateshow'>
            <div className='date'>{status === 'processing'?orderDet.orderDate:orderDet.deliverDate}</div>
            <div className='date'>{status === 'processing'?orderDet.orderTime:orderDet.deliverTime}</div>
          </div>
          <div className='shipshow'>Shipping Info</div>
          <div className='shiplist'>
             <div className='ship1'>
               <div>Address</div>
               <div>City</div>
               <div>Pin Code</div>
               <div>Phone Number</div>
             </div>
             <div className='ship2'>
               <div>:</div>
               <div>:</div>
               <div>:</div>
               <div>:</div>
             </div>
             <div className='ship3'>
               <div>{orderDet.shippingInfo.address.substring(-1,11)+'...'}</div>
               <div>{orderDet.shippingInfo.city.substring(-1,11)+'...'}</div>
               <div>{orderDet.shippingInfo.pinCode}</div>
               <div>{orderDet.shippingInfo.phoneNumber}</div>
             </div>
          </div>
          <div className='shipshow'>Order Items</div>
          <div className='listitems2'>{orderDet.orderItems.map(item=><PreviousItem item={item}/>)}</div>
          <div className='ds'>
            <div className='ds1'>Delivery status</div>
            <div className='ds2'>:</div>
            <div className='deli'><div className='ds3' id='ds3' style={{color:delc}}>{status}</div>{ userDetails && userDetails.role === 'admin'?<div className='delv' onClick={onDeliver} id='delv' style={{visibility:delv}}>Delivered</div>:<></>}</div>
          </div>
          <div className='ds'>
            <div className='ds1'>Total price</div>
            <div className='ds2'>:</div>
            <div className='deli'>{orderDet.totalPrice}$</div>
          </div>
       </div>
       </>
  )
}

export default OrderList
