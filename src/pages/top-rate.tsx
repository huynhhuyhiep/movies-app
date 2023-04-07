import { Input } from 'antd'
import React from 'react'
import HomeLayout from 'layouts/HomeLayout'
import TopRateMovieList from 'modules/TopRateMovieList'

const App = () => {
  return (
    <HomeLayout>
      <TopRateMovieList />
    </HomeLayout>
  )
}

export default App
