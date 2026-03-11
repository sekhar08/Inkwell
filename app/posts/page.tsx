import PostList from "@/components/posts/PostList";

interface Post {
  id: string;
  title: string;
  content: string;
  author?: { name: string };
  tags?: { name: string }[];
}

// This page fetches posts from the API and displays them using PostList
async function getPosts() {
  const res = await fetch("/api/posts", { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts() as Post[];
  // Map API data to PostList props shape if needed
  const mappedPosts = posts.map((post: Post) => ({
    id: post.id,
    title: post.title,
    excerpt: post.content.slice(0, 120) + (post.content.length > 120 ? "..." : ""),
    author: post.author?.name || "Unknown",
    tags: post.tags?.map((t: { name: string }) => t.name) || [],
  }));

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <PostList posts={mappedPosts} />
    </div>
  );
}
