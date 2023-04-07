import { NextRouter } from 'next/router'
import { ViewType } from 'types/layout'

export const getCurrentViewType = (router: NextRouter) => {
  return (router.query?.view_type || 'list') as ViewType
}

export const setViewType = (router: NextRouter, value: ViewType) => {
  router.replace({ query: { ...router.query, view_type: value } })
}

export const getCurrentPage = (router: NextRouter) => {
  return +(router.query?.page || 1)
}

export const setPage = (router: NextRouter, value: number) => {
  router.push({ query: { ...router.query, page: value } })
}

export const getSearchQuery = (router: NextRouter) => {
  return router.query?.query as string
}

export const setSearchQuery = (router: NextRouter, value: string) => {
  router.push({
    query: { ...router.query, query: value, page: undefined },
    pathname: '/search',
  })
}
