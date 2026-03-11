"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="loading-screen animate-fade-in">
        <div className="spinner" />
        <p>Loading</p>
      </div>
    );
  }

  if (!session) {
    return (
      <main className="page-content">
        <section className="hero-section animate-fade-in-up">
          {/* Radial background decoration */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 700px 500px at 50% -5%, rgba(201,169,110,0.08) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />

          <span className="hero-eyebrow delay-1 animate-fade-in-up">
            ✦ A place for thoughtful writing
          </span>

          <h1 className="hero-title delay-2 animate-fade-in-up">
            Write boldly.<br />
            Share your <em>ideas.</em>
          </h1>

          <p className="hero-desc delay-3 animate-fade-in-up">
            Inkwell is a minimal platform for long-form writing. Craft
            essays, stories, and thoughts — then publish to the world.
            No noise, just words.
          </p>

          <div className="hero-actions delay-4 animate-fade-in-up">
            <button
              id="home-signin-btn"
              onClick={() => signIn()}
              className="btn btn-primary btn-lg"
            >
              Start writing
            </button>
            <Link href="/signup" className="btn btn-ghost btn-lg" id="home-signup-link">
              Create account
            </Link>
          </div>

          {/* Feature pills */}
          <div
            className="delay-5 animate-fade-in-up"
            style={{
              marginTop: 48,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {["Markdown support", "Tag taxonomy", "Instant publishing", "Clean reading"].map(
              (f) => (
                <span
                  key={f}
                  style={{
                    padding: "6px 14px",
                    border: "1px solid var(--border)",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.05em",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {f}
                </span>
              )
            )}
          </div>
        </section>
      </main>
    );
  }

  // Signed in — redirect prompt
  return (
    <main className="page-content">
      <section className="hero-section animate-fade-in-up">
        <span className="hero-eyebrow animate-fade-in-up delay-1">
          Welcome back
        </span>
        <h1
          className="hero-title animate-fade-in-up delay-2"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
        >
          Ready to write,{" "}
          <em>{session.user?.name || session.user?.email?.split("@")[0]}?</em>
        </h1>
        <p className="hero-desc animate-fade-in-up delay-3">
          Your next great piece is waiting to be written.
        </p>
        <div className="hero-actions animate-fade-in-up delay-4">
          <Link
            href="/posts/create"
            className="btn btn-primary btn-lg"
            id="home-write-btn"
          >
            + New post
          </Link>
          <Link href="/posts" className="btn btn-ghost btn-lg" id="home-read-btn">
            Browse posts
          </Link>
        </div>
      </section>
    </main>
  );
}
