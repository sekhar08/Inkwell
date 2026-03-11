"use client";
import { useRouter } from "next/navigation";
import PostForm from "@/components/posts/PostForm";

export default function CreatePostPage() {
  const router = useRouter();

  const handleCreate = async ({ title, content, tags }: { title: string; content: string; tags: string[] }) => {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, tags }),
    });
    if (res.ok) {
      router.push("/posts");
    } else {
      alert("Failed to create post");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Create Post</h1>
      <PostForm onSubmit={handleCreate} submitLabel="Create Post" />
    </div>
  );
}
