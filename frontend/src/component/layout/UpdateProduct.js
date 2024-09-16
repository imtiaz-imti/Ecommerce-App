import React,{useEffect,useRef}from 'react'
import Loader from './Loader'
import {getProduct} from './productAction'
import {useSelector,useDispatch} from 'react-redux'
import axios from "axios"
const UpdateProduct = ({props}) =>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getProduct(''))
      },[dispatch])
    const {products} = useSelector((state) => state.products)
    const divRef = useRef(null)
    useEffect(()=>{
       if(!props.updateCompoLoading && divRef && props.updateCount){
        document.getElementById(divRef.current.id).style.visibility = 'visible'
       }
    },[props.updateCompoLoading,props.updateCount])
    const closeDetails = ()=>{
        document.getElementById('enterproduct2').style.visibility = 'hidden'
        document.getElementById(props.add.current.id).style.visibility = 'visible'
        document.getElementById(props.update.current.id).style.visibility = 'visible'
        document.getElementById(props.remove.current.id).style.visibility = 'visible'
        document.getElementById(props.orderList.current.id).style.visibility = 'visible'
        document.getElementById(props.userList.current.id).style.visibility = 'visible'
        document.getElementById('noname').style.visibility = 'hidden'
        document.getElementById('noname1').style.visibility = 'hidden'
        document.getElementById('nodescription').style.visibility = 'hidden'
        document.getElementById('noprice').style.visibility = 'hidden'
        document.getElementById('nocategory').style.visibility = 'hidden'
        document.getElementById('noimage').style.visibility = 'hidden'
        props.setUpdateCount(0)  
    }
    const update = async ()=>{
      let name = document.getElementById('name2').value
      let description = document.getElementById('des2').value
      let price = document.getElementById('price2').value
      let category = document.getElementById('category2').value
      const images = {
          public_id:'sample',
          url:document.getElementById('imglink2').value
      }
      if(!name){
        document.getElementById('noname1').style.visibility = 'visible'
        return
      }
      const pro = products.find(pro=>pro.name.toLowerCase()===name.toLowerCase())
      if(!pro){
        document.getElementById('noname1').style.visibility = 'visible'
        return
      }
      if(!name){name = pro.name}
      if(!description){description = pro.description}
      if(!price){price = pro.price}
      if(!category){category = pro.category}
      if(images.url){
         const newArrayOfImages = [...pro.images,images]
         var newImage = newArrayOfImages
      }
      else{
         newImage = pro.images
      }  
      try {
        const body = {name,description,price,category,stock:1,images:newImage}
        const api = axios.create({baseURL :'https://retail-market-app-backend.onrender.com'})  
        await api.put('api/v1/admin/products/'+pro._id,body)
        document.getElementById('t2').style.visibility = 'visible'
        // window.location.reload()
      } catch (error) {}
    }   
  return (
    <>
    {props.updateCompoLoading?<Loader/>:<>
        <div ref={divRef} className='enterproduct' id='enterproduct2'>
        <img src='https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_640.png' alt='#' onClick={closeDetails}/>         
         <div className='namewrap'>
         <div className='fdiv'><input autoComplete='off' type='text' placeholder='Product Name' className='name' id='name2'></input>
         </div>
         <div className='namewrong' id='noname1'>Please enter valid product name</div>
         </div>
         <div className='namewrap'>
         <div className='fdiv'><input autoComplete='off' type='text' placeholder='Product Description' className='email' id='des2'></input></div>
         </div>
         <div className='namewrap'>
         <div className='fdiv'><input autoComplete='off' type='number' placeholder='Product Price$' className='email' id='price2'></input></div>
         </div>
         <div className='namewrap'>
         <div className='fdiv'><input autoComplete='off' type='text' placeholder='Product Category' className='email' id='category2'></input></div>
         </div>
         <div className='namewrap'>
         <div className='fdiv'><input autoComplete='off' type='text' placeholder='Product Image Link' className='password' id='imglink2'></input></div>
         </div>
         <div className='add' onClick={update}>Update Product</div>
         </div>
         <div className='toast' id='t2'>Product Updated Successfully</div>
         </>}</>
  )
}

export default UpdateProduct
