import { LeftOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { useAxios } from '../hook/useAxios'

function SingleProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [singleDate, setSingleDate] = useState({})
  const [isOpenDeleteModal, setIsOpenModal] = useState(false)
  const [modalText, setModalText] = useState("Are you sure you want to delete this product?")
  
  useEffect(() => {
    useAxios()
      .get(`products/${id}`)
      .then((res) => {
        setSingleDate(res.data)
      })
  }, [id])



  const sureDeleteProduct = () => {
    useAxios().delete(`/products/${id}`)
      .then((res) => {
        if(res.status === 200){
          navigate('/')
          
          setIsOpenModal(false)
        }        
      })
      .catch((err) => {
        console.log(err);
        
      })
  }

  return (
    <div className='p-5'>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-[15px]">
          <button type="button" onClick={() => navigate(-1)}>
            <LeftOutlined className="scale-150" />
          </button>
          <h2 className="text-[26px] font-semibold">
            {singleDate?.productName}
          </h2>
        </div>
        <div className='flex space-x-2'>
          <Button
            onClick={() => navigate(`/update/${id}`)}
            className="!bg-[#ec9509e7] hover:opacity-80 active:shadow-2xl"
            type="primary"
            htmlType="submit"
            size="large"
          >
            Update Product
          </Button>
          <Button
            onClick={() => setIsOpenModal(true)}
            className="!bg-red-500 hover:opacity-80 active:shadow-2xl"
            type="primary"
            htmlType="submit"
            size="large"
          >
            Delete Product
          </Button>
        </div>
      </div>

      <ul className='w-[50%] space-y-8 p-5 rounded-lg border-[2px] border-slate-500'>
        <div className='flex flex-col'>
          <span className='text-[18px] text-slate-500'>Product Name</span>
          <strong className='text-[25px] leading-[17px]'>
            {singleDate.productName}
          </strong>
        </div>
        <div className='flex flex-col'>
          <span className='text-[18px] text-slate-500'>Product Price</span>
          <strong className='text-[25px] leading-[17px]'>
            {singleDate.productPrice}
          </strong>
        </div>
        <div className='flex flex-col'>
          <span className='text-[18px] text-slate-500'>Product Type</span>
          <strong className='text-[25px] leading-[17px]'>
            {singleDate.productType == "1" && "Mevalar"}
            {singleDate.productType == "2" && "Sabzavotlar"}
            {singleDate.productType == "3" && "Ziravorlar"}
          </strong>
        </div>
        <div className='flex flex-col'>
          <span className='text-[18px] text-slate-500'>Product Date</span>
          <strong className='text-[25px] leading-[17px]'>
            {singleDate.productData}
          </strong>
        </div>
      </ul>
      
      <Modal
        title="Are you sure delete this product?"
        open={isOpenDeleteModal}
        onOk={sureDeleteProduct}
        onCancel={() => setIsOpenModal(false)}
      >
      </Modal>
    </div>
  )
}

export default SingleProduct
