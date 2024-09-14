import React,{useState}from 'react'
import axios from "axios"
import {useDispatch,useSelector} from 'react-redux'
import Newproduct from './Newproduct'
import {getUserDetails} from './productAction'
import Loader from './Loader'
import Toast from './Toast'
import MetaData from './MetaData'
const Signup = () => {
  const [compoLoading,setcompoLoading] = useState(true)
  const [nameValue,setNameValue] = useState('')
  const [emailValue,setEmailValue] = useState('')
  const [passwordValue,setPasswordValue] = useState('')
  const dispatch = useDispatch()
  const submit = async ()=>{
    document.getElementById('tao').style.visibility = 'visible'
    const body = {
      "name":document.getElementById('name').value,
      "email":document.getElementById('email').value,
      "password":document.getElementById('password').value,
    }
    try {
      const api = axios.create({baseURL :'https://retail-market-app-backend.onrender.com'})
      await api.post('api/v1/user/new',body)
      localStorage.setItem('status','online')
      dispatch(getUserDetails())
    } catch (error) {
      document.getElementById('namewrong').style.visibility = 'visible'
      document.getElementById('emailwrong').style.visibility = 'visible'
      document.getElementById('passwordwrong').style.visibility = 'visible'
      const message = error.response.data.message
      if(message.indexOf('name') !== -1){
        setNameValue('name should have 4 characters or more')     
      }
      else{
        setNameValue('')
      }
      if(message.indexOf('email') !== -1){
        setEmailValue('please enter a valid email')     
      }
      else{
        setEmailValue('')
      }
      if(message.indexOf('password') !== -1){
        setPasswordValue('password should have 8 characters or more')     
      }
      else{
        setPasswordValue('')
      }
    }
    document.getElementById('tao').style.visibility = 'hidden'
  }
  const {userDetails} = useSelector((state) => state.userDetails)
  setTimeout(()=>{
    setcompoLoading(false)
  },2000)
  if(!userDetails){
  return (
    <div className='signup'>
      {compoLoading?<Loader/>:<>
      <MetaData title='Signup Page'/>
      <div className='signindetails'>
         <div className='namewrap'>
         <div className='fdiv'><input autoComplete='off' type='text' placeholder='Name' className='name' id='name'></input>
         </div>
         <div className='namewrong' id='namewrong'>{nameValue}</div>
         </div>
         <div className='namewrap'>
         <div className='fdiv'><input autoComplete='off' type='text' placeholder='Email' className='email' id='email'></input></div>
         <div className='namewrong' id='emailwrong'>{emailValue}</div>
         </div>
         <div className='namewrap'>
         <div className='fdiv'><input autoComplete='off' type='text' placeholder='Password' className='password' id='password'></input></div>
         <div className='namewrong' id='passwordwrong'>{passwordValue}</div>
         </div>
         <div className='submit' onClick={submit}>Create Account</div>
      </div></>}
      <Toast toast={'Creating Account....'}/>
    </div>
  )
  }
  else{
    return (<Newproduct/>)
  }
}

export default Signup
