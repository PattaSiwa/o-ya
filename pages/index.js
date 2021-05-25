import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>O-Ya</title>
        <meta name="description" content="An Expense Sharing App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>O-Ya!</h1>


    </div>
  )
}
