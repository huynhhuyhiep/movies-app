import { Input } from 'antd'
import React from 'react'
import HomeLayout from 'layouts/HomeLayout'
import TopRateMovieList from 'modules/TopRateMovieList'
import SearchMovieList from 'modules/SearchMovieList'

const { Search } = Input

const App = () => {
  return (
    <HomeLayout>
      <SearchMovieList />
    </HomeLayout>
  )
}

export default App
