import classes from '../styles/pages-styles/signup.module.css'
import SignUpForm from '../components/input/SignupForm'
import { getSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


export default function SignupPage() {
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter();
    useEffect(() => {
        getSession().then(session => {
            if (session) {
                router.replace('/')
            } else {
                setIsLoading(false)
            }
        })
    }, [router])

    if (isLoading) {
        return <div className='loadingPage'>
            <p className='loading'>Loading...</p>

        </div>
    }

    return (
        <div className={classes.signup}>
            <SignUpForm />
        </div>
    )
}