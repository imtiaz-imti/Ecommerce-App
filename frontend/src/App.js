// to install somthing use --legacy-peer-deps at the end
import './App.css'
import Header from './component/layout/Header.js'
import Search from './component/layout/Search.js'
import Home from './component/layout/Home.js'
import Newproduct from './component/layout/Newproduct.js'
import ProductDetails from './component/layout/ProductDetails.js'
import Signin from './component/layout/Signin.js'
import Signup from './component/layout/Signup.js'
import UserDetails from './component/layout/UserDetails.js'
import Admin from './component/layout/Admin.js'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import MakeOrder from './component/layout/MakeOrder.js'
import PreviousOrder from './component/layout/PreviousOrder.js'
import AdminOrderList from './component/layout/AdminOrderList.js'
import AdminUserList from './component/layout/AdminUserList.js'
import OldRev from './component/layout/OldRev.js'
import AddRev from './component/layout/AddRev.js'
import PageNF from './component/layout/PageNF.js'
function App() { 
  return (
    <Router>
      <Header/>
      <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/product" element={<Newproduct/>} />
         <Route path="/search" element={<Search/>} />
         <Route path="/product/details/:id" element={<ProductDetails/>} />
         <Route path="/product/details/:id/reviews" element={<OldRev/>} />
         <Route path="/product/details/:id/add/review" element={<AddRev/>} />
         <Route path="/signin" element={<Signin/>} />
         <Route path="/signup" element={<Signup/>} />
         <Route path="/profile" element={<UserDetails/>} />
         <Route path="/admin" element={<Admin/>} />
         <Route path="/profile/make_order" element={<MakeOrder/>} />
         <Route path="/profile/previous_order" element={<PreviousOrder/>} />
         <Route path="/admin/order/list" element={<AdminOrderList/>} />
         <Route path="/admin/user/list" element={<AdminUserList/>} />
         <Route path="*" element={<PageNF props='Page not found'/>} />
      </Routes>
    </Router>
  )
}
export default App
