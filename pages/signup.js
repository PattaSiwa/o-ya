import classes from './signup.module.css'
import SignUpForm from '../components/input/SignupForm'

export default function SignupPage() {
    return (
        <div className={classes.signup}>
            <SignUpForm />
        </div>
    )
}