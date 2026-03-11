import PostList from "@/components/posts/PostList";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  content: string;
  author?: { name: string };
  tags?: { name: string }[];
}

async function getPosts() {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/posts`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function PostsPage() {
  const posts = (await getPosts()) as Post[];

  const mappedPosts = posts.map((post: Post) => ({
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
          <h1 className="section-title">Latest Posts</h1>
          <Link href="/posts/create" className="section-link" id="posts-page-write-link">
            + Write a post
          </Link>
        </div>

        <PostList posts={mappedPosts} />
      </div>
    </main>
  );
}
