import React,{useRef,useState,useEffect} from 'react'
import Star from './Star'
import {getProductDetails} from './productAction'
import {useSelector,useDispatch} from 'react-redux'
import { createRoot } from "react-dom/client"
import { useParams} from 'react-router'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import Message from './Message'
import PageNF from './PageNF'
const OldRev = () => {
    const divRef = useRef(null)
    const extraRef = useRef(null)
    const [namer,setNamer] = useState('')
    const [des,setDes] = useState('')
    const [index,setIndex] = useState(-1)
    const [flag,setFlag] = useState(1)
    const [root,setRoot] = useState(null)
    const [loading,setLoading] = useState(true)
    const params= useParams() 
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getProductDetails(params.id))
    },[dispatch])
    const {product,failed} = useSelector((state) => state.product)
    const reviews = product.reviews
    useEffect(()=>{
      if(document.getElementById('message')){
        document.getElementById('message').style.visibility = 'visible'
      }
    },[document.getElementById('message')])
    useEffect(()=>{
      if(reviews && flag){
        if(divRef.current && reviews.length>0){
          createRoot(document.getElementById(divRef.current.id)).render(<Star rating={reviews[index+1].rating}/>)
          setRoot(createRoot(document.getElementById(divRef.current.id)))
          setNamer(reviews[index+1].name)
          setDes(reviews[index+1].comment)
          setIndex(index+1)
          setFlag(0)
        }
      }
    },[reviews])   
    const pre = ()=>{
        document.getElementById('nimg1').style.border = '2px solid red'
        setTimeout(()=>{
          document.getElementById('nimg1').style.border = ''
        },500)
        if(index>0){
          root.render(<Star rating={reviews[index-1].rating}/>)
          setRoot(createRoot(document.getElementById(divRef.current.id)))
          setNamer(reviews[index-1].name)
          setDes(reviews[index-1].comment)
          setIndex(index-1)
        }
    }
    const next = ()=>{
        document.getElementById('nimg2').style.border = '2px solid red'
        setTimeout(()=>{
          document.getElementById('nimg2').style.border = ''
        },500)
        if(index<reviews.length-1){
          root.render(<Star rating={reviews[index+1].rating}/>)
          setRoot(createRoot(document.getElementById(divRef.current.id)))
          setNamer(reviews[index+1].name)
          setDes(reviews[index+1].comment)
          setIndex(index+1)
        }
    }
    setTimeout(()=>{
      setLoading(false)
    },2000) 
  return (
    <>
    {loading ? <Loader/> : (failed ? <PageNF props='Product not found'/> : (!reviews || reviews.length===0 ? <Message message={'No reviews for this product'}/> : <>
    <div className='oldrev'>
        <div className='reviews' id='reviews'>
            <img id='nimg1' onClick={pre} className='nimg1' src='https://cdn0.iconfinder.com/data/icons/mobile-basic-vol-1/32/Arrow_Left-64.png' alt='#'/>
            <div className='userreview'>
              <div className='n1'><Link to={`/product/details/${product._id}?r=${product.rating}`}>
                <img src='https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_640.png' alt='#'/>
              </Link></div>
              <div className='username35' id='username'>{namer}</div>
              <div className='userpoint'>{des}</div>
              <div ref={divRef} className='userrate' id='userrate'></div>
            </div>
            <img id='nimg2' onClick={next} className='nimg2' src='https://cdn0.iconfinder.com/data/icons/mobile-basic-vol-1/32/Arrow_Left-64.png' alt='#'/>
        </div>
    </div></>))}
    </>
  )
}

export default OldRev
