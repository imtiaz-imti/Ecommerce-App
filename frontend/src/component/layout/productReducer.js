import { ALL_PRODUCT_FAIL,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_REQUEST,CLEAR_ERRORS,ALL_PRODUCT_DETAILS_FAIL,ALL_PRODUCT_DETAILS_SUCCESS,ALL_PRODUCT_DETAILS_REQUEST} from './const'
import {createReducer} from '@reduxjs/toolkit'
const productReducerInitialState = {
    loading:false,
    ref:null,
    products:[],
}
const productDetailsReducerInitialState = {
  loading:false,
  product:{},
  failed:false
}
const productNamesInitialState = {
  names:[]
}
const userDetailsInitialState = {
  userDetails:null,
  loginFailed:false
}
const addOrderInitialState = {
  orders:[],
  addQuantity:{},
  orderDetails:[],
  adminOrderDetails:[]
}
const allUserInitialState = {
  allUser:[]
}
export const productReducer = createReducer(productReducerInitialState, (builder) => {
    builder
      .addCase(ALL_PRODUCT_FAIL, (state, action) => {
        state.loading = false
        state.ref = action.payload
        state.products = []
      })
      .addCase(ALL_PRODUCT_SUCCESS, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(ALL_PRODUCT_REQUEST, (state, action) => {
         state.loading = true
         state.products = []
      })
      .addCase(CLEAR_ERRORS, (state, action) => {
         state.loading = true
         state.products = []
      })
      .addCase('make_null', (state, action) => {
        state.ref = action.payload
     })
  })
  export const productDetailsReducer = createReducer(productDetailsReducerInitialState, (builder) => {
    builder
      .addCase(ALL_PRODUCT_DETAILS_FAIL, (state, action) => {
        state.loading = true
        state.product = {}
        state.failed = true
      })
      .addCase(ALL_PRODUCT_DETAILS_SUCCESS, (state, action) => {
        state.loading = false
        state.product = action.payload.data
        state.failed = false
      })
      .addCase(ALL_PRODUCT_DETAILS_REQUEST, (state, action) => {
         state.loading = true
         state.product = {}
      })
      .addCase(CLEAR_ERRORS, (state, action) => {
         state.loading = true
         state.product = {}
      })
  })
  export const productNamesReducer = createReducer(productNamesInitialState, (builder) => {
    builder
      .addCase('PRODUCT_NAMES', (state, action) => {
        state.names = action.payload
      })
  })
  export const userDetailsReducer = createReducer(userDetailsInitialState, (builder) => {
    builder
      .addCase('set_user', (state, action) => {
        if(state.userDetails !== 'logout'){
          state.userDetails = action.payload
          state.loginFailed = false  
        }
        else{
          state.userDetails = 'logout'
          state.loginFailed = false  
        }
      })
      .addCase('user_fail', (state, action) => {
        state.userDetails = action.payload
        state.loginFailed = true
      })
  }) 
  export const addOrderReducer = createReducer(addOrderInitialState, (builder) => {
    builder
      .addCase('addorder', (state, action) => {
        state.orders = action.payload
      })
      .addCase('addquantity', (state, action) => {
        state.addQuantity[action.payload[0]] = action.payload[1]
      })
      .addCase('order_fail', (state, action) => {
        state.orders = action.payload
      })
      .addCase('order_details', (state, action) => {
        state.orderDetails = action.payload
      })
      .addCase('admin_order_details', (state, action) => {
        state.adminOrderDetails = action.payload
      })
  }) 
  export const allUserReducer = createReducer(allUserInitialState, (builder) => {
    builder
      .addCase('admin_all_users', (state, action) => {
        state.allUser = action.payload
      })
      .addCase('admin_all_users_fail', (state, action) => {
        state.allUser = action.payload
      })
  }) 
