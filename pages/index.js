import Head from 'next/head'
import Image from 'next/image'
import classes from './index.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={classes.container}>
      <Head>
        <title>OYA</title>
        <meta name="description" content="An Expense Sharing App" />
        <link rel="icon" href="/oya-icons/logo_transparent2.png" />
      </Head>

      <video className={classes.backgroundvid} src="/background.mp4" muted loop playsinline autoPlay ></video>

      <div className={classes.landing}>

        <img className={classes.mainLogo} src='/oya-icons/logo_transparent.png' width={400} height={400} />
        <div className={classes.slogan}>
          <h3>Shared Expenses Made Simple</h3>
        </div>

        <Link href="/signup"><button className={classes.getstarted}>Get Started</button></Link>
      </div>



    </div>
  )
}
