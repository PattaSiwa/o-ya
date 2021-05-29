import LoginForm from '../components/input/LoginForm'
import classes from './login.module.css'
import { getSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function LoginPage() {
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
        return <p>Loading...</p>
    }

    return (
        <div className={classes.login}>
            <LoginForm />
        </div>
    )
}