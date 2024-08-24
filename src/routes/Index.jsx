import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import AddProduct from '../pages/AddProduct'
import SingleProduct from '../pages/SingleProduct'
import Navbar from '../components/Navbar'
import UpdateProduct from '../pages/UpdateProduct'
function Index() {
  return (
    <div className='flex'>
      <div className="w-[20%]">
        <Navbar />
      </div>
      <div className="w-[80%]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/:id" element={<SingleProduct />} />
          
        </Routes>
      </div>
    </div>
  )
}

export default Index
