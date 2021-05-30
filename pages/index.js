
import classes from '../styles/pages-styles/index.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={classes.container}>


      <video className={classes.backgroundvid} src="/background1.mp4" muted loop autoPlay ></video>

      <div className={classes.landing}>

        <img className={classes.mainLogo} alt="oya logo" src='/oya-icons/logo_transparent.png' width={400} height={400} />
        <div className={classes.slogan}>
          <h3>Shared Expenses Made Simple</h3>
        </div>

        <Link href="/signup"><button className={classes.getstarted}>Get Started</button></Link>
      </div>



    </div>
  )
}
