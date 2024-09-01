import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { getUserDetails } from './productAction'
import {useSelector,useDispatch} from 'react-redux'
const AllUser = ({props}) => {
  const [base64String,setBase64String] = useState('')
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getUserDetails())
    if(props.user && props.user.avatar){
      const TYPED_ARRAY = new Uint8Array(props.user.avatar.data.data)
      const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
        return data + String.fromCharCode(byte)
        }, '')
      setBase64String(btoa(STRING_CHAR))  
    }
  },[dispatch,props.user])
  const userDetails = useSelector((state) => state.userDetails.userDetails)
  const changeRole = async ()=>{
    if(props.user._id === userDetails._id){
      props.setAllow(1)
      return
    }
    let role = 'user'
    if(props.user.role==='user'){role='admin'}
    const body = {role}
    try {
      await axios.put('/api/v1/user/admin/profile/update/'+props.user._id,body)
      window.location.reload()
    } catch (error){}
  }
  return (
    <div className='user-list2'>
       {base64String === '' ? 
       <img src='https://img.freepik.com/premium-vector/art-illustration_530521-130.jpg?size=626&ext=jpg&ga=GA1.1.767385608.1644030623&semt=ais' alt='#'/> : <img src={"data:image/png;base64," + base64String} alt='#'/>}
       <div className='user-name'>{props.user.name}</div>
       <div className='user-role'>
          <div className='user-role1' onClick={changeRole}>{props.user.role}</div>
       </div> 
    </div>
  )
}

export default AllUser
