import PostList from "@/components/posts/PostList";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      include: {
        author: {
          select: { name: true },
        },
        tags: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return posts;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export default async function PostsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/");
  }

  const posts = await getPosts();

  const mappedPosts = posts.map((post) => ({
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
