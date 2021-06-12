import LoginForm from "../components/input/LoginForm";
import classes from "../styles/pages-styles/login.module.css";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return (
      <div className="loadingPage">
        <h2 className="loading">Loading...</h2>
      </div>
    );
  }

  return (
    <div className={classes.login}>
      <LoginForm />
      <motion.img
        className={classes.loginArt}
        src="/art/login.svg"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            transition: {
              duration: 1,
            },
            opacity: 0,
            translateX: 300,
          },
          visible: {
            opacity: 0.9,
            translateX: 0,
            transition: {
              delay: 0.5,
              duration: 1,
            },
          },
        }}
      ></motion.img>
    </div>
  );
}
