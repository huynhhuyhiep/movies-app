import axios from 'axios'
import { API_BASE_URL, API_KEY } from 'shared/constants'
import { MovieApiResponse } from 'types/movie'

const transformResponse = (response: { data: MovieApiResponse }) => {
  const { results, total_results, page } = response.data
  return {
    data: results,
    pagination: {
      page,
      total: total_results,
    },
  }
}

export const fetchNowPlayingMovies = async (page: number) => {
  const response = await axios.get(
    `${API_BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`,
  )
  return transformResponse(response)
}

export const fetchTopRatedMovies = async (page: number) => {
  const response = await axios.get(
    `${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`,
  )
  return transformResponse(response)
}

export const searchMovies = async (query: string, page: number) => {
  const response = await axios.get(
    `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
  )
  return transformResponse(response)
}

export const fetchMovieDetails = async (id: number) => {
  const response = await axios.get(
    `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}`,
  )
  return response.data
}
