"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/pricing", label: "Pricing" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navCredits, setNavCredits] = useState(10);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Initialize Supabase only on client
  const [supabase] = useState(() => createClient());

  useEffect(() => {
    // Check initial session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    checkUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  // Handle clicking outside the dropdown exactly once
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update credits display from localStorage when dropdown opens
  useEffect(() => {
    if (dropdownOpen) {
      const saved = localStorage.getItem("humanize_credits_state");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.date === new Date().toDateString()) {
            setNavCredits(parsed.credits);
          } else {
            setNavCredits(10);
          }
        } catch (e) {
          setNavCredits(10);
        }
      }
    }
  }, [dropdownOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setDropdownOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link href="/" className={styles.logo}>
          HumanizeAI
        </Link>
        <div className={styles.links}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${
                pathname === link.href ? styles.active : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.right}>
        {user ? (
          <div className={styles.userMenu} ref={dropdownRef}>
            <button className={styles.profileBtn} onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div className={styles.avatar}>
                {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="material-symbols-outlined" style={{ fontSize: "1.125rem", color: "var(--outline)" }}>
                expand_more
              </span>
            </button>

            {dropdownOpen && (
              <div className={styles.dropdown}>
                <div style={{ padding: "0.5rem 1rem", borderBottom: "1px solid rgba(64, 72, 93, 0.2)", marginBottom: "0.25rem" }}>
                  <div style={{ fontSize: "0.875rem", fontWeight: "600", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {user.user_metadata?.full_name || "User"}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--on-surface-variant)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {user.email}
                  </div>
                  <div style={{ marginTop: "0.75rem", padding: "0.5rem", background: "rgba(129, 233, 255, 0.1)", borderRadius: "0.5rem", color: "var(--primary)", fontSize: "0.75rem", fontWeight: "bold", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>Credits</span>
                    <span>{navCredits} / 10</span>
                  </div>
                </div>

                <Link href="/dashboard" className={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
                  <span className="material-symbols-outlined" style={{ fontSize: "1.25rem" }}>dashboard</span>
                  Dashboard
                </Link>
                <Link href="/profile" className={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
                  <span className="material-symbols-outlined" style={{ fontSize: "1.25rem" }}>person</span>
                  Profile
                </Link>
                <Link href="/account-settings" className={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
                  <span className="material-symbols-outlined" style={{ fontSize: "1.25rem" }}>settings</span>
                  Account Settings
                </Link>
                <div className={styles.dropdownDivider}></div>
                <button
                  className={`${styles.dropdownItem} ${styles.logout}`}
                  onClick={handleLogout}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "1.25rem" }}>logout</span>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="?auth=login" className={styles.loginLink} scroll={false}>
              Login
            </Link>
            <Link href="?auth=signup" className="btn-primary" style={{ padding: "0.625rem 1.5rem", fontSize: "0.875rem" }} scroll={false}>
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
