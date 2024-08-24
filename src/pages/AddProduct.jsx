import { Button, DatePicker, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import SelectCustom from '../components/SelectCustom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'
import { useAxios } from '../hook/useAxios'
import dayjs from 'dayjs'

function AddProduct() {
  const navigate = useNavigate()
  const [productName, setProductName] = useState(null)
  const [productPrice, setProductPrice] = useState(null)
  const [productType, setProductType] = useState(null)
  const [productdate, setProductDate] = useState(null)
  const { id } = useParams()



  const changeDate = (date, dateString) => {
    setProductDate(date, dateString)
  }

  function handleAddProductSubmit(e) {
    e.preventDefault()
    const data = {
      productName,
      productPrice,
      productType,
      productdate,
    }
    setTimeout(() => {
      navigate('/')
    }, 1000)

    axios
      .post('http://localhost:3000/products', data)
      .then((res) => {
        toast.success('Your product added')
      })
      .catch((err) => {
        toast.error('Error')
      })
  }

  // Update part starts
  const dateFormat = 'YYYY-MM-DD'
  useEffect(() => {
    if (id) {
      useAxios()
        .get(`products/${id}`)
        .then((res) => {
          setProductName(res.data.productName)
          setProductPrice(res.data.productPrice)
          setProductType(res.data.productType)
          setProductDate(res.data.productData)
        })
    }
  }, [id])


  return (
    <>
      <form onSubmit={handleAddProductSubmit}>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-[15px]">
            <button type="button" onClick={() => navigate(-1)}>
              {' '}
              <LeftOutlined className="scale-150" />{' '}
            </button>
            <h2 className="text-[26px] font-semibold ">
              {' '}
              {id ? 'Update' : 'Add'} Your Product{' '}
            </h2>
          </div>
          <Button
            className="!bg-[#ec9509e7] hover:opacity-80 active:shadow-2xl"
            type="primary"
            htmlType="submit"
            size="large"
          >
            {' '}
            {id ? 'Update' : 'Save'}
            Product
          </Button>
        </div>
        <div className="w-[450px] p-5 space-y-4">
          <Input
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            size="large"
            allowClear
            className="p-2"
            placeholder="Enter your product name"
            name="productName"
            type="text"
          />
          <Input
            required
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            size="large"
            allowClear
            className="p-2"
            placeholder="Enter your product price"
            name="productName"
            type="number"
          />
          <SelectCustom
            productType={productType}
            setProductType={setProductType}
          />
          <DatePicker
            value={dayjs(productdate, dateFormat)}
            className="w-full p-2"
            size="large"
            onChange={changeDate}
            picker="week"
          />
        </div>
      </form>
    </>
  )
}

export default AddProduct
