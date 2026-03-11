"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  // Don't show navbar on auth pages
  const isAuthPage =
    pathname?.startsWith("/signup") || pathname?.startsWith("/login");
  if (isAuthPage) return null;

  return (
    <nav className="navbar animate-fade-in">
      <div className="navbar-inner">
        {/* Logo */}
        <Link href="/" className="navbar-logo" style={{ letterSpacing: "-0.03em" }}>
          Ink<span>well</span>
        </Link>

        {/* Nav Actions */}
        <div className="navbar-actions">
          {session ? (
            <>
              <Link href="/posts" className="btn btn-ghost btn-sm">
                Read
              </Link>
              <Link href="/posts/create" className="btn btn-primary btn-sm">
                + Write
              </Link>
              <div className="user-badge">
                <div
                  className="user-avatar-sm"
                  title={session.user?.email ?? ""}
                >
                  {session.user?.name
                    ? session.user.name[0].toUpperCase()
                    : session.user?.email?.[0].toUpperCase() ?? "U"}
                </div>
              </div>
              <button
                onClick={() => signOut()}
                className="btn btn-ghost btn-sm"
                id="navbar-signout-btn"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => signIn()}
                className="btn btn-ghost btn-sm"
                id="navbar-signin-btn"
              >
                Sign in
              </button>
              <Link href="/signup" className="btn btn-primary btn-sm" id="navbar-signup-link">
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
