import React,{useEffect,useRef}from 'react'
import Loader from './Loader'
import axios from "axios"
const AddProduct = ({props}) => {
    const divRef = useRef(null)
    useEffect(()=>{
       if(!props.addCompoLoading && divRef && props.addCount){
        document.getElementById(divRef.current.id).style.visibility = 'visible'
       }
    },[props.addCompoLoading])
    const closeDetails = ()=>{
        document.getElementById('enterproduct1').style.visibility = 'hidden'
        document.getElementById(props.add.current.id).style.visibility = 'visible'
        document.getElementById(props.update.current.id).style.visibility = 'visible'
        document.getElementById(props.remove.current.id).style.visibility = 'visible'
        document.getElementById(props.orderList.current.id).style.visibility = 'visible'
        document.getElementById(props.userList.current.id).style.visibility = 'visible'
        document.getElementById('noname').style.visibility = 'hidden'
        document.getElementById('nodescription').style.visibility = 'hidden'
        document.getElementById('noprice').style.visibility = 'hidden'
        document.getElementById('nocategory').style.visibility = 'hidden'
        document.getElementById('noimage').style.visibility = 'hidden'
        props.setAddCount(0)  
    } 
    const add = async ()=>{
      const body = {
        name:document.getElementById('name').value,
        description:document.getElementById('des').value,
        price:document.getElementById('price').value,
        category:document.getElementById('category').value,
        images:[{
          public_id:'sample',
          url:document.getElementById('imglink').value
        }]
      }
      if(!document.getElementById('name').value){
        document.getElementById('noname').style.visibility = 'visible'
      }
      if(!document.getElementById('des').value){
        document.getElementById('nodescription').style.visibility = 'visible'
      }
      if(!document.getElementById('price').value){
        document.getElementById('noprice').style.visibility = 'visible'
      }
      if(!document.getElementById('category').value){
        document.getElementById('nocategory').style.visibility = 'visible'
      }
      if(!document.getElementById('imglink').value){
        document.getElementById('noimage').style.visibility = 'visible'
      }
      try {
        const api = axios.create({baseURL :'https://retail-market-app-backend.onrender.com'})  
        await api.post('api/v1/admin/products/new',body)
        document.getElementById('t1').style.visibility = 'visible'
        // window.location.reload()
      } catch (error) {
        document.getElementById('noprice').style.visibility = 'visible'
      }
    }  
  return (
    <>
    {props.addCompoLoading?<Loader/>:<>
        <div ref={divRef} className='enterproduct' id='enterproduct1'>  
        <img src='https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_640.png' alt='#' onClick={closeDetails}/>    
         <div className='namewrap'>
         <div className='fdiv'><input autoComplete='off' type='text' placeholder='Product Name' className='name' id='name'></input>
         </div>
         <div className='namewrong' id='noname'>Please enter product name</div>
         </div>
         <div className='namewrap'>
         <div className='fdiv'><input autoComplete='off' type='text' placeholder='Product Description' className='email' id='des'></input></div>
         <div className='namewrong' id='nodescription'>please enter product description</div>
         </div>
         <div className='namewrap'>
         <div className='fdiv'><input autoComplete='off' type='number' placeholder='Product Price$' className='email' id='price'></input></div>
         <div className='namewrong' id='noprice'>please enter product price</div>
         </div>
         <div className='namewrap'>
         <div className='fdiv'><input autoComplete='off' type='text' placeholder='Product Category' className='email' id='category'></input></div>
         <div className='namewrong' id='nocategory'>please enter product category</div>
         </div>
         <div className='namewrap'>
         <div className='fdiv'><input autoComplete='off' type='text' placeholder='Product Image Link' className='password' id='imglink'></input></div>
         <div className='namewrong' id='noimage'>Please enter product image link</div>
         </div>
         <div className='add' onClick={add}>Add Product</div>
         </div>
         <div className='toast' id='t1'>Product Added Successfully</div>
         </>
         }</>
  )
}

export default AddProduct
