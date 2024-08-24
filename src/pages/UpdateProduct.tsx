import { Button, DatePicker, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import SelectCustom from '../components/SelectCustom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'
import { useAxios } from '../hook/useAxios'
import dayjs from 'dayjs'

function UpdateProduct() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [productName, setProductName] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [productType, setProductType] = useState(null)
  const [productdate, setProductDate] = useState(null)

  const changeDate = (date, dateString) => {
    setProductDate(dateString)
  }
  const handleAddProductSubmit = (e) => {
    e.preventDefault()
    const data = {
      productName,
      productPrice,
      productType,
      productdate,
    }
    useAxios().put(`products/${id}`, data) 
     
      .then((res) => {
        toast.success(id ? 'Product updated' : 'Product added')
        setTimeout(() => {
          navigate('/')
        }, 1000)
      })
      .catch((err) => {
        toast.error('Error')
      })
  }

  useEffect(() => {
    if (id) {
      useAxios()
        .get(`products/${id}`)
        .then((res) => {
          setProductName(res.data.productName || "")
          setProductPrice(res.data.productPrice || "")
          setProductType(res.data.productType)
          setProductDate(res.data.productData)
        })
        .catch((err) => {
          toast.error('Error fetching product data')
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
              <LeftOutlined className="scale-150" />
            </button>
            <h2 className="text-[26px] font-semibold ">
              {id ? 'Update' : 'Add'} Your Product
            </h2>
          </div>
          <Button
            className="!bg-[#ec9509e7] hover:opacity-80 active:shadow-2xl"
            type="primary"
            htmlType="submit"
            size="large"
          >
            {id ? 'Update' : 'Save'} Product
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
            name="productPrice"
            type="number"
          />
          <SelectCustom
            productType={productType}
            setProductType={setProductType}
          />
          <DatePicker
            value={productdate ? dayjs(productdate, 'YYYY-MM-DD') : null}
            className="w-full p-2"
            size="large"
            onChange={changeDate}
            format="YYYY-MM-DD"
          />
        </div>
      </form>
    </>
  )
}

export default UpdateProduct
