"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <p className="text-zinc-500 dark:text-zinc-400 text-lg">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
            You are not signed in
          </h1>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => signIn()}
              className="px-6 py-2 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-medium hover:opacity-80 transition"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="px-6 py-2 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-medium hover:opacity-80 transition"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="text-center space-y-4">
        <p className="text-zinc-500 dark:text-zinc-400 text-lg">
          {session.user?.email}
        </p>
        <button
          onClick={() => signOut()}
          className="px-6 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
