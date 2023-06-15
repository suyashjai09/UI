import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useCallback } from 'react'
import { AuthContextProvider } from '@/utils/context/AuthContext'
import { ThemeProvider } from '@/utils/theme'

export default function App({ Component, pageProps }: AppProps) {
  

  return (
    <ThemeProvider>
      <AuthContextProvider>
      <Component {...pageProps} />
      </AuthContextProvider>
    </ThemeProvider>
  )

}
