import Layout from '../components/layout/layout'
import '../styles/globals.css'
import '../styles/nav.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>

  )
}

export default MyApp
