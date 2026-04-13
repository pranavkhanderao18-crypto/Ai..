"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    // Load credits to display or modify
    const today = new Date().toDateString();
    const saved = localStorage.getItem("humanize_credits_state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.date === today) {
          setCredits(parsed.credits);
        } else {
          setCredits(10);
        }
      } catch (e) {
        setCredits(10);
      }
    } else {
      setCredits(10);
    }
  }, []);

  const addCredits = (amount: number) => {
    const today = new Date().toDateString();
    const newTotal = (credits || 0) + amount;
    setCredits(newTotal);
    localStorage.setItem(
      "humanize_credits_state",
      JSON.stringify({ credits: newTotal, date: today })
    );
    alert(`Success! You have received +${amount} credits from your referral.`);
  };
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "7rem", paddingBottom: "4rem", minHeight: "80vh", maxWidth: "800px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#fff", marginBottom: "1rem" }}>Your Profile</h1>
        <p style={{ color: "var(--on-surface-variant)", marginBottom: "2rem" }}>
          Manage your public profile and personal information.
        </p>
        
        <div style={{ background: "var(--surface-container-low)", padding: "2rem", borderRadius: "1.5rem", border: "1px solid rgba(64, 72, 93, 0.2)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", fontWeight: "bold", color: "#000" }}>
              U
            </div>
            <div>
              <h2 style={{ fontSize: "1.5rem", color: "#fff", marginBottom: "0.25rem" }}>User Name</h2>
              <p style={{ color: "var(--on-surface-variant)" }}>user@example.com</p>
            </div>
          </div>
          
          <button className="btn-secondary" style={{ marginRight: "1rem" }}>Edit Profile</button>
          <button className="btn-primary">Change Avatar</button>
        </div>

        {/* Refer & Earn Section */}
        <div style={{ background: "rgba(129, 233, 255, 0.05)", padding: "2rem", borderRadius: "1.5rem", border: "1px solid rgba(129, 233, 255, 0.3)", marginTop: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "2rem", color: "var(--primary)" }}>group_add</span>
            <h2 style={{ fontSize: "1.75rem", color: "#fff", margin: 0 }}>Refer & Earn</h2>
          </div>
          
          <p style={{ color: "var(--on-surface-variant)", marginBottom: "1.5rem", lineHeight: "1.6" }}>
            Invite your friends to HumanizeAI and earn free credits! <br/>
            - Get <strong style={{color:"var(--primary)"}}>10 Credits</strong> when a friend signs up.<br/>
            - Get <strong style={{color:"var(--primary)"}}>100 Credits</strong> when they upgrade to a Paid Plan!
          </p>
          
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            <input 
              type="text" 
              readOnly 
              value="https://humanizeai.com/invite/userXYZ123" 
              style={{ flex: 1, padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1px solid rgba(64, 72, 93, 0.4)", background: "rgba(25, 37, 64, 0.4)", color: "#fff", outline: "none", minWidth:"200px" }}
            />
            <button className="btn-primary" onClick={() => alert("Copied to clipboard!")}>
              Copy Link
            </button>
          </div>

          <div style={{ padding: "1.5rem", borderTop: "1px solid rgba(64, 72, 93, 0.2)" }}>
            <h3 style={{ fontSize: "0.875rem", color: "var(--on-surface-variant)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>
              Simulate Incoming Referrals (Demo)
            </h3>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button className="btn-secondary" style={{ flex: 1 }} onClick={() => addCredits(10)}>
                <span className="material-symbols-outlined">person_add</span>
                Friend Signed Up (+10)
              </button>
              <button className="btn-primary" style={{ flex: 1, background: "var(--primary)", color: "#000" }} onClick={() => addCredits(100)}>
                <span className="material-symbols-outlined">diamond</span>
                Friend Bought Pro (+100)
              </button>
            </div>
            {credits !== null && (
              <p style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#fff", textAlign: "center" }}>
                Current Balance: <span style={{color: "var(--primary)", fontWeight: "bold"}}>{credits} Credits</span>
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
