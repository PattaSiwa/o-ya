import Link from 'next/link'
import { Fragment } from 'react'
import classses from './main-header.module.css'

function MainHeader() {
    return (
        <Fragment>
            <header>
                <div className="logo-a">
                    <Link href="/"><a className={classses.logo}>OYA</a></Link>
                </div>

                <input type="checkbox" className="nav-tog" id="nav-tog"></input>
                <label for="nav-tog" className="nav-tog-label">
                    <span></span>

                </label>
                <nav>
                    <ul>
                        <li><Link href="/signup">Sign Up</Link></li>
                        <li><Link href="/login">Log In</Link></li>

                    </ul>
                </nav>
            </header>
        </Fragment>

    )
}

export default MainHeader