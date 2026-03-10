import logo from "../assets/favicon.svg";
import styles from "../styles/Auth.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.iconCircle}>
                <img src={logo} alt="React logo" className={styles.logo} />
            </div>
        </header>
    );
}
