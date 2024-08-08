import '@/styles/globals.css'
import NextNProgress from 'nextjs-progressbar'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import BASE_URL from '@/config'
import { SnackbarProvider } from 'notistack'
import { DefaultSeo, NextSeo } from 'next-seo'
import { seoData } from '@/utility/const'
import Script from 'next/script'

export default function App ({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...seoData} />
      <Script
        id='gtm'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M93FPKM6');`
        }}
      ></Script>

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
    </>
  )
}
