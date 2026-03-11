import { notFound } from "next/navigation";
import Link from "next/link";
import PostDetail from "@/components/posts/PostDetail";

interface PostData {
  id: string;
  title: string;
  content: string;
  status: string;
  publishedAt: string | null;
  createdAt: string;
  author: { name: string; bio?: string };
  tags: { name: string }[];
}

async function getPost(id: string): Promise<PostData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/posts/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) notFound();

  return (
    <main className="page-content">
      <div style={{ paddingTop: 48 }}>
        {/* Back navigation */}
        <div className="animate-fade-in-up" style={{ marginBottom: 32 }}>
          <Link
            href="/posts"
            className="section-link"
            style={{ fontSize: "0.85rem" }}
          >
            ← Back to posts
          </Link>
        </div>

        <PostDetail
          title={post.title}
          content={post.content}
          author={post.author?.name ?? "Anonymous"}
          authorBio={post.author?.bio}
          tags={post.tags?.map((t) => t.name) ?? []}
        />
      </div>
    </main>
  );
}
