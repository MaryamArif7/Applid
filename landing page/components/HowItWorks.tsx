import styles from "./HowItWorks.module.css";

const steps = [
  {
    num: "01",
    title: "Install the extension",
    desc: "One click from the Chrome Web Store. Sign in with Google and you're done in 30 seconds.",
  },
  {
    num: "02",
    title: "Visit any Google Form",
    desc: "Applid detects it automatically. No need to do anything — just fill the form as you normally would.",
  },
  {
    num: "03",
    title: "Submit and it's captured",
    desc: "The moment you hit submit, Applid saves your answers, the form title, URL, and timestamp.",
  },
  {
    num: "04",
    title: "Track from your dashboard",
    desc: "Everything lives in your personal dashboard. Update statuses, search answers, set reminders.",
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how">
      <div className={styles.header}>
        <div>
          <div className="section-tag">How it works</div>
          <h2 className={styles.h2}>
            Four steps.<br />Zero effort.
          </h2>
        </div>
        <p className={styles.desc}>
          Applid runs in your browser background. You apply normally — it
          handles the rest automatically.
        </p>
      </div>

      <div className={styles.steps}>
        {steps.map((step, i) => (
          <div key={step.num} className={styles.step}>
            {i < steps.length - 1 && (
              <div className={styles.arrow}>→</div>
            )}
            <div className={styles.stepNum}>{step.num}</div>
            <div className={styles.stepTitle}>{step.title}</div>
            <p className={styles.stepDesc}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
