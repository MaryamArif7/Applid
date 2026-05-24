import styles from "./Features.module.css";

const features = [
  {
    icon: "🧠",
    title: "Answer Library",
    desc: "Every answer you've ever typed into a Google Form is saved and searchable. Next time you see "tell us about yourself" — pull from your best past answers instead of starting blank.",
    tag: "Killer feature",
    dark: true,
    large: true,
  },
  {
    icon: "⚡",
    title: "Auto-detection",
    desc: "Zero manual input. Applid watches Google Forms silently and logs submissions the moment they happen.",
  },
  {
    icon: "🔔",
    title: "Smart Reminders",
    desc: "Get nudged when you've been waiting too long. Know exactly when to follow up.",
  },
  {
    icon: "📬",
    title: "Gmail Integration",
    desc: "Applid reads confirmation emails and auto-updates your application status when a company replies.",
  },
  {
    icon: "🚫",
    title: "Duplicate Detection",
    desc: "Get warned before submitting somewhere you've already applied. No more embarrassing doubles.",
  },
  {
    icon: "📊",
    title: "Health Score",
    desc: "Track your application patterns — submissions per week, response rate, and where to focus next.",
  },
];

const stats = [
  { num: "100%", label: "Auto-captured, zero manual input" },
  { num: "∞", label: "Answer history saved forever" },
  { num: "0", label: "Setup time required" },
];

export default function Features() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.header}>
        <div>
          <div className="section-tag">Features</div>
          <h2 className={styles.h2}>
            Built for the<br />serial applicant.
          </h2>
        </div>
        <p className={styles.desc}>
          Everything you needed after hitting submit — that nobody ever built
          until now.
        </p>
      </div>

      <div className={styles.bento}>
        {features.map((f) => (
          <div
            key={f.title}
            className={[
              styles.card,
              f.dark ? styles.dark : "",
              f.large ? styles.large : "",
            ]
              .join(" ")
              .trim()}
          >
            <div className={styles.icon}>{f.icon}</div>
            <div className={styles.cardTitle}>{f.title}</div>
            <p className={styles.cardDesc}>{f.desc}</p>
            {f.tag && <span className={styles.tag}>{f.tag}</span>}
          </div>
        ))}
      </div>

      <div className={styles.statsRow}>
        {stats.map((s) => (
          <div key={s.num} className={styles.statBox}>
            <div className={styles.statBig}>{s.num}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
