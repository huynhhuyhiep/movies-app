import { ConfigProvider, theme } from 'antd'
import { memo, useMemo } from 'react'
import { ConfigProviderProps } from 'antd/es/config-provider'
import { merge } from 'lodash'
import { OverrideToken, SeedToken } from 'antd/es/theme/interface'

export interface ThemeProviderProps extends ConfigProviderProps {}

const { useToken } = theme

export const ThemeProvider = memo((props: ThemeProviderProps) => {
  const { theme, ...rest } = props
  const finalTheme = useMemo(() => {
    return merge(
      {
        token: {
          colorPrimary: '#1182e7',
          colorTextBase: '#253858',
          colorError: '#d92d20',
          colorSuccess: '#00ce7b',
          colorInfo: '#1182e7',
          colorWarning: '#f7b509',
          borderRadius: 4,
          fontSize: 14,
          fontFamily: 'Inter',
        } as SeedToken,
        components: {
          Layout: {
            colorBgHeader: 'white',
          },
        } as OverrideToken,
      },
      theme,
    )
  }, [theme])

  return (
    <>
      {/*/!*Sync current theme with css variable*!/*/}
      {/*<Global*/}
      {/*  styles={css`*/}
      {/*    :root {*/}
      {/*      ${css(*/}
      {/*        Object.keys(finalTheme.token).reduce((obj, key: any) => {*/}
      {/*          // @ts-ignore*/}
      {/*          obj[`--${key}`] = finalTheme.token?.[key]*/}
      {/*          return obj*/}
      {/*        }, {}),*/}
      {/*      )}*/}
      {/*    }*/}

      {/*    // Fix Popover OverrideToken not working*/}
      {/*    .ant-popover-inner {*/}
      {/*      ${tw`!p-[16px]`}*/}
      {/*      .ant-popover-title {*/}
      {/*        ${tw`!text-[18px]`}*/}
      {/*      }*/}
      {/*    }*/}
      {/*  `}*/}
      {/*/>*/}
      <ConfigProvider theme={finalTheme} {...rest} />
    </>
  )
})
