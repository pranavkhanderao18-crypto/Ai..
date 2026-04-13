import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>HumanizeAI</span>
          <p className={styles.copy}>
            © 2025 HumanizeAI. Precision in every pixel.
          </p>
        </div>
        <div className={styles.links}>
          <Link href="#">Privacy</Link>
          <Link href="#">Terms</Link>
          <Link href="#">Status</Link>
          <Link href="#">Contact</Link>
        </div>
        <div className={styles.socials}>
          <a href="#" className={styles.socialIcon} aria-label="Website">
            <span className="material-symbols-outlined">public</span>
          </a>
          <a href="#" className={styles.socialIcon} aria-label="Email">
            <span className="material-symbols-outlined">alternate_email</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
