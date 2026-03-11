import React from "react";
import Link from "next/link";

type PostCardProps = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  tags: string[];
};

export default function PostCard({ id, title, excerpt, author, tags }: PostCardProps) {
  return (
    <Link href={`/posts/${id}`} style={{ textDecoration: "none", display: "block" }}>
      <article className="post-card">
        {/* Tags row at top */}
        {tags.length > 0 && (
          <div className="tags-row" style={{ marginBottom: 12 }}>
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="tag" style={{ opacity: 0.6 }}>+{tags.length - 3}</span>
            )}
          </div>
        )}

        <h3 className="post-card-title">{title}</h3>
        <p className="post-card-excerpt">{excerpt}</p>

        <div className="post-card-meta">
          <span>By {author}</span>
          <span className="separator">·</span>
          <span>Read more →</span>
        </div>
      </article>
    </Link>
  );
}
