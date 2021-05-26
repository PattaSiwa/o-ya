import classes from './footer.module.css'

function Footer() {
    return (
        <footer className={classes.footer}>
            <img className={classes.logo} src='/oya-icons/logo_transparent.png' />
            <div className={classes.copyright}>
                <h3>Copyright &copy; 2021 OYA</h3>
                <h3>By Pattarapon Siwapornchai</h3>
            </div>
            <div>
                <a href="https://www.linkedin.com/in/pattasiwa" target="_blank"><img className={classes.socialicon} src='/oya-icons/linkedin2.png' /></a>
                <a href="https://github.com/PattaSiwa" target="_blank"><img className={classes.socialicon} src='/oya-icons/github-sign.png' /></a>
            </div>
        </footer>
    )
}

export default Footer