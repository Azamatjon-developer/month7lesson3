import React from 'react'
import { Table } from 'antd'

const columns = [
  {
    title: 'ID',
    dataIndex: 'ID',
  },
  {
    title: 'Product Name',
    dataIndex: 'productName',
  },
  {
    title: 'Produst price',
    dataIndex: 'productPrice',
  },
  {
    title: 'Produst Type',
    dataIndex: 'productType',
  },
  {
    title: 'Produst date',
    dataIndex: 'productdate',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
]

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra)
}
const TableCustom = ({ products, isLoading }) => {
  return (
    <Table
      loading={isLoading}
      columns={columns}
      dataSource={products}
      onChange={onChange}
      showSorterTooltip={{
        target: 'sorter-icon',
      }}
    />
  )
}
export default TableCustom
