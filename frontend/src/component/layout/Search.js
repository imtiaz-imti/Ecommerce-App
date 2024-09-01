import React,{useEffect,useState,useRef} from 'react'
import { createRoot } from "react-dom/client";
import Searchtext from './Searchtext.js'
import {getProduct,getProductNames} from './productAction'
import Loader from './Loader'
import Newproele from './Newproele'
import {useSelector,useDispatch, Provider} from 'react-redux'
import { ALL_PRODUCT_FAIL } from './const.js'
import store from '../../store.js'
import Message from './Message.js'
import MetaData from './MetaData'
const Search = () => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [index,setIndex] = useState(-1)
  const [compoLoading,setcompoLoading] = useState(true)
  const divRef = useRef(null)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getProductNames())
    dispatch({type:ALL_PRODUCT_FAIL,payload:null})
  },[dispatch])
  const names = useSelector((state) => state.productNames.names)
  const [inputValue, setInputValue] = useState('')
  const [root, setRoot] = useState(null)
  const [ele, setEle] = useState(null)
  const rootSet = ()=>{
     setSelectedItem(document.getElementById('searchinput'))
     if(!root){
      setRoot(createRoot(document.getElementById('searchoption')))
     }
  }
  const handleChange = (event) =>{
    const childNodes = divRef.current.childNodes
    if(index>-1){childNodes[index].style.backgroundColor = ''}
    setIndex(-1)
    if(event.target.value){
      let i = 0
      let k = 0
      const nameComponent = []
      names.forEach(name => {
        if(i>=7){return}
        else if(name.substring(0,event.target.value.length).toLowerCase() === event.target.value.toLowerCase()){
          nameComponent.push(<Provider store={store}><Searchtext searchValue={{name,setInputValue,i,setIndex,divRef}}/></Provider>)
          k++
          i++
        }
      })
      if(k){
        document.getElementById('searchoption').style.visibility = 'visible'
        root.render(nameComponent.map((ele)=> ele))
        dispatch({type:'make_null',payload:divRef.current.id})
      }
      else{
        document.getElementById('searchoption').style.visibility = 'hidden'
        dispatch({type:'make_null',payload:null})
      }
    }
    else{
      document.getElementById('searchoption').style.visibility = 'hidden'
      dispatch({type:'make_null',payload:null})
    }
    setInputValue(event.target.value)
  }
  const getInput = (event)=>{
    if(event.key === 'Enter'){
      const searchValue = document.getElementById('searchinput').value
      dispatch(getProduct(searchValue))
      document.getElementById('searchoption').style.visibility = 'hidden'
      dispatch({type:'make_null',payload:null})
      const childNodes = divRef.current.childNodes
      if(index>-1){childNodes[index].style.backgroundColor = ''}
      setIndex(-1)
    }
    else if(event.key === 'ArrowDown'){
      if(selectedItem === document.getElementById('searchinput') && document.getElementById('searchoption').style.visibility === 'visible'){
        const childNodes = divRef.current.childNodes
        if(index === childNodes.length-1){
          childNodes[index].style.backgroundColor = ''
          setInputValue(childNodes[0].childNodes[1].innerHTML)
          childNodes[0].style.backgroundColor = 'rgb(226, 218, 218)'
          setIndex(0)
        }
        else{
          if(index>-1){childNodes[index].style.backgroundColor = ''}
          setInputValue(childNodes[index+1].childNodes[1].innerHTML)
          childNodes[index+1].style.backgroundColor = 'rgb(226, 218, 218)'
          setIndex(index+1)
        }
      }
    }
    else if(event.key === 'ArrowUp'){
      event.preventDefault()
      if(selectedItem === document.getElementById('searchinput') && document.getElementById('searchoption').style.visibility === 'visible'){
        const childNodes = divRef.current.childNodes
        if(index === 0){
          childNodes[index].style.backgroundColor = ''
          setInputValue(childNodes[childNodes.length-1].childNodes[1].innerHTML)
          childNodes[childNodes.length-1].style.backgroundColor = 'rgb(226, 218, 218)'
          setIndex(childNodes.length-1)
        }
        else if(index>0){
          childNodes[index].style.backgroundColor = ''
          setInputValue(childNodes[index-1].childNodes[1].innerHTML)
          childNodes[index-1].style.backgroundColor = 'rgb(226, 218, 218)'
          setIndex(index-1)
        }
      }
    }
  }
  const {products,loading} = useSelector((state) => state.products)
  useEffect(()=>{
    if(!products && document.getElementById('message') && !loading){
      document.getElementById('message').style.visibility = 'visible'
    }
    else if(products.length === 0 && document.getElementById('message') && !loading){
      document.getElementById('message').style.visibility = 'visible'
    }
    else if(document.getElementById('message') && loading){
      document.getElementById('message').style.visibility = 'hidden'
    }
    setEle(products)
  },[products])
  const apply1 = ()=>{
    if(products && products.length>0){
      const a = document.getElementById('start1').value
      const b = document.getElementById('end1').value
      if(a && b){
        const pro = []
        ele.forEach((prod)=>{
          if(prod.price>=a && prod.price<=b){
            pro.push(prod)
          }
        })
        setEle(pro)
      }
      else if(a){
        const pro = []
        ele.forEach((prod)=>{
          if(prod.price>=a){
            pro.push(prod)
          }
        })
        setEle(pro)
      }
      else if(b){
        const pro = []
        ele.forEach((prod)=>{
          if(prod.price<=b){
            pro.push(prod)
          }
        })
        setEle(pro)
      }
    }
  }
  const apply2 = ()=>{
    if(products && products.length>0){
      const c = document.getElementById('start2').value
      const d = document.getElementById('end2').value
      if(c && d){
        const pro = []
        ele.forEach((prod)=>{
          if(prod.rating>=c && prod.rating<=d){
            pro.push(prod)
          }
        })
        setEle(pro)
      }
      else if(c){
        const pro = []
        ele.forEach((prod)=>{
          if(prod.rating>=c){
            pro.push(prod)
          }
        })
        setEle(pro)
      }
      else if(d){
        const pro = []
        ele.forEach((prod)=>{
          if(prod.rating<=d){
            pro.push(prod)
          }
        })
        setEle(pro)
      }
    }
  }
  setTimeout(()=>{
    setcompoLoading(false)
  },2000)
  const hide = (event)=>{
    if(event.target.id !== 'searchinput' && event.target.id !== 'searchoption'){
      document.getElementById('searchoption').style.visibility = 'hidden'
      dispatch({type:'make_null',payload:null})
    }
  }
  return (
    <div className='searchele' onClick={hide}>
        {compoLoading ? <Loader/> : <>
        <MetaData title='Search Page'/>
        <Message message={'Sorry, No Products Found'}/>
        <div className='searchbox'>
          <img src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-search-64.png' alt='#'/>
          <input autoComplete="off" onSelect={rootSet} value={inputValue} onChange={handleChange} onKeyDown={getInput} type="text" className="searchinput" placeholder='Search Product' id='searchinput'/>  
        </div>
        <div ref={divRef} className='searchoption' id='searchoption'></div>
        <div className='allproducts'>{loading ? <Loader/> : ele && ele.map(product=><Newproele product={product}/>)}</div>
        <div className='starShort'>
          <div className='startrange'>
            <input type='number' placeholder='Start rating' id='start2'/> 
          </div>
          <div className='startrange'>
            <input type='number' placeholder='End rating' id='end2'/> 
          </div>
          <div className='applyvalue' onClick={apply2}>Apply</div>
        </div>
        <div className='priceShort'>
          <div className='startrange'>
            <input type='number' placeholder='Start price' id='start1'/> 
          </div>
          <div className='startrange'>
            <input type='number' placeholder='End price' id='end1'/> 
          </div>
          <div className='applyvalue' onClick={apply1}>Apply</div>
        </div>  
        </>}
    </div>

  )
}
export default Search
