import React from 'react'
import { Select } from 'antd'
      const SelectCustom = ({setProductType , productType}) => {
    function handleCHange (id,obj) {
        setProductType(id)
    }

  return (
    <Select
      value={productType}
      className="w-full"
      showSearch
      allowClear
      onChange={handleCHange}
      size="large"
      placeholder="Select a fruit"
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={[
        {
          value: '1',
          label: 'Mevalar',
        },
        {
          value: '2',
          label: 'Sabzavorlar',
        },
        {
          value: '3',
          label: 'Ziravorlar',
        },
      ]}
    />
  )
}
export default SelectCustom
