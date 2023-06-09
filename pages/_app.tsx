import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useCallback } from 'react'
import { AuthContextProvider } from '@/utils/context/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  const getComponentWithProvider = useCallback(() => {
    const Provider = (Component as any).PROVIDER

    return Provider ? (
      <Provider>
        <Component {...pageProps} />
      </Provider>
    ) : (
      <Component {...pageProps} />
    )
  }, [Component])
  
  return (
    <AuthContextProvider>
      {getComponentWithProvider()}
    </AuthContextProvider>
  )

}
