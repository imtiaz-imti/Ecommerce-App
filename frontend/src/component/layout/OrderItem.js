import React,{useState}from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {addOrder} from './productAction'
const OrderItem = ({order}) => {
  const orders = useSelector((state) => state.addOrder.orders)
  const addQuantity = useSelector((state) => state.addOrder.addQuantity)
  const [inputValue,setInputValue] = useState(addQuantity[order.productID]?addQuantity[order.productID]:1)
  const dispatch = useDispatch()
  const deleteItem = ()=>{
     let newOrderItem = []
     orders.forEach(element => {
        if(element.productID!==order.productID){
          newOrderItem.push(element)
        }
     })
     dispatch(addOrder(newOrderItem))
     dispatch({type:'addquantity',payload:[order.productID,0]})
  }
  let orderName = ''
  let c = 0
  for(let i=0;i<order.name.length;i++){
    orderName+=order.name[i]
    c+=1
    if(c===14){
      orderName+='...'
      break
    }
  } 
  const up = ()=>{
    setInputValue(inputValue+1)
    dispatch({type:'addquantity',payload:[order.productID,inputValue+1]})
  }
  const down = ()=>{
    if(inputValue>1){
      setInputValue(inputValue-1)
      dispatch({type:'addquantity',payload:[order.productID,inputValue-1]})
    }
  }
  return (
    <div className='everyitem'>
      <img className='everyitemimg1' src={order.image} alt='#'/>
      <div className='everyitemname'>{orderName}</div>
      <div className='everyitemprice'>{order.price}$</div>
      <div className='quan'>
      <input autoComplete='off' type='text' className='email' value={inputValue} id='quantity'></input>
      <div className='arrowimg'>
        <img onClick={up} className='uparrow' src='https://cdn0.iconfinder.com/data/icons/arrows-9/100/7-64.png' alt='#'/>
        <img onClick={down} className='downarrow' src='https://cdn0.iconfinder.com/data/icons/arrows-9/100/7-64.png' alt='#'/> 
      </div>
      </div>
      <img onClick={deleteItem} className='everyitemimg2' src='https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_delete-64.png' alt='#'/>
    </div>
  )
}

export default OrderItem
