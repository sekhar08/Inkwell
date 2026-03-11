"use client";

import React, { useState } from "react";

type PostFormProps = {
  initialTitle?: string;
  initialContent?: string;
  initialTags?: string[];
  onSubmit: (data: { title: string; content: string; tags: string[] }) => void;
  submitLabel?: string;
  isSubmitting?: boolean;
};

export default function PostForm({
  initialTitle = "",
  initialContent = "",
  initialTags = [],
  onSubmit,
  submitLabel = "Publish",
  isSubmitting = false,
}: PostFormProps) {
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

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in-up">
      {/* Title input — large, display font */}
      <div className="form-group delay-1 animate-fade-in-up">
        <label htmlFor="post-title" className="form-label">Title</label>
        <input
          id="post-title"
          className="form-input"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.1rem",
            fontWeight: 600,
            padding: "14px 18px",
          }}
          placeholder="Give your post a compelling title…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Content textarea */}
      <div className="form-group delay-2 animate-fade-in-up">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label htmlFor="post-content" className="form-label">Content</label>
          <span style={{ fontSize: "0.72rem", color: "var(--text-faint)" }}>
            {wordCount} {wordCount === 1 ? "word" : "words"}
          </span>
        </div>
        <textarea
          id="post-content"
          className="form-textarea"
          style={{ minHeight: 320 }}
          placeholder="Start writing your post here. HTML is supported…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      {/* Tags input */}
      <div className="form-group delay-3 animate-fade-in-up">
        <label htmlFor="post-tags" className="form-label">Tags</label>
        <input
          id="post-tags"
          className="form-input"
          placeholder="writing, technology, ideas (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        {/* Live tag preview */}
        {tags.trim() && (
          <div className="tags-row" style={{ marginTop: 8 }}>
            {tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
              .map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="delay-4 animate-fade-in-up" style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => history.back()}
        >
          Cancel
        </button>
        <button
          id="post-form-submit-btn"
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting || !title.trim() || !content.trim()}
        >
          {isSubmitting ? (
            <>
              <span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} />
              Publishing…
            </>
          ) : (
            <>✦ {submitLabel}</>
          )}
        </button>
      </div>
    </form>
  );
}
