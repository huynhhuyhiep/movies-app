import { Input, Segmented } from 'antd'
import React, { memo, ReactNode } from 'react'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import {
  getCurrentViewType,
  getSearchQuery,
  setSearchQuery,
  setViewType,
} from 'shared/helper'
import { ViewType } from 'types/layout'

const { Search } = Input

const HomeLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const currentViewType = getCurrentViewType(router)
  const currentQuery = getSearchQuery(router)

  const onSearch = (value: string) => {
    if (!!value.trim()) setSearchQuery(router, value.trim())
  }

  return (
    <div className="w-full flex flex-col space-y-[20px]">
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        enterButton
        defaultValue={currentQuery}
      />

      <div className="flex justify-between items-center w-full">
        <Segmented
          options={[
            { value: '/now-playing', label: 'Now Playing' },
            { value: '/top-rate', label: 'Top Rate' },
          ]}
          defaultValue={router.pathname}
          onChange={value => {
            router.push({
              pathname: value as string,
              query: { ...router.query, page: undefined, query: undefined },
            })
          }}
        />
        <Segmented
          defaultValue={currentViewType}
          onChange={value => {
            setViewType(router, value as ViewType)
          }}
          options={[
            {
              value: 'list',
              icon: <BarsOutlined />,
            },
            {
              value: 'grid',
              icon: <AppstoreOutlined />,
            },
          ]}
        />
      </div>

      {children}
    </div>
  )
}

export default memo(HomeLayout)
