import {configureStore} from '@reduxjs/toolkit'
import { productReducer,productDetailsReducer,productNamesReducer,userDetailsReducer, addOrderReducer, allUserReducer } from './component/layout/productReducer'
const store = configureStore({
    reducer:{
        products:productReducer,
        product:productDetailsReducer,
        productNames:productNamesReducer,
        userDetails:userDetailsReducer,
        addOrder:addOrderReducer,
        allUser:allUserReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
})
export default store
