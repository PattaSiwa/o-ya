import LoginForm from '../components/input/LoginForm'
import classes from './login.module.css'

export default function LoginPage() {
    return (
        <div className={classes.login}>
            <LoginForm />
        </div>
    )
}