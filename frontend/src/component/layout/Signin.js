import React,{useState}from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import {useDispatch,useSelector} from 'react-redux'
import Newproduct from './Newproduct'
import {getUserDetails} from './productAction'
import Loader from './Loader'
import Toast from './Toast'
import MetaData from './MetaData'
const qs = require('qs');
const Signin = () => {
  const [compoLoading,setcompoLoading] = useState(true)
  const [value,setValue] = useState('')
  const dispatch = useDispatch()
  const submit = async ()=>{
    document.getElementById('tao').style.visibility = 'visible'
    try {
      const body = {
        "email":document.getElementById('email').value,
        "password":document.getElementById('password').value,
      }
      axios.post('https://retail-market-app-backend.onrender.com/api/v1/user/login',body)
      // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
      // const api = axios.create({baseURL :'https://retail-market-app-backend.onrender.com'})
      // console.log(body)
      // await api.post('/api/v1/user/login',body)
      dispatch(getUserDetails()) 
    } catch (error) {
      document.getElementById('emailwrong').style.visibility = 'visible'
      document.getElementById('passwordwrong').style.visibility = 'visible'
      setValue(error.response.data.message)
    }
    document.getElementById('tao').style.visibility = 'hidden'
  }
  const {userDetails} = useSelector((state) => state.userDetails)
  setTimeout(()=>{
    setcompoLoading(false)
  },2000)
  if(!userDetails){  
  return (
    <div className='signin'>
       {compoLoading?<Loader/>:<>
       <MetaData title='Signin Page'/>
       <div className='signindetails'>
       <div className='namewrap'>
         <div className='fdiv'><input autoComplete='off' type='text' placeholder='Email' className='email' id='email'></input></div>
         <div className='namewrong' id='emailwrong'>{value}</div>
         </div>
         <div className='namewrap'>
         <div className='fdiv'><input autoComplete='off' type='text' placeholder='Password' className='password' id='password'></input></div>
         <div className='namewrong' id='passwordwrong'>{value}</div>
         </div>
         <div className='submit' onClick={submit}>Submit</div>
         <Link to='/forget' className='createaccount'>forget password</Link>
         <Link to='/signup' className='createaccount'>create account</Link>
       </div></>}
       <Toast toast={'Loggin wait....'}/>
    </div>
  )}
  else{
    return (<Newproduct/>)
  }
}

export default Signin
