import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getBookmarkedPosts } from "@/lib/actions/post.actions";
import PostList from "@/components/posts/PostList";
import Link from "next/link";

export default async function BookmarksPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/bookmarks");
  }

  let posts = [];
  try {
    posts = await getBookmarkedPosts();
  } catch (error) {
    console.error("Failed to fetch bookmarks:", error);
  }

  const mappedPosts = posts.map((post: any) => ({
    id: post.id,
    title: post.title,
    excerpt:
      post.content.replace(/<[^>]*>/g, "").slice(0, 150) +
      (post.content.length > 150 ? "…" : ""),
    author: post.author?.name || "Anonymous",
    tags: post.tags?.map((t: { name: string }) => t.name) || [],
  }));

  return (
    <main className="page-content">
      <div className="animate-fade-in-up" style={{ paddingTop: 48 }}>
        <div className="section-header">
          <h1 className="section-title">Your Bookmarks</h1>
          <Link href="/posts" className="section-link">
            Keep reading
          </Link>
        </div>

        {mappedPosts.length > 0 ? (
          <PostList posts={mappedPosts} />
        ) : (
          <div className="empty-state card">
            <h3>No bookmarks yet</h3>
            <p>Posts you bookmark will appear here for easy access.</p>
            <div style={{ marginTop: 24 }}>
              <Link href="/posts" className="btn btn-primary">
                Browse Posts
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
