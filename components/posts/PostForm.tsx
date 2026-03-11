import React, { useState } from "react";
import PublishButton from "./PublishButton";

type PostFormProps = {
  initialTitle?: string;
  initialContent?: string;
  initialTags?: string[];
  onSubmit: (data: { title: string; content: string; tags: string[] }) => void;
  submitLabel?: string;
};

export default function PostForm({ initialTitle = "", initialContent = "", initialTags = [], onSubmit }: PostFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [tags, setTags] = useState(initialTags.join(", "));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      content,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6">
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Title</label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Content</label>
        <textarea
          className="w-full border px-3 py-2 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Tags (comma separated)</label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <PublishButton onClick={() => {}} disabled={false} />
    </form>
  );
}
