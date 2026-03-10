import styles from "../../styles/Auth.module.css"

export default function Signup() {
    return (
        <>
            <input
                type="text"
                placeholder="Username"
                className={styles.input}
            />

            <input
                type="email"
                placeholder="Email"
                className={styles.input}
            />

            <input
                type="password"
                placeholder="Password"
                className={styles.input}
            />
        </>
    )
}