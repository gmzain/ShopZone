import React from 'react'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Category from './pages/Category'
import ProDetail from './pages/ProDetail'
import Order from './pages/Order'
import {Toaster} from 'react-hot-toast'
import Cart from './pages/Cart'
import Footer from './component/Footer'

  
  const App = () => {
    return (
      <>
        <Router>
          <Routes>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/category/:category' element={<Category/>}/>
            <Route path='/product-detail/:id' element={<ProDetail/>}/>
            <Route path='/order/:id' element={<Order/>}/>
            <Route path='/cart' element={<Cart/>}/>
          </Routes>
          <Footer/>
          <Toaster/>
        </Router>
      </>
    )
  }
  
  export default App
  