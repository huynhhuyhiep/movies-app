import React, { memo } from 'react'
import MovieList from 'components/MovieList'
import { useQuery } from '@tanstack/react-query'
import { fetchTopRatedMovies, searchMovies } from 'apis'
import { useRouter } from 'next/router'
import { toInteger } from 'lodash'
import {
  getCurrentPage,
  getCurrentViewType,
  getSearchQuery,
  setPage,
} from 'shared/helper'

function NowPlayingMovieList() {
  const router = useRouter()
  const currentPage = getCurrentPage(router)
  const currentQuery = getSearchQuery(router)
  const currentViewType = getCurrentViewType(router)

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery({
      queryKey: ['search', currentQuery],
      queryFn: () => searchMovies(currentQuery, currentPage),
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
