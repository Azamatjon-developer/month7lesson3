import React from 'react'
import {
  AppstoreAddOutlined,
  FormOutlined,
  ProductOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import Logo from '../assets/Images/logo.svg'
import { Link } from 'react-router-dom'
const items = [
  {
    key: 'sub1',
    label: <h2 className="text-[22px]">Products</h2>,
    icon: <ProductOutlined className="scale-[1.5]" />,
    children: [
      {
        key: 'g1',
        type: 'group',
        children: [
          {
            key: '1',
            label: <Link to={'/'}>All Products</Link>,
            icon: <FormOutlined />,
          },
          
        ],
      },
    ],
  },
]
const Navbar = () => {
  const onClick = (e) => {
    console.log('click ', e)
  }
  return (
    <div className="w-full h-[100vh]">
      <div className="h-[15%] bg-[#001529] flex items-center gap-6 pl-5">
        <img src={Logo} alt="logo" width={60} height={60} />
        <h2 className="text-white text-[22px]">Notural Products</h2>
      </div>
      <Menu
        theme="dark"
        onClick={onClick}
        style={{
          width: '100%',
          height: '85%',
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
    </div>
  )
}
export default Navbar
