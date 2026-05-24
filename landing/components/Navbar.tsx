"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        Applid<sup className={styles.sup}>beta</sup>
      </div>

      <ul className={styles.links}>
        <li>
          <Link href="#how">How it works</Link>
        </li>
        <li>
          <Link href="#features">Features</Link>
        </li>
        <li>
          <Link href="#" className={styles.cta}>
            Add to Chrome
          </Link>
        </li>
      </ul>
    </nav>
  );
}
