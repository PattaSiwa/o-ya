import classes from "../styles/pages-styles/signup.module.css";
import SignUpForm from "../components/input/SignupForm";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function SignupPage() {
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
        <p className="loading">Loading...</p>
      </div>
    );
  }

  return (
    <div className={classes.signup}>
      <motion.img
        className={classes.signupArt}
        src="/art/signup.svg"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            transition: {
              duration: 1,
            },
            opacity: 0,
            translateX: -300,
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
      <SignUpForm />
    </div>
  );
}
