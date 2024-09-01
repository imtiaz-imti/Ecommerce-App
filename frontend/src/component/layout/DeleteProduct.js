import React,{useEffect,useRef}from 'react'
import Loader from './Loader'
import {getProduct} from './productAction'
import {useSelector,useDispatch} from 'react-redux'
import axios from "axios"
const DeleteProduct = ({props}) => {
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(getProduct(''))
    },[dispatch])
    const {products} = useSelector((state) => state.products)
    const divRef = useRef(null)
    useEffect(()=>{
       if(!props.deleteCompoLoading && divRef && props.deleteCount){
        document.getElementById(divRef.current.id).style.visibility = 'visible'
       }
    },[props.deleteCompoLoading])
    const closeDetails = ()=>{
        document.getElementById('enterproduct3').style.visibility = 'hidden'
        document.getElementById(props.add.current.id).style.visibility = 'visible'
        document.getElementById(props.update.current.id).style.visibility = 'visible'
        document.getElementById(props.remove.current.id).style.visibility = 'visible'
        document.getElementById(props.orderList.current.id).style.visibility = 'visible'
        document.getElementById(props.userList.current.id).style.visibility = 'visible'
        document.getElementById('noname').style.visibility = 'hidden'
        document.getElementById('noname2').style.visibility = 'hidden'
        document.getElementById('nodescription').style.visibility = 'hidden'
        document.getElementById('noprice').style.visibility = 'hidden'
        document.getElementById('nocategory').style.visibility = 'hidden'
        document.getElementById('noimage').style.visibility = 'hidden'
        props.setDeleteCount(0)  
    } 
    const deleted = async ()=>{
      let name = document.getElementById('name3').value
      if(!name){
        document.getElementById('noname2').style.visibility = 'visible'
        return
      }
      let pro = products.find(pro=>pro.name.toLowerCase()===name.toLowerCase()) 
      if(!pro){
        document.getElementById('noname2').style.visibility = 'visible'
        return
      }
      try {
        await axios.delete('api/v1/admin/products/'+pro._id)
        document.getElementById('t3').style.visibility = 'visible'
        window.location.reload()
      } catch (error) {}
    }  
  return (
    <>
    {props.deleteCompoLoading?<Loader/>:<>
        <div ref={divRef} className='enterproduct' id='enterproduct3'>  
        <img src='https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_640.png' alt='#' onClick={closeDetails}/>     
         <div className='namewrap'>
         <div className='fdiv'><input autoComplete='off' type='text' placeholder='Product Name' className='name' id='name3'></input>
         </div>
         <div className='namewrong' id='noname2'>Please enter valid product name</div>
         </div>
         <div className='add' onClick={deleted}>Delete Product</div>
         </div>
         <div className='toast' id='t3'>Product Deleted Successfully</div>
         </>}</>
  )
}

export default DeleteProduct