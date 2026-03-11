"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PostForm from "@/components/posts/PostForm";
import { createPost } from "@/lib/actions/post.actions";

export default function CreatePostClient() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async ({ title, content, tags }: { title: string; content: string; tags: string[] }) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await createPost({ title, content, tags, publish: true });
      router.push("/posts");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Page header */}
      <div className="section-header animate-fade-in-up">
        <h1 className="section-title">New Post</h1>
        <span style={{ fontSize: "0.8rem", color: "var(--text-faint)" }}>
          Draft · Not yet published
        </span>
      </div>

      {/* Inline error banner */}
      {error && (
        <div
          role="alert"
          style={{
            marginBottom: "1.5rem",
            padding: "12px 16px",
            borderRadius: 8,
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.35)",
            color: "#fca5a5",
            fontSize: "0.875rem",
          }}
        >
          {error}
        </div>
      )}

      <PostForm
        onSubmit={handleCreate}
        submitLabel="Publish post"
        isSubmitting={isSubmitting}
      />
    </>
  );
}
