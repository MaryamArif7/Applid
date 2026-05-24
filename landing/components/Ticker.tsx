import styles from "./Ticker.module.css";

const items = [
  "Auto-capture every submission",
  "Answer Library",
  "Smart reminders",
  "Gmail integration",
  "Duplicate detection",
  "Application health score",
];

export default function Ticker() {
  const doubled = [...items, ...items];

  return (
    <div className={styles.wrap}>
      <div className={styles.ticker}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
