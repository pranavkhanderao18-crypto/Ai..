import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AccountSettingsPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "7rem", paddingBottom: "4rem", minHeight: "80vh", maxWidth: "800px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#fff", marginBottom: "1rem" }}>Account Settings</h1>
        <p style={{ color: "var(--on-surface-variant)", marginBottom: "2rem" }}>
          Manage your account preferences, billing, and security settings.
        </p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          <div style={{ background: "var(--surface-container-low)", padding: "2rem", borderRadius: "1.5rem", border: "1px solid rgba(64, 72, 93, 0.2)" }}>
            <h3 style={{ fontSize: "1.25rem", color: "#fff", marginBottom: "0.5rem" }}>Subscription</h3>
            <p style={{ color: "var(--on-surface-variant)", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
              You are currently on the Free plan. Upgrade to unlock more features!
            </p>
            <Link href="/pricing" className="btn-primary" style={{ display: "inline-block" }}>
              View Plans
            </Link>
          </div>

          <div style={{ background: "var(--surface-container-low)", padding: "2rem", borderRadius: "1.5rem", border: "1px solid rgba(64, 72, 93, 0.2)" }}>
            <h3 style={{ fontSize: "1.25rem", color: "#fff", marginBottom: "0.5rem" }}>Security</h3>
            <p style={{ color: "var(--on-surface-variant)", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
              Update your password or change your login provider.
            </p>
            <button className="btn-secondary">Change Password</button>
          </div>

          <div style={{ background: "var(--surface-container-low)", padding: "2rem", borderRadius: "1.5rem", border: "1px solid rgba(64, 72, 93, 0.2)", borderColor: "rgba(255, 68, 68, 0.2)" }}>
            <h3 style={{ fontSize: "1.25rem", color: "#ff4444", marginBottom: "0.5rem" }}>Danger Zone</h3>
            <p style={{ color: "var(--on-surface-variant)", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
              Permanently delete your account and all associated data.
            </p>
            <button className="btn-secondary" style={{ color: "#ff4444", borderColor: "rgba(255, 68, 68, 0.4)" }}>Delete Account</button>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
