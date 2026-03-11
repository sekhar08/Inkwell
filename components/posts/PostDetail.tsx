import React from "react";

type PostDetailProps = {
  title: string;
  content: string;
  author: string;
  tags: string[];
  authorBio?: string;
};

export default function PostDetail({ title, content, author, tags, authorBio }: PostDetailProps) {
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <article className="post-detail animate-fade-in-up">
      {/* Tags */}
      {tags.length > 0 && (
        <div className="tags-row delay-1 animate-fade-in-up" style={{ marginBottom: 20 }}>
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <header className="post-detail-header">
        <h1 className="post-detail-title delay-2 animate-fade-in-up">{title}</h1>

        {/* Author line */}
        <div
          className="delay-3 animate-fade-in-up"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            paddingBottom: 28,
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="author-avatar" style={{ width: 34, height: 34, fontSize: "0.8rem" }}>
            {initials}
          </div>
          <span>
            By <strong style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>{author}</strong>
          </span>
        </div>
      </header>

      {/* Content */}
      <div
        className="post-detail-content delay-4 animate-fade-in-up"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Author bio */}
      <div className="author-bio delay-5 animate-fade-in-up">
        <div className="author-avatar">{initials}</div>
        <div>
          <div className="author-info-name">{author}</div>
          {authorBio && (
            <div className="author-info-bio">{authorBio}</div>
          )}
        </div>
      </div>
    </article>
  );
}
