import { Link, Outlet, useLocation } from "react-router-dom"
import { useMemo } from "react"
import Header from "../../components/Header"
import styles from "../../styles/Auth.module.css"

export default function Auth() {
  const location = useLocation()

  const isSignup = useMemo(() => {
    return location.pathname.includes("signup")
  }, [location.pathname])

  return (
    <div className={styles.authPage}>
      <Header />

      <div className={styles.body}>
        <div className={styles.authContainer}>
          <div className={styles.toggle}>
            <Link
              to="/auth"
              className={`${styles.tab} ${!isSignup ? styles.activeTab : ""}`}
            >
              Login
            </Link>

            <Link
              to="/auth/signup"
              className={`${styles.tab} ${isSignup ? styles.activeTab : ""}`}
            >
              Signup
            </Link>
          </div>

          <Outlet />

          <button className={styles.loginButton}>
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </div>
      </div>
    </div>
  )
}
