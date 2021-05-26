import classes from './SignupForm.module.css'
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';

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

    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    }

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
        <form onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='email'>Your Email</label>
                <input type='email' id='email' required ref={emailInputRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor='password'>Your Password</label>
                <input
                    type='password'
                    id='password'
                    required
                    ref={passwordInputRef}
                />
            </div>
            <div className={classes.actions}>
                <button>{isLogin ? 'Login' : 'Create Account'}</button>
                <button
                    type='button'
                    className={classes.toggle}
                    onClick={switchAuthModeHandler}
                >
                    {isLogin ? 'Create new account' : 'Login with existing account'}
                </button>
            </div>
        </form>
    )
}

export default SignUpForm