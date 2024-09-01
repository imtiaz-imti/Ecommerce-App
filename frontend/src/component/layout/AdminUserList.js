import React,{useEffect, useState}from 'react'
import AllUser from './AllUser'
import {useSelector,useDispatch} from 'react-redux'
import { getAllUser,getUserDetails } from './productAction'
import Loader from './Loader'
import MetaData from './MetaData'
import Toast from './Toast'
import Message from './Message.js'
import PageNF from './PageNF.js'
const AdminUserList = () =>{ 
  const [compoLoading,setCompoLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getUserDetails())
    dispatch(getAllUser())
  },[dispatch])
  const {userDetails,loginFailed} = useSelector((state) => state.userDetails)
  const allUser = useSelector((state) => state.allUser.allUser)
  useEffect(()=>{
    if(allUser && allUser.length>0){
      setCompoLoading(false)
    }
  },[allUser])
  const [user,setUser] = useState(null)
  const [allow,setAllow] = useState(0)
  const [show,setShow] = useState(0)
  if(show && document.getElementById('message')){
    document.getElementById('message').style.visibility = 'visible'
  }
  if(allow){
    document.getElementById('tao').style.visibility = 'visible'
    setTimeout(()=>{
      setAllow(0) 
      document.getElementById('tao').style.visibility = 'hidden'
    },2000)
  }
  const getInput = async(event)=>{
    if(event.key === 'Enter'){
      setShow(1)
      await allUser.forEach(user => {
        if(user._id===document.getElementById('searchuser').value){
          setUser(user)
          setShow(0)
        }
      })
    }
  }
  const search = async()=>{
      setShow(1)
      await allUser.forEach(user => {
        if(user._id===document.getElementById('searchuser').value){
          setUser(user)
          setShow(0)
        }
      })
  }
  setTimeout(()=>{
    setCompoLoading(false)
  },30000)
  return (
    <>
    {compoLoading ? <Loader/> : (loginFailed ? <PageNF props='Please log in to access'/> : (userDetails && userDetails.role === 'user' ? <PageNF props="Can't access this page"/> : <>
    <MetaData title='User List'/>
    <div className='user-list'>
        <div className='user-list1'>
          <input onKeyDown={getInput} autoComplete="off" type="text" className="searchuser" placeholder='Search user by ID' id='searchuser'/>
          <img onClick={search} src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-search-64.png' alt='#'/>
        </div>
        {show ? <Message message={'No User Found'}/> : user ? <AllUser props={{user,setAllow}}/> : allUser && allUser.length>0 && allUser.map(user=><AllUser key={user} props={{user,setAllow}}/>)}
        <Toast toast={'Loggin Admin can not be User'}/>
    </div>
    </>))}
    </>
  )
}

export default AdminUserList
