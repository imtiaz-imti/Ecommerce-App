import React,{useEffect,useState,useRef} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getUserDetails} from './productAction'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import {orderDet} from './productAction'
import MetaData from './MetaData'
import axios from 'axios'
import Toast from './Toast'
import PageNF from './PageNF'
const UserDetails = () => {
 const [compoLoading,setCompoLoading] = useState(true)
 const [base64String,setBase64String] = useState('')
 const inputRef = useRef(null)
 const dispatch = useDispatch()
 useEffect(()=>{
   dispatch(getUserDetails())
   dispatch(orderDet())
 },[dispatch])
 const {userDetails,loginFailed} = useSelector((state) => state.userDetails)
 const orderDetails = useSelector((state) => state.addOrder.orderDetails)
 useEffect(()=>{
  if(userDetails && userDetails.avatar){
    const TYPED_ARRAY = new Uint8Array(userDetails.avatar.data.data)
    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
      return data + String.fromCharCode(byte)
      }, '')
    setBase64String(btoa(STRING_CHAR))  
  }
},[userDetails])  
 setTimeout(()=>{
  setCompoLoading(false) 
},2000)
const imageClick = ()=>{
  inputRef.current.click()
}
const imageChange = async (event)=>{
  try {
    const formData = new FormData()
    formData.append('image',event.target.files[0])
    await axios.post('/api/v1/user/profile/upload',formData,{headers : {'Content-Type' : 'multipart/form-data'}})
    dispatch(getUserDetails())
    if(userDetails && userDetails.avatar){
      const TYPED_ARRAY = new Uint8Array(userDetails.avatar.data.data)
      const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
        return data + String.fromCharCode(byte)
        }, '')
      setBase64String(btoa(STRING_CHAR))  
    }
    document.getElementById('tao').style.visibility = 'visible'
    setTimeout(()=>{
      document.getElementById('tao').style.visibility = 'hidden' 
    },2000)
  } catch (error) {}
}
return (
    <>
    {compoLoading?<Loader/>: (loginFailed ? <PageNF props='Please log in to access'/> : <>
    <MetaData title='Profile Page'/>
    <div className='userdetails'>
       {base64String === '' ? 
       <img onClick={imageClick} src='https://img.freepik.com/premium-vector/art-illustration_530521-130.jpg?size=626&ext=jpg&ga=GA1.1.767385608.1644030623&semt=ais' alt='#'/> : <img onClick={imageClick} src={"data:image/png;base64," + base64String} alt='#'/>} 
       <form style={{display : 'none'}}>
        <input type='file' accept='image/*' onChange={imageChange} ref={inputRef}/>
       </form>
       <div className='username'>{userDetails?userDetails.name:'User Name'}</div>
       <div className='username'>{userDetails?(userDetails.role==='user'?'Customer':'Admin'):''} ID - {userDetails._id}</div>
       <div className='username'>{userDetails?(userDetails.role==='user'?'Customer':'Admin'):''} Email - {userDetails.email}</div>
       <div className='makeorder'><Link to="/profile/make_order" style={{color: 'rgb(33, 80, 33)'}}>Make order now</Link></div>
       {orderDetails && orderDetails.length>0 ? <div className='previousorder'><Link to="/profile/previous_order" style={{color: 'rgb(33, 80, 33)'}}>Previous order list</Link></div>:<></>}
    </div>
    <Toast toast={'uploading profile picture...'}/>
    </>)}
    </>
  )
}

export default UserDetails
