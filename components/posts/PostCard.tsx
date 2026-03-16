import React from "react";
import Link from "next/link";
import BookmarkButton from "./BookmarkButton";

type PostCardProps = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  tags: string[];
};

export default function PostCard({ id, title, excerpt, author, tags }: PostCardProps) {
  return (
    <div className="post-card-wrapper" style={{ position: "relative" }}>
      <Link href={`/posts/${id}`} style={{ textDecoration: "none", display: "block" }}>
        <article className="post-card">
          <div className="post-card-header" style={{ paddingRight: "40px" }}>
            <h3 className="post-card-title">{title}</h3>
          </div>
          <p className="post-card-excerpt">{excerpt}</p>

          <div className="post-card-meta">
            <span>By <span className="author-name-vintage">{author}</span></span>
            <span className="separator">·</span>
            <span>Read more →</span>
          </div>

          {/* Tags at the bottom, subdued */}
          {tags.length > 0 && (
            <div className="tags-row tags-subtle" style={{ marginTop: 14 }}>
              {tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tag tag-light">
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="tag tag-light" style={{ opacity: 0.5 }}>+{tags.length - 3}</span>
              )}
            </div>
          )}
        </article>
      </Link>
      <div style={{ position: "absolute", top: "28px", right: "32px", zIndex: 10 }}>
        <BookmarkButton postId={id} />
      </div>
    </div>
  );
}
