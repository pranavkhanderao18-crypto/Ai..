import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* ─── HERO ─── */}
        <section className={styles.hero}>
          <div className={styles.heroGlow}></div>
          <div className={styles.heroContent}>
            <div className="label-tag">
              <span className={styles.pulseDot}></span>
              v2.0 Neural Engine Live
            </div>
            <h1 className={styles.heroTitle}>
              Turn AI Images into{" "}
              <span className="gradient-text">Real Human</span> Photos
            </h1>
            <p className={styles.heroSub}>
              Bypass artificial textures. Our proprietary neural rendering
              technology injects genuine skin micro-details, authentic lighting,
              and human imperfections into synthetic generations.
            </p>
            <div className={styles.heroCtas}>
              <Link href="?auth=signup" className="btn-primary" style={{ padding: "1rem 2rem" }} scroll={false}>
                Start Humanizing
              </Link>
              <a href="#features" className="btn-secondary">
                <span className="material-symbols-outlined">play_circle</span>
                Watch Demo
              </a>
            </div>
          </div>

          {/* Before / After Comparison */}
          <div className={styles.heroVisual}>
            <div className={styles.heroVisualGlow}></div>
            <div className={styles.comparisonCard}>
              <div className={styles.comparisonInner}>
                {/* Background (After) */}
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjFyrM994AwR59MEhp3loznB7mq4TyAOai9onlzMcHkoY4c93B6HV9UNk7sdUMBg9GkKPm67INNUQv4KbW3FwwS9BPuDtMoU-9A_9Y7cvBNScSq2WHBkfiYBfiP-DmulLfx2m25lBCiC_kNpXf1SoAoITsf4AleuhxKEKmKrL-l3cKEe2bHbHJP9xX1IAdW2aRGt5Cr1zLhETZn9ihuaQZwFRIEK3dWGdI2iRpRUToIBqwaWwyt4KRLg-PQic8U-Oo4iAmzllwL-E"
                  alt="AI Generated Portrait - Before"
                  className={styles.beforeImg}
                />
                {/* Foreground (Before — clipped left) */}
                <div className={styles.afterOverlay}>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQYB_1YH6CIygvlE_T2sYIOJA1NfQxjsICByeS0Hk8z0psLc9dwD1vWdsy-rRfkdG_TzdIu1PItQ5UWl1ZoxwnjkZPo7PHqnPCZ4IXOr46uimDZdTBiC82kkDdeuN0S9u3N9_Wff36YwCBk_81FiaZ97o55oGVJ62cOUjRtZaIuH4unMlA_Qsp6S16gKTZaPd1dmJxO5IKGmEcf5RaZ7QsYiZ7hw6o89ayXPDcYSbxazRknUXOkqQzNm1TUUdKSLCJGA3Yzj_v7_A"
                    alt="Humanized Portrait - After"
                    className={styles.afterImg}
                  />
                </div>
                {/* Slider knob */}
                <div className={styles.sliderKnob}>
                  <span className="material-symbols-outlined" style={{ fontSize: "0.875rem", color: "#0f172a" }}>
                    unfold_more
                  </span>
                </div>
                {/* Labels */}
                <div className={styles.labelBefore}>Before</div>
                <div className={styles.labelAfter}>After</div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FEATURES BENTO ─── */}
        <section className={styles.featuresSection} id="features">
          <div className={styles.featuresHeader}>
            <div>
              <h2 className={styles.sectionTitle}>
                Built for the <span style={{ color: "var(--primary)" }}>New Era</span> of
                Realism.
              </h2>
              <p className={styles.sectionSub}>
                Our multi-layered approach targets the &quot;Uncanny Valley&quot;
                specifically, replacing flat pixels with depth and life.
              </p>
            </div>
          </div>
          <div className={styles.bentoGrid}>
            {/* Large Card */}
            <div className={`${styles.bentoCard} ${styles.bentoLarge}`}>
              <div className={styles.bentoTop}>
                <div className={styles.bentoIcon}>
                  <span className="material-symbols-outlined" style={{ color: "var(--primary)", fontSize: "1.75rem" }}>biotech</span>
                </div>
                <span className={styles.bentoNum}>01</span>
              </div>
              <div className={styles.bentoBottom}>
                <h3 className={styles.bentoTitle}>Neural Texture Synthesis</h3>
                <p className={styles.bentoDesc}>
                  Automatically detects artificial skin smoothing and overlays
                  high-frequency noise and real human pore maps derived from our
                  8K photography library.
                </p>
              </div>
            </div>
            {/* Small Cards */}
            <div className={styles.bentoCard}>
              <div className={styles.bentoIcon} style={{ background: "rgba(103, 156, 255, 0.1)", borderColor: "rgba(103, 156, 255, 0.2)" }}>
                <span className="material-symbols-outlined" style={{ color: "var(--secondary)", fontSize: "1.75rem" }}>light_mode</span>
              </div>
              <div className={styles.bentoBottom}>
                <h3 className={styles.bentoSmallTitle}>Subsurface Scattering</h3>
                <p className={styles.bentoDesc}>
                  Simulates how light penetrates the skin surface for that
                  natural glow.
                </p>
              </div>
            </div>
            <div className={styles.bentoCard}>
              <div className={styles.bentoIcon} style={{ background: "rgba(250, 176, 255, 0.1)", borderColor: "rgba(250, 176, 255, 0.2)" }}>
                <span className="material-symbols-outlined" style={{ color: "var(--tertiary)", fontSize: "1.75rem" }}>blur_on</span>
              </div>
              <div className={styles.bentoBottom}>
                <h3 className={styles.bentoSmallTitle}>Lens Imperfections</h3>
                <p className={styles.bentoDesc}>
                  Adds chromatic aberration and grain to match real-world
                  cameras.
                </p>
              </div>
            </div>
            {/* Wide Card */}
            <div className={`${styles.bentoCard} ${styles.bentoWide}`}>
              <div className={styles.bentoWideInner}>
                <div className={styles.bentoWideImg}>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiYkkz0yfNBzA5hkL2RvNaRentQzHXDtsbYLGDceuhE3_hlaVW9l5jZpZIMU-h4oFWbflAkn1oV16o-mQW0KPQdf0g0bZXZHSZKQvDnCkJ5uzNGvWhXffEurW1YhkxKgVuCuLTkXWt2wQNcNwClVCrycGF-GjhvZyoeqPT-wTH2-_p2sRtoPxdgczVD99D1y59e6sp-u9Qve_Qx9AS8-GwyYX8xvxeObtSzP7Kj3pRXAOtV47l-DeNm1PlEelQ5ItAzQkcUYOHt2E"
                    alt="Precision lens"
                    className={styles.wideImg}
                  />
                </div>
                <div className={styles.bentoWideText}>
                  <h3 className={styles.bentoSmallTitle}>
                    Anatomical Edge Correction
                  </h3>
                  <p className={styles.bentoDesc}>
                    Fixes the common &quot;cut-out&quot; look of AI generations
                    by blending edges with natural micro-hair and soft focal
                    transitions.
                  </p>
                  <div className={styles.bentoAccent}>
                    <span className={styles.accentLine}></span>
                    <span className={styles.accentText}>Verified Accuracy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section className={styles.howSection}>
          <div className={styles.howHeader}>
            <span className="label-tag">Simple Process</span>
            <h2 className={styles.sectionTitle}>
              Three steps to <span className="gradient-text">photorealism</span>
            </h2>
          </div>
          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>01</div>
              <span className="material-symbols-outlined" style={{ fontSize: "2.5rem", color: "var(--primary)" }}>cloud_upload</span>
              <h3>Upload Image</h3>
              <p>Drop any AI-generated or low-quality image (JPG, PNG up to 5MB).</p>
            </div>
            <div className={styles.stepDivider}>
              <span className="material-symbols-outlined" style={{ color: "var(--outline)" }}>arrow_forward</span>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>02</div>
              <span className="material-symbols-outlined" style={{ fontSize: "2.5rem", color: "var(--secondary)" }}>auto_fix</span>
              <h3>Click Humanize</h3>
              <p>Our neural engine processes textures in 5–10 seconds.</p>
            </div>
            <div className={styles.stepDivider}>
              <span className="material-symbols-outlined" style={{ color: "var(--outline)" }}>arrow_forward</span>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>03</div>
              <span className="material-symbols-outlined" style={{ fontSize: "2.5rem", color: "var(--tertiary)" }}>download</span>
              <h3>Download Result</h3>
              <p>Get your hyper-realistic photo ready for any use case.</p>
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section className={styles.testimonialsSection}>
          <h2 className={styles.sectionTitle} style={{ textAlign: "center" }}>
            Loved by <span className="gradient-text">creators</span> worldwide
          </h2>
          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialText}>
                &quot;HumanizeAI completely changed how I produce content. My
                AI portraits now look indistinguishable from real photos.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.avatar}>SP</div>
                <div>
                  <strong>Sarah P.</strong>
                  <span>Content Creator</span>
                </div>
              </div>
            </div>
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialText}>
                &quot;The skin texture engine is genuinely incredible. It's the
                only tool that passes our quality checks for client work.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.avatar}>MR</div>
                <div>
                  <strong>Marcus R.</strong>
                  <span>Photo Studio Lead</span>
                </div>
              </div>
            </div>
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialText}>
                &quot;Processing is lightning fast and the results speak for
                themselves. Highly recommend for any visual project.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.avatar}>AK</div>
                <div>
                  <strong>Anita K.</strong>
                  <span>Digital Marketer</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaTopLine}></div>
            <h2 className={styles.ctaTitle}>
              Ready to break the{" "}
              <span style={{ color: "var(--secondary)" }}>uncanny valley?</span>
            </h2>
            <p className={styles.ctaSub}>
              Join 5,000+ photographers and agencies using HumanizeAI to create
              content that actually connects.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="?auth=signup" className={styles.ctaPrimary} scroll={false}>
                Get Started for Free
              </Link>
              <a href="/pricing" className={styles.ctaSecondary}>
                View Pricing
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
