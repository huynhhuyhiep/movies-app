import { Card, List } from 'antd'
import React, { memo, useState } from 'react'
import { Movie } from 'types/movie'
import Image from 'next/image'
import MovieList, { MovieListProps } from 'components/MovieList'
import { useQuery } from '@tanstack/react-query'
import { fetchNowPlayingMovies } from 'apis'
import { useRouter } from 'next/router'
import { toInteger } from 'lodash'
import { getCurrentPage, getCurrentViewType, setPage } from 'shared/helper'

function NowPlayingMovieList() {
  const router = useRouter()
  const currentPage = getCurrentPage(router)
  const currentViewType = getCurrentViewType(router)
  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery({
      queryKey: ['now-playing', currentPage],
      queryFn: () => fetchNowPlayingMovies(currentPage),
      keepPreviousData: true,
    })

  return (
    <MovieList
      loading={isLoading}
      viewType={currentViewType}
      dataSource={data?.data}
      pagination={{
        ...data?.pagination,
        current: currentPage,
        onChange: page => {
          setPage(router, page)
        },
      }}
    />
  )
}

export default memo(NowPlayingMovieList)
