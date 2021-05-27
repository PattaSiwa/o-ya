import classes from './SignupForm.module.css'
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import Link from 'next/link'

async function createUser(email, password) {
    const response = await fetch('/api/users', {
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


    const router = useRouter();


    async function submitHandler(event) {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        // optional: Add validation

        if (isLogin) {
            const result = await signIn('credentials', {
                redirect: false,
                email: enteredEmail,
                password: enteredPassword,
            });

            if (!result.error) {
                // set some auth state
                router.replace('/profile');
            }
        } else {
            try {
                const result = await createUser(enteredEmail, enteredPassword);
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
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
            <div className={classes.actions}>
                <button>Create Account</button>
                <Link href='/login'>
                    <a className={classes.signupLink}>Login with existing account here</a>
                </Link>
            </div>
        </form>
    )
}

export default SignUpForm