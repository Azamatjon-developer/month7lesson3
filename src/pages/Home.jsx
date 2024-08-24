import React, { useEffect, useState } from 'react'
import TableCustom from '../components/TableCustom'
import axios from 'axios'
import { data } from 'autoprefixer'
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons'
import toast, { Toaster } from 'react-hot-toast'
import { Button, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [products, setproducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [reflesh, setReflesh] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:3000/products').then((res) => {
      res.data.map((item, index) => {
        switch (item.productType) {
          case '1':
            item.productType = 'Mevalar'
            break
          case '2':
            item.productType = 'Sabzavotlar'
            break
          case '3':
            item.productType = 'Ziravorlar'
            break
        }
        item.key = Math.random()
        item.ID = index + 1
        item.action = (
          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/update/${item.id}`)}
              className="w-[32px] text-[20px] h-[32px] border=[1px] border-green-600 rounded-full hover:text-green-500 bg-green-500 hover:bg-transparent text-white"
            >
              {' '}
              <EditOutlined className="hover:scale-100 duration-300" />{' '}
            </button>
            <button
              onClick={() => handleDeleteProduct(item.id)}
              className="w-[32px] text-[20px] h-[32px] border=[1px] border-slate-600 rounded-full hover:text-red-500 hover:bg-transparent bg-red-500  text-white"
            >
              {' '}
              <DeleteOutlined className="hover:scale-100 duration-300" />{' '}
            </button>
            <button
              onClick={() => navigate(item.id)}
              className="w-[32px] text-[20px] h-[32px] border=[1px] border-slate-600 rounded-full hover:text-blue-500 hover:bg-transparent bg-blue-500  text-white"
            >
              {' '}
              <MoreOutlined className="hover:scale-100 duration-300" />{' '}
            </button>
          </div>
        )
      })
      setproducts(res.data)
      setIsLoading(false)
    })
  }, [reflesh])

  function handleDeleteProduct(id) {
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then((res) => {
        setIsLoading(true)
        setTimeout(() => {
          setReflesh(!reflesh)
          toast.success(' Succsessefuly product deleted')
        }, 800)
      })
      .catch(() => toast.error('You have some error'))
  }


  function handleSearchProduct (e) {
    const value = e.target.value.toLowerCase()
    const filteredProduct = products.filter(item => item.productName.toLowerCase().includes(value))
    setIsLoading(true)
    if (value) {
      setTimeout(() => {
        setproducts(filteredProduct)
        setIsLoading(false)
      },800)
    }else{
      setTimeout(() => {
        setReflesh(!reflesh)
        setIsLoading(false)
      },800)
    }
  }

  return (
    <div className="p-5 h-screen overflow-y-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[25px] font-bold font-sans">Your Products </h2>
          <p className="text-[18px] text-slate-500 font-semibold">
            {' '}
            Products ({products.length})
          </p>
        </div>

        <Button
          onClick={() => navigate('/add-product')}
          className="!bg-[#ec9509e7] hover:opacity-80 active:shadow-2xl"
          type="primary"
          htmlType="submit"
          size="large"
        >
          {' '}
          Add product
        </Button>
      </div>
      <div className='mt-5'>
        <h2 className='text-[25px] font-semibold'>Search product</h2>
        <Input onChange={handleSearchProduct} className='p-2 mt-4 w-[400px]' size='large' allowClear placeholder="search product by name" />
      </div>
      <div className="mt-5">
        <TableCustom isLoading={isLoading} products={products} />
      </div>
    </div>
  )
}

export default Home
