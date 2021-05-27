import classes from './LoginForm.module.css'
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import Link from 'next/link'



export default function LoginForm(props) {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const [loginStatus, setLoginStatus] = useState('');


    const router = useRouter();


    async function submitHandler(event) {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        const result = await signIn('credentials', {
            redirect: false,
            email: enteredEmail,
            password: enteredPassword,
        });

        if (!result.error) {
            console.log(result)
            router.replace('/dashboard');
        }
        setLoginStatus(result.error)
        console.log(result)
        console.log(loginStatus)

    }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <h2 className={classes.title}>Login</h2>
            <div className={classes.input}>
                <label htmlFor='email'>Your Email</label>
                <input
                    type='email'
                    id='email'
                    required ref={emailInputRef}
                    placeholder="email"
                />
            </div>
            <div className={classes.input}>
                <label htmlFor='password'>Your Password</label>
                <input
                    type='password'
                    id='password'
                    required
                    ref={passwordInputRef}
                    placeholder="password"
                />
            </div>
            <div>
                <p className={classes.loginStatus}>{loginStatus}</p>
            </div>
            <div className={classes.actions}>
                <button>Login</button>
                <Link href='/signup'>
                    <a className={classes.signupLink}>Don't have an account? Sign up here</a>
                </Link>
            </div>
        </form>
    )
}
