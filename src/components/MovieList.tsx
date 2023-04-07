import { Card, List, ListProps } from 'antd'
import React, { memo } from 'react'
import { Movie } from 'types/movie'
import Image from 'next/image'
import { ViewType } from 'types/layout'
import Link from 'next/link'

export interface MovieListProps extends ListProps<Movie> {
  viewType: ViewType
}

function MovieList(props: MovieListProps) {
  const { viewType, ...rest } = props
  return (
    <List<Movie>
      itemLayout="vertical"
      grid={viewType === 'grid' ? { column: 5 } : undefined}
      size="large"
      renderItem={item => {
        const { id, title, overview, poster_path, release_date } = item
        return (
          <Link href={`/movie/${id}`}>
            <List.Item key={id}>
              {viewType === 'list' ? (
                <List.Item.Meta
                  avatar={
                    <Image
                      src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                      alt={title}
                      width={100}
                      height={150}
                    />
                  }
                  title={title}
                  description={overview}
                />
              ) : (
                <Card
                  cover={
                    <Image
                      src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                      alt={title}
                      width={100}
                      height={150}
                    />
                  }
                >
                  <Card.Meta title={title} description={overview} />
                </Card>
              )}
            </List.Item>
          </Link>
        )
      }}
      {...rest}
    />
  )
}

export default memo(MovieList)
