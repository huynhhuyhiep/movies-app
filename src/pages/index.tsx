import React from 'react'
import NowPlayingMovieList from 'modules/NowPlayingMovieList'
import HomeLayout from 'layouts/HomeLayout'

const App = () => {
  return (
    <HomeLayout>
      <NowPlayingMovieList />
    </HomeLayout>
  )
}

export default App
