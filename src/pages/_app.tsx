import { AppProps } from 'next/app'
import GlobalStyles from '../styles/GlobalStyles'
import { Layout } from 'antd'
import { ThemeProvider } from 'provider/ThemeProvider'
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const { Header, Content, Footer } = Layout
const queryClient = new QueryClient()

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? (page => page)
  const router = useRouter()

  return (
    <>
      <GlobalStyles />
      <ThemeProvider>
        <Layout>
          <Header tw="shadow-xl">
            <a href={'/'}>Movie App</a>
          </Header>
          <Layout tw="min-h-screen flex justify-center items-center mb-[200px]">
            <Content tw="w-full max-w-[1440px] px-[20px]">
              <QueryClientProvider client={queryClient}>
                {getLayout(<Component {...pageProps} />)}
              </QueryClientProvider>
            </Content>
          </Layout>
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default App
