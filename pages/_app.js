import '@/styles/globals.css'
import NextNProgress from 'nextjs-progressbar'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import BASE_URL from '@/config'
import { SnackbarProvider, useSnackbar } from 'notistack'

export default function App ({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SnackbarProvider>
        <Layout>
          <>
            <NextNProgress />
            <Component {...pageProps} />
          </>
        </Layout>{' '}
      </SnackbarProvider>
    </Provider>
  )
}
