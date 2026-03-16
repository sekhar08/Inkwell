import { notFound } from "next/navigation";
import Link from "next/link";
import PostDetail from "@/components/posts/PostDetail";
import { prisma } from "@/lib/db";

async function getPost(id: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: { name: true, bio: true },
        },
        tags: {
          select: { name: true },
        },
      },
    });
    return post;
  } catch (error) {
    console.error("Failed to fetch post:", error);
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
          id={post.id}
          title={post.title}
          content={post.content}
          author={post.author?.name ?? "Anonymous"}
          authorBio={post.author?.bio ?? undefined}
          tags={post.tags?.map((t) => t.name) ?? []}
        />
      </div>
    </main>
  );
}
