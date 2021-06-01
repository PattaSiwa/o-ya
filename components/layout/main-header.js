import Link from 'next/link'
import { Fragment } from 'react'
import classes from './main-header.module.css'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/client'

function MainHeader() {
    const [session, loading] = useSession()

    function logoutHandler() {
        signOut();
    }

    return (
        <Fragment>
            <header>
                <div className={classes.logoA}>
                    <Link href="/"><img alt="oya logo" src="/oya-icons/logo_transparent2.png" className={classes.logo} />
                    </Link>
                    {/* width={50} height={50} */}
                </div>

                <input type="checkbox" className="nav-tog" id="nav-tog"></input>
                <label htmlFor="nav-tog" className="nav-tog-label">
                    <span></span>

                </label>
                <nav>
                    <ul>
                        {!session && !loading && <li><Link href="/signup">Sign Up</Link></li>}
                        {!session && !loading && <li><Link href="/login">Login</Link></li>}
                        {session && <li><Link href="/dashboard">Dashboard</Link></li>}
                        {session && <li><button className={classes.logoutBtn} onClick={logoutHandler}>Logout</button></li>}

                    </ul>
                </nav>
            </header>
        </Fragment>

    )
}

export default MainHeader