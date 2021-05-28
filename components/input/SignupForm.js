import classes from './SignupForm.module.css'
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'

async function createUser(email, password) {
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
    }

    return data;
}


function SignUpForm() {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const reenterPasswordInputRef = useRef();

    const [signupStatus, setSignupStatus] = useState('Create an Account to get started!');

    const router = useRouter();


    async function submitHandler(event) {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const reenteredPassword = reenterPasswordInputRef.current.value;

        if (enteredPassword !== reenteredPassword) {
            setSignupStatus('Passwords do not match, please re-enter password')
            return;
        }

        try {
            const result = await createUser(enteredEmail, enteredPassword);
            console.log(result);
        } catch (error) {
            setSignupStatus(error.message)
            console.log(signupStatus)
            console.log(error);
        }

    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <h2 className={classes.title}>Sign Up</h2>
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
                <label >Your Password</label>
                <input
                    type='password'
                    required
                    ref={passwordInputRef}
                    placeholder="password"
                />
            </div>
            <div className={classes.input}>
                <label htmlFor='password'>Re-enter Password</label>
                <input
                    type='password'
                    id='password'
                    required
                    ref={reenterPasswordInputRef}
                    placeholder="re-enter password"
                />
            </div>
            <div>
                <p className={classes.signupStatus}>{signupStatus}</p>
            </div>
            <div className={classes.actions}>
                <button>Create Account</button>
            </div>
            <Link href='/login'>
                <a className={classes.signupLink}>Login with existing account here</a>
            </Link>
        </form>
    )
}

export default SignUpForm