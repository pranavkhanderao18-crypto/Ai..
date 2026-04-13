"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import styles from "./AuthModal.module.css";

function AuthModalContent() {
  const searchParams = useSearchParams();
  const authQuery = searchParams.get("auth");
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Initialize Supabase only if we need it
  const [supabase] = useState(() => createClient());

  useEffect(() => {
    if (authQuery === "signup") {
      setIsLogin(false);
    } else if (authQuery === "login" || authQuery === "true") {
      setIsLogin(true);
    }
  }, [authQuery]);

  if (!authQuery) return null;

  const closeModal = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("auth");
    // Replace current URL to remove auth param without triggering scroll
    const newUrl = newParams.toString() ? `?${newParams.toString()}` : window.location.pathname;
    router.replace(newUrl, { scroll: false });
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        closeModal();
        router.push("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });
        if (error) throw error;
        closeModal();
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
  };

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={closeModal} aria-label="Close modal">
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className={styles.cardSub}>
            {isLogin
              ? "Enter your credentials to access your dashboard."
              : "Sign up to start humanizing your images."}
          </p>
        </div>

        <form className={styles.form} onSubmit={handleAuth}>
          {error && (
            <div style={{ color: "var(--error)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              {error}
            </div>
          )}
          
          {!isLogin && (
            <div className={styles.field}>
              <label htmlFor="modal-name" className={styles.label}>
                Full Name
              </label>
              <div className={styles.inputWrap}>
                <span className={`material-symbols-outlined ${styles.inputIcon}`}>
                  person
                </span>
                <input
                  id="modal-name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="modal-email" className={styles.label}>
              Email Address
            </label>
            <div className={styles.inputWrap}>
              <span className={`material-symbols-outlined ${styles.inputIcon}`}>
                mail
              </span>
              <input
                id="modal-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="modal-password" className={styles.label}>
                Password
              </label>
              {isLogin && (
                <a href="#" className={styles.forgotLink}>
                  Forgot password?
                </a>
              )}
            </div>
            <div className={styles.inputWrap}>
              <span className={`material-symbols-outlined ${styles.inputIcon}`}>
                lock
              </span>
              <input
                id="modal-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
          </button>

          <div className={styles.divider}>
            <span className={styles.dividerLine}></span>
            <span className={styles.dividerText}>Or continue with</span>
            <span className={styles.dividerLine}></span>
          </div>

          <div className={styles.socialGrid}>
            <button type="button" onClick={signInWithGoogle} className={styles.socialBtn}>
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
              </svg>
              Google
            </button>
          </div>
        </form>

        <div className={styles.toggle}>
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className={styles.toggleBtn}
            >
              {isLogin ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuthModal() {
  return (
    <Suspense fallback={null}>
      <AuthModalContent />
    </Suspense>
  );
}
