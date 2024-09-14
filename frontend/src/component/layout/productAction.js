import axios from "axios"
import { ALL_PRODUCT_FAIL,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_REQUEST,ALL_PRODUCT_DETAILS_FAIL,ALL_PRODUCT_DETAILS_SUCCESS,ALL_PRODUCT_DETAILS_REQUEST} from './const'
const api = axios.create({baseURL :'https://retail-market-app-backend.onrender.com'})
export const getProduct = (searchValue)=> async (dispatch)=>{
    try {
        dispatch({type:ALL_PRODUCT_REQUEST})
        const {data} = await api.get('/api/v1/products')
        dispatch({type:ALL_PRODUCT_SUCCESS,payload:data})
    } catch (error) {
        console.log(error)
        dispatch({type:ALL_PRODUCT_FAIL,payload:error.response.data.message})
    }
}
export const getProductNames = ()=> async (dispatch)=>{
    try {
        const {data} = await api.get('/api/v1/products')
        dispatch({type:'PRODUCT_NAMES',payload:data.map(data=>data.name)})
    } catch (error) {
        console.log(error.message)
    }
}
export const getProductDetails = (productID)=> async (dispatch)=>{
    try {
        dispatch({type:ALL_PRODUCT_DETAILS_REQUEST})
        const {data} = await api.get('/api/v1/admin/products/'+productID)
        setTimeout(() => {
            dispatch({type:ALL_PRODUCT_DETAILS_SUCCESS,payload:data})
        },3000)
    } catch (error) {
        dispatch({type:ALL_PRODUCT_DETAILS_FAIL,payload:error.response.data.message})
    }
}
export const getUserDetails = (userStatus)=> async (dispatch)=>{
    try {
        dispatch({type:ALL_PRODUCT_DETAILS_REQUEST})
        const {data} = await api.get('/api/v1/user/details')
        dispatch({type:'set_user',payload:data.newUser})
    } catch (error) {
        dispatch({type:'user_fail',payload:null})
    }
}
export const addOrder = (orderList)=> (dispatch)=>{
    try {
        dispatch({type:'addorder',payload:orderList})
    } catch (error) {
        dispatch({type:'order_fail',payload:[]})
    }
}
export const orderDet = ()=> async (dispatch)=>{
    try {
        const orderDetails = await api.get('/api/v1/order/details')
        dispatch({type:'order_details',payload:orderDetails.data.newOrder})
    } catch (error) {
        dispatch({type:'order_details',payload:[]})
    }
}
export const adminOrderDet = ()=> async (dispatch)=>{
    try {
        const orderDetails = await api.get('/api/v1/order/admin/details/all')
        dispatch({type:'admin_order_details',payload:orderDetails.data.newOrder})
    } catch (error) {
        dispatch({type:'order_details',payload:[]})
    }
}
export const getAllUser = ()=> async (dispatch)=>{
    try {
        const allUser = await api.get('/api/v1/user/admin/all')
        dispatch({type:'admin_all_users',payload:allUser.data.users})
    } catch (error) {
        dispatch({type:'admin_all_users_fail',payload:[]})
    }
}

