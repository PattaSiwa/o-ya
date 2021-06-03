import { motion } from 'framer-motion'
import classes from '../styles/pages-styles/index.module.css'
import Link from 'next/link'



export default function Home() {
  return (
    <motion.div className={classes.container} initial="hidden" animate="visible"
      variants={{
        hidden: {
          scale: 0,
          opacity: 0
        },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            delay: .5,
            duration: 1
          }
        }
      }}
    >


      {/* <video className={classes.backgroundvid} src="/background1.mp4" muted loop autoPlay ></video> */}

      <div className={classes.landing}>

        <img className={classes.mainLogo} alt="oya logo" src='/oya-icons/logo_transparent.png' width={400} height={400} />
        {/* <div className={classes.slogan}>
          <h3>Shared Expenses Made Simple</h3>
        </div> */}

        <Link href="/dashboard"><button className={classes.getstarted}>Get Started</button></Link>
      </div>



    </motion.div>
  )
}
