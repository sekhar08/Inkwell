"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PostForm from "@/components/posts/PostForm";

export default function CreatePostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async ({
    title,
    content,
    tags,
  }: {
    title: string;
    content: string;
    tags: string[];
  }) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, tags }),
      });
      if (res.ok) {
        router.push("/posts");
      } else {
        alert("Failed to create post. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-content">
      <div style={{ paddingTop: 48 }}>
        {/* Page header */}
        <div className="section-header animate-fade-in-up">
          <h1 className="section-title">New Post</h1>
          <span style={{ fontSize: "0.8rem", color: "var(--text-faint)" }}>
            Draft · Not yet published
          </span>
        </div>

        <PostForm
          onSubmit={handleCreate}
          submitLabel="Publish post"
          isSubmitting={isSubmitting}
        />
      </div>
    </main>
  );
}
