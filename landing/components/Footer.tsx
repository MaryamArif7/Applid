import Link from "next/link";
import styles from "./Footer.module.css";

const links = ["Privacy", "Terms", "GitHub", "Contact"];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>Applid</div>
      <ul className={styles.links}>
        {links.map((l) => (
          <li key={l}>
            <Link href="#">{l}</Link>
          </li>
        ))}
      </ul>
      <div className={styles.copy}>© 2025 Applid</div>
    </footer>
  );
}
