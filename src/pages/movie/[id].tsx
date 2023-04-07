import { Typography } from 'antd'
import React from 'react'
import { Movie } from 'types/movie'
import { fetchMovieDetails } from 'apis'
import { GetServerSideProps } from 'next'
import { toInteger } from 'lodash'
import Image from 'next/image'

const { Title, Text } = Typography

type Props = {
  movie: Movie
}

const App = ({ movie }: Props) => {
  const { title, poster_path, overview } = movie
  return (
    <div style={{ display: 'flex', marginBottom: '16px' }}>
      <Image
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt={title}
        width={100}
        height={150}
      />
      <div style={{ marginLeft: '16px' }}>
        <Title level={2}>{title}</Title>
        <Text>{overview}</Text>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{
  movie: Movie
}> = async context => {
  const { id } = context.query
  const idNumber = toInteger(id)
  if (isNaN(idNumber))
    return {
      notFound: true,
    }

  const movie = await fetchMovieDetails(idNumber)

  if (!movie) {
    return {
      notFound: true,
    }
  }

  return { props: { movie } }
}
export default App
