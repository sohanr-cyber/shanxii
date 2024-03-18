import '@/styles/globals.css'
import NextNProgress from 'nextjs-progressbar'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'

export default function App ({ Component, pageProps }) {
  return (
    <Layout>
      <>
        <NextNProgress />
        <Component {...pageProps} />
      </>
    </Layout>
  )
}
