import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { ALL_PRODUCT_FAIL } from './const.js'
import axios from "axios"
import {getUserDetails} from './productAction'
const Header = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
   dispatch(getUserDetails())
  },[dispatch])
  const hide = (event)=>{
    if(event.target.id !== 'searchinput' && ref && document.getElementById(ref)){
      document.getElementById(ref).style.visibility = 'hidden'
      dispatch({type:ALL_PRODUCT_FAIL,payload:null})
    }
  }
  const logout = async ()=>{
    try {
      // const api = axios.create({baseURL :'https://retail-market-app-backend.onrender.com'})
      // await api.post('/api/v1/user/logout')
      localStorage.clear()
      dispatch(getUserDetails())
    } catch (error) {}
  }
  const {ref} = useSelector((state) => state.products)
  const {userDetails} = useSelector((state) => state.userDetails)
  useEffect(()=>{
    if(userDetails && document.getElementById('ele23') && document.getElementById('ele22')){
      document.getElementById('ele23').style.width = '15vw'
      document.getElementById('ele22').style.marginLeft = '7vw'
    }
    else if(document.getElementById('ele23') && document.getElementById('ele22')){
      document.getElementById('ele23').style.width = '10vw'
      document.getElementById('ele22').style.marginLeft = '2vw'
    }
  },[userDetails])
  const c0 = ()=>{
    if(document.getElementById('optionmenu')){
      document.getElementById('optionmenu').style.visibility = 'visible'
    }
  }
  const c1 = ()=>{
    if(document.getElementById('optionmenu')){
      document.getElementById('optionmenu').style.visibility = 'hidden'
    }
  }
  return (
    <div onClick={hide}>
        <div className='ele1'>Discount up to 10%</div>
        <div className='ele2'>
        <div className='optionmenu' id='optionmenu'>
          <div className='optionmenu1' id='c1' onClick={c1}><img src='https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_640.png' alt='#'/></div>
          <div className='optionmenu1'><Link to="/" style={{color: 'black'}}>Home</Link></div>
          <div className='optionmenu1'><Link to="/product" style={{color: 'black'}}>Product</Link></div>
          <div className='optionmenu1'><Link to="/search" style={{color: 'black'}}>Search product</Link></div>
          {userDetails && userDetails.role === 'admin'?
              <div className ='optionmenu1'><Link to="/admin" style={{color: 'black'}}>Admin</Link></div>:<></>}
          {userDetails?
              <div className ='optionmenu1'><Link to="/profile" style={{color: 'black'}}>Profile</Link></div>:<></>}
          {!userDetails?
              <div className ='optionmenu1'><Link to="/signin" style={{color: 'black'}}>Sign-in</Link></div>
              :<div className='optionmenu1' onClick={logout}><Link to="/" style={{color: 'black'}}>Log-out</Link></div>}
        </div>  
        <div className='option' onClick={c0}><img src='https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-24-64.png' alt='#'/></div>  
        <div className='ele2a'>
            <div className='ele21'>
              <div className ='home'><Link to="/" style={{color: 'black'}}>Home</Link></div>
              <div className ='product'><Link to="/product" style={{color: 'black'}}>Product</Link></div>
            </div>
            <div className='ele22' id='ele22'>E-Commerce</div>
            <div className='ele23' id='ele23'>
              {!userDetails?
              <div className ='contact'><Link to="/signin" style={{color: 'black'}}>Sign-in</Link></div>
              :<div className='contact' onClick={logout}><Link to="/" style={{color: 'black'}}>Log-out</Link></div>}
              {userDetails && userDetails.role === 'admin'?
              <div className ='about'><Link to="/admin" style={{color: 'black'}}>Admin</Link></div>:<></>}
              <div className ='search'><Link to="/search" style={{color: 'black'}}><img src='https://img.icons8.com/?size=50&id=132&format=png' alt='#'/></Link></div>
              {userDetails?
              <div className ='con'><Link to="/profile" style={{color: 'black'}}><img src='https://img.icons8.com/?size=24&id=86818&format=png' alt='#'/></Link></div>:<></>}
            </div>
        </div>
        </div>
    </div>
  )
}

export default Header
