import React from 'react'
import {useDispatch} from 'react-redux'
import {getProduct} from './productAction'
const Searchtext = ({searchValue}) => {
    const dispatch = useDispatch()
    const getInputEle = ()=>{
    searchValue.setInputValue(searchValue.name)    
    dispatch(getProduct(searchValue.name))
    document.getElementById('searchoption').style.visibility = 'hidden'
  }
  const onHover = ()=>{
    const childNodes = searchValue.divRef.current.childNodes
    for(let i=0;i<7;i++){
      if(childNodes[i] && i!==searchValue.i){
        childNodes[i].style.backgroundColor = ''
      }
    }
    searchValue.setInputValue(childNodes[searchValue.i].childNodes[1].innerHTML)
    childNodes[searchValue.i].style.backgroundColor = 'rgb(226, 218, 218)'
    searchValue.setIndex(searchValue.i)
  }
  return (
    <div onMouseOver={onHover} onClick={getInputEle} className='allsearch'>
       <img src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-search-64.png' alt='#'/>
       <div className='searchtext'>{searchValue.name}</div>
    </div>
  )
}

export default Searchtext
