import Link from "next/link";
import styles from "./CTA.module.css";

export default function CTA() {
  return (
    <div className={styles.wrap}>
      <div className={styles.left}>
        <h2 className={styles.h2}>
          Start tracking<br />from your next<br />application.
        </h2>
        <p className={styles.desc}>
          Free to install. Works immediately. No credit card, no onboarding
          form, no friction.
        </p>
      </div>
      <div className={styles.right}>
        <Link href="#" className="btn-light">
          Add Applid to Chrome
        </Link>
        <div className={styles.small}>Also works on Brave and Edge</div>
      </div>
    </div>
  );
}
