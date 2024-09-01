import React,{useState,useRef,useEffect}from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Loader from './Loader'
import AddProduct from './AddProduct'
import UpdateProduct from './UpdateProduct'
import DeleteProduct from './DeleteProduct'
import { Link } from 'react-router-dom'
import MetaData from './MetaData'
import { getUserDetails } from './productAction'
import PageNF from './PageNF'
const Admin = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
    dispatch(getUserDetails())
    },[dispatch])
    const {userDetails,loginFailed} = useSelector((state) => state.userDetails)
    const [compoLoading,setCompoLoading] = useState(true)
    const [addCompoLoading,setAddCompoLoading] = useState(false)
    const [updateCompoLoading,setUpdateCompoLoading] = useState(false)
    const [deleteCompoLoading,setDeleteCompoLoading] = useState(false)
    const [addCount,setAddCount] = useState(0)
    const [updateCount,setUpdateCount] = useState(0)
    const [deleteCount,setDeleteCount] = useState(0)
    const add = useRef(null)
    const update = useRef(null)
    const remove = useRef(null)
    const orderList = useRef(null)
    const userList = useRef(null)
    const openDetails1 = ()=>{
        document.getElementById('add').style.visibility = 'hidden'
        document.getElementById('update').style.visibility = 'hidden'
        document.getElementById('delete').style.visibility = 'hidden'
        document.getElementById('orderlist').style.visibility = 'hidden'
        document.getElementById('userlist').style.visibility = 'hidden'
        setAddCompoLoading(true)
        setTimeout(()=>{
          setAddCompoLoading(false)
          setAddCount(1)  
        },2000)  
    }
    const openDetails2 = ()=>{
        document.getElementById('add').style.visibility = 'hidden'
        document.getElementById('update').style.visibility = 'hidden'
        document.getElementById('delete').style.visibility = 'hidden'
        document.getElementById('orderlist').style.visibility = 'hidden'
        document.getElementById('userlist').style.visibility = 'hidden'
        setUpdateCompoLoading(true)
        setTimeout(()=>{
          setUpdateCompoLoading(false)
          setUpdateCount(1)  
        },2000)  
    }
    const openDetails3 = ()=>{
        document.getElementById('add').style.visibility = 'hidden'
        document.getElementById('update').style.visibility = 'hidden'
        document.getElementById('delete').style.visibility = 'hidden'
        document.getElementById('orderlist').style.visibility = 'hidden'
        document.getElementById('userlist').style.visibility = 'hidden'
        setDeleteCompoLoading(true)
        setTimeout(()=>{
          setDeleteCompoLoading(false)
          setDeleteCount(1)  
        },2000)  
    }   
    setTimeout(()=>{
        setCompoLoading(false) 
      },2000)  
  return (
    <>
    {compoLoading?<Loader/>: (loginFailed ? <PageNF props='Please log in to access'/> : (userDetails && userDetails.role === 'user' ? <PageNF props="Can't access this page"/> :  
    <div className='adminSite'>
      <MetaData title='Admin Page'/>
      <div ref={add} className='adminwork' onClick={openDetails1} id='add'>Add product</div>
      <div ref={update} className='adminwork' onClick={openDetails2} id='update'>Update product</div>
      <div ref={remove} className='adminwork' onClick={openDetails3} id='delete'>Delete product</div>
      <Link to="/admin/order/list"><div ref={orderList} className='adminwork' id='orderlist'>All orders List</div></Link>
      <Link to="/admin/user/list"><div ref={userList} className='adminwork' id='userlist'>All users List</div></Link>
      <AddProduct props={{addCompoLoading,addCount,add,update,remove,orderList,userList,setAddCount}}/>
      <UpdateProduct props={{updateCompoLoading,updateCount,add,update,remove,orderList,userList,setUpdateCount}}/>
      <DeleteProduct props={{deleteCompoLoading,deleteCount,add,update,remove,orderList,userList,setDeleteCount}}/>
    </div>))}</>
  )
}

export default Admin
