import LoginForm from '../components/input/Login'
import classes from './login.module.css'

export default function LoginPage() {
    return (
        <div className={classes.login}>
            <LoginForm />
        </div>
    )
}