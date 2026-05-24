import Link from "next/link";
import styles from "./Hero.module.css";

const submissions = [
  {
    index: "01",
    title: "LUMS Graduate Fellowship 2025",
    meta: "docs.google.com · Submitted 2 days ago",
    status: "Waiting",
    statusClass: "waiting",
  },
  {
    index: "02",
    title: "Y Combinator W26 Application",
    meta: "docs.google.com · Submitted 5 days ago",
    status: "Submitted",
    statusClass: "sent",
  },
  {
    index: "03",
    title: "Stripe Summer Internship",
    meta: "docs.google.com · Submitted 9 days ago",
    status: "No update",
    statusClass: "noupdate",
  },
];

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} />

      {/* LEFT */}
      <div className={styles.left}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowLine} />
          Google Forms tracker
        </div>

        <h1 className={styles.h1}>
          You applied.<br />
          Now <em>remember</em><br />
          everything.
        </h1>

        <p className={styles.desc}>
          Applid silently captures every Google Form submission — your answers,
          timestamps, and status — so you never lose track of where you applied
          or what you wrote.
        </p>

        <div className={styles.actions}>
          <Link href="#" className="btn-primary">
            Add to Chrome — free
          </Link>
          <Link href="#how" className="btn-ghost">
            See how it works →
          </Link>
        </div>

        <div className={styles.note}>
          No account needed to start. Sign in later to sync.
        </div>
      </div>

      {/* RIGHT */}
      <div className={styles.right}>
        <div className={styles.cardLabel}>Your recent applications</div>

        <div className={styles.submissionStack}>
          {submissions.map((s) => (
            <div key={s.index} className={styles.subCard}>
              <div className={styles.subIndex}>{s.index}</div>
              <div className={styles.subBody}>
                <div className={styles.subTitle}>{s.title}</div>
                <div className={styles.subMeta}>{s.meta}</div>
              </div>
              <span className={`${styles.statusPill} ${styles[s.statusClass]}`}>
                {s.status}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.answerPreview}>
          <div className={styles.answerQ}>
            📚 Saved answer — "Why do you want to join?"
          </div>
          <div className={styles.answerA}>
            "I've spent the last two years building products that solve real
            friction for real people. What draws me to this program is..."
          </div>
        </div>
      </div>
    </section>
  );
}
