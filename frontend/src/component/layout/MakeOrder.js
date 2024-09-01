import React,{useEffect,useState}from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Loader from './Loader'
import OrderItem from './OrderItem'
import axios from "axios"
import Message from './Message.js'
import { getUserDetails } from './productAction.js'
import PageNF from './PageNF.js'
import Toast from './Toast'
const MakeOrder = () =>{
 const dispatch = useDispatch()
 useEffect(()=>{
   dispatch(getUserDetails())
 },[dispatch])
  const {loginFailed} = useSelector((state) => state.userDetails)
  const [compoLoading,setCompoLoading] = useState(true) 
  const [totalPrice,setTotalPrice] = useState(0)  
  setTimeout(()=>{
    setCompoLoading(false)
    if(document.getElementById('message')){
      document.getElementById('message').style.visibility = 'visible'
    } 
  },2000)
  const orders = useSelector((state) => state.addOrder.orders)
  const addQuantity = useSelector((state) => state.addOrder.addQuantity)
  useEffect(()=>{
    let price = 0
    orders.forEach(element => {
      if(addQuantity[element.productID]){
        price+=(element.price*addQuantity[element.productID])
      }
      else{
        price+=element.price
      }
    })
    setTotalPrice(price)
  },[addQuantity])
  const orderNow = async ()=>{
    if(!document.getElementById('address').value){
      document.getElementById('fu1').style.visibility = 'visible'
      return
    }
    if(!document.getElementById('city').value){
      document.getElementById('fu2').style.visibility = 'visible'
      return
    }
    if(!document.getElementById('pincode').value){
      document.getElementById('fu3').style.visibility = 'visible'
      return
    }
    if(!document.getElementById('phonenumber').value){
      document.getElementById('fu4').style.visibility = 'visible'
      return
    }
    let nayaOrders = []
    orders.forEach((ele)=>{
      const quantity = addQuantity[ele.productID]?addQuantity[ele.productID]:1
      const obj = {name:ele.name,price:ele.price,quantity,image:ele.image,productID:ele.productID}
      nayaOrders.push(obj)
    })
    const body = {
      shippingInfo:{
        address:document.getElementById('address').value,
        city:document.getElementById('city').value,
        pinCode:document.getElementById('pincode').value,
        phoneNumber:document.getElementById('phonenumber').value
      },
      orderItems:nayaOrders,
      totalPrice:totalPrice
    }
    await axios.post('/api/v1/order/new',body)
    document.getElementById('tao').style.visibility = 'visible'
    setTimeout(()=>{
      document.getElementById('tao').style.visibility = 'hidden'
    },2000)
  }
  return (
    <>
    {compoLoading?<Loader/>: (loginFailed ? <PageNF props='Please log in to access'/> : <>
    {!orders || orders.length === 0 ? <Message message={'Please Select Product For Order'}/> : <></>}
    {orders && orders.length > 0 ? <div className='neworder'>
      <div className='orderlist'>
        <div className='listheader'>Order Items</div>
        <div className='listitems'>{orders.map(order=><OrderItem order={order}/>)}</div>
        <div className='listprice'>Total Price - {totalPrice}$</div>
      </div>
      <div className='shippingdetails'>
       <div className='namewrap'>
         <div className='fdiv'><input autoComplete='off' type='text' placeholder='Address' className='email' id='address'></input></div>
         <div className='namewrong' id='fu1'>Fill up the address</div>
         </div>
         <div className='namewrap'>
         <div className='fdiv'><input autoComplete='off' type='text' placeholder='City' className='password' id='city'></input></div>
         <div className='namewrong' id='fu2'>Fill up the city</div>
         </div>
         <div className='namewrap'>
         <div className='fdiv'><input autoComplete='off' type='text' placeholder='Pin Code' className='password' id='pincode'></input></div>
         <div className='namewrong' id='fu3'>Fill up the pin code</div>
         </div>
         <div className='namewrap'>
         <div className='fdiv'><input autoComplete='off' type='text' placeholder='Phone Number' className='password' id='phonenumber'></input></div>
         <div className='namewrong' id='fu4'>Fill up the phone number</div>
         </div>
         <div className='submit' onClick={orderNow}>Order Now</div>
       </div>
       <Toast toast={'order created successfully'}/>
    </div> : <></>}
    </>)}
    </>
  )
}

export default MakeOrder
