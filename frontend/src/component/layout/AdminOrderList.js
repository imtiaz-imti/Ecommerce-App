import React,{useEffect,useState}from 'react'
import OrderList from './OrderList'
import {useSelector,useDispatch} from 'react-redux'
import { adminOrderDet,getUserDetails } from './productAction'
import Loader from './Loader'
import PageNF from './PageNF'
const AdminOrderList = () => {
    const [compoLoading,setCompoLoading] = useState(true)
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(getUserDetails())
      dispatch(adminOrderDet())
    },[dispatch])
    const {userDetails,loginFailed} = useSelector((state) => state.userDetails)
    const orderDetails = useSelector((state) => state.addOrder.adminOrderDetails)
    setTimeout(()=>{
      setCompoLoading(false) 
    },2000)
    return (
      <>
      {compoLoading ? <Loader/> : (loginFailed ? <PageNF props='Please log in to access'/> : (userDetails && userDetails.role === 'user' ? <PageNF props="Can't access this page"/> :
      <div className='prevorder'>{orderDetails.map(orderDet=><OrderList orderDet={orderDet}/>)}</div>))}
      </>
    )
}

export default AdminOrderList
