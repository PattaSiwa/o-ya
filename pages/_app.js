import Layout from '../components/layout/layout'
import '../styles/globals.css'
import '../styles/nav.css'
import Head from 'next/head'
import { AnimatePresence } from 'framer-motion'


function MyApp({ Component, pageProps }) {

  return (
    <AnimatePresence>
      <Layout>
        <Head>
          <title>OYA</title>
          <meta name="description" content="An Expense Sharing App" />
          <link rel="icon" href="/oya-icons/logo_transparent2.png" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </AnimatePresence>


  )
}

export default MyApp
