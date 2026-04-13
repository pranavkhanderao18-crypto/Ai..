import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "/mo",
    description: "Perfect for trying out HumanizeAI.",
    features: [
      { text: "10 Daily Credits", included: true },
      { text: "Watermark Downloads", included: true },
      { text: "HD Downloads (3 Credits)", included: true },
      { text: "Manual Editor Access", included: false },
      { text: "Priority processing", included: false },
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "₹199",
    period: "/mo",
    description: "Scale your production with advanced features.",
    features: [
      { text: "Unlimited Credits", included: true },
      { text: "HD Downloads (Free)", included: true },
      { text: "Manual Editor Access", included: true },
      { text: "Priority processing", included: true },
      { text: "API access", included: false },
    ],
    cta: "Get Professional",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Ultra Plan",
    price: "₹499",
    period: "/mo",
    description: "Maximum power with developer access.",
    features: [
      { text: "Unlimited Credits", included: true },
      { text: "HD Downloads (Free)", included: true },
      { text: "Manual Editor Access", included: true },
      { text: "Priority processing", included: true },
      { text: "API access", included: true },
    ],
    cta: "Get Ultra",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* Ambient Glows */}
        <div className={styles.glowLeft}></div>
        <div className={styles.glowRight}></div>

        {/* Header */}
        <section className={styles.header}>
          <span className="label-tag">Scalable Intelligence</span>
          <h1 className={styles.title}>
            Precision Pricing for <br />
            <span className="gradient-text">Every Creator</span>
          </h1>
          <p className={styles.subtitle}>
            Choose a plan that scales with your ambition. No hidden fees, just
            raw computational power and human-centric output.
          </p>
        </section>

        {/* Pricing Grid */}
        <section className={styles.pricingGrid}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`${styles.card} ${plan.highlighted ? styles.cardHighlighted : ""}`}
            >
              {plan.highlighted && (
                <>
                  <div className={styles.cardGlow}></div>
                  <div className={styles.badge}>{plan.badge}</div>
                </>
              )}
              <div className={styles.cardInner}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.planName}>{plan.name}</h3>
                  <p className={styles.planDesc}>{plan.description}</p>
                </div>
                <div className={styles.priceRow}>
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.period}>{plan.period}</span>
                </div>
                <ul className={styles.featureList}>
                  {plan.features.map((f) => (
                    <li key={f.text} className={f.included ? styles.included : styles.excluded}>
                      <span
                        className="material-symbols-outlined"
                        style={{
                          fontSize: "1.25rem",
                          color: f.included ? "var(--primary)" : "var(--outline)",
                          fontVariationSettings: f.included
                            ? "'FILL' 1, 'wght' 400"
                            : "'FILL' 0, 'wght' 400",
                        }}
                      >
                        {f.included ? "check_circle" : "block"}
                      </span>
                      <span>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={plan.highlighted ? styles.ctaPrimary : styles.ctaSecondary}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Bento trust grid */}
        <section className={styles.trustGrid}>
          <div className={`${styles.trustCard} ${styles.trustLarge}`}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgOCd-JdWyeZ02nqcFwJbq27M98z5ErUiY8bdhCkaXXl_mOS4ivI_4knGDMj7zeuz6yKI-xOFJu-4rUCQXbwclB6DyN10wZ0qyUdLO78bRF5qEoVR_4STN3TZGv7uzqGGYmXH4g3yZ21UTSnozVbjQWP13OX1MDxywy5R0bIyqJK9o6tenJXYHhiuKqHh6UWyi9-N4ggw7HDx1nNWcBltTilb4nEpCGJshpD3Q_lpgDK7QCospq0YCYT3Bnpyy-QQznSSMgnaxFgQ"
              alt="Neural network visualization"
              className={styles.trustBg}
            />
            <div className={styles.trustContent}>
              <span className="material-symbols-outlined" style={{ fontSize: "2.5rem", color: "var(--primary)" }}>
                neurology
              </span>
              <h4 className={styles.trustTitle}>Unrivaled Accuracy</h4>
              <p className={styles.trustDesc}>
                Our models pass Turing tests with 99.8% human-like recognition
                scores in independent audits.
              </p>
            </div>
          </div>
          <div className={styles.trustCard}>
            <h4 className={styles.trustTitle}>Global Edge Nodes</h4>
            <p className={styles.trustDesc}>
              Low latency responses in under 40ms worldwide.
            </p>
            <span className="material-symbols-outlined" style={{ fontSize: "3rem", color: "var(--secondary)", marginTop: "auto" }}>
              language
            </span>
          </div>
          <div className={styles.trustCard}>
            <h4 className={styles.trustBigNum}>24/7</h4>
            <p className={styles.trustLabel}>Uptime Guarantee</p>
          </div>
          <div className={`${styles.trustCard} ${styles.trustAccent}`}>
            <h4 className={styles.trustTitle}>Secure</h4>
            <p className={styles.trustDesc}>SOC2 Type II Compliant</p>
            <span className="material-symbols-outlined" style={{ color: "var(--primary)", marginTop: "1rem" }}>
              verified_user
            </span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
