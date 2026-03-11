'use client'

import { useState, useTransition } from "react";
import { signup } from "@/lib/actions/auth.actions";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    startTransition(async () => {
      try {
        const response = await signup({ name, email, password });
        if (response) {
          setMessage({ type: "success", text: "Account created! Signing you in…" });
          setTimeout(() => signIn("credentials", { email, password, callbackUrl: "/" }), 800);
        } else {
          setMessage({ type: "error", text: "Signup failed. Please try again." });
        }
      } catch {
        setMessage({ type: "error", text: "Something went wrong. Please try again." });
      }
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-card animate-scale-in">
        {/* Header */}
        <div className="auth-header">
          <span className="auth-logo">
            Ink<span>well</span>
          </span>
          <p className="auth-subtitle">Create your writing space</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group animate-fade-in-up delay-1">
            <label htmlFor="signup-name" className="form-label">Full name</label>
            <input
              type="text"
              id="signup-name"
              className="form-input"
              placeholder="Ada Lovelace"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group animate-fade-in-up delay-2">
            <label htmlFor="signup-email" className="form-label">Email address</label>
            <input
              type="email"
              id="signup-email"
              className="form-input"
              placeholder="ada@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group animate-fade-in-up delay-3">
            <label htmlFor="signup-password" className="form-label">Password</label>
            <input
              type="password"
              id="signup-password"
              className="form-input"
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>

          {/* Feedback message */}
          {message && (
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "var(--radius)",
                marginBottom: "16px",
                fontSize: "0.85rem",
                border: `1px solid ${message.type === "success" ? "var(--success)" : "var(--danger)"}`,
                color: message.type === "success" ? "var(--success)" : "var(--danger)",
                background:
                  message.type === "success"
                    ? "rgba(90,158,114,0.08)"
                    : "rgba(192,97,74,0.08)",
                animation: "fadeIn 0.3s ease",
              }}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            id="signup-submit-btn"
            className="btn btn-primary animate-fade-in-up delay-4"
            disabled={isPending}
            style={{ width: "100%", marginTop: 4 }}
          >
            {isPending ? (
              <>
                <span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                Creating account…
              </>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <div className="auth-footer animate-fade-in-up delay-5">
          Already have an account?{" "}
          <Link href="/api/auth/signin">Sign in</Link>
        </div>

        {/* OAuth divider */}
        <div style={{ margin: "28px 0 0", position: "relative", textAlign: "center" }}>
          <hr className="divider" style={{ margin: 0 }} />
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "var(--bg-card)",
              padding: "0 12px",
              fontSize: "0.72rem",
              color: "var(--text-faint)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            or continue with
          </span>
        </div>

        <div style={{ marginTop: 28, display: "flex", gap: 10 }}>
          <button
            id="signup-github-btn"
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="btn btn-ghost"
            style={{ flex: 1 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </button>
          <button
            id="signup-google-btn"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="btn btn-ghost"
            style={{ flex: 1 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
        </div>
      </div>
    </div>
  );
}