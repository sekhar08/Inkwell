import BookmarkButton from "./BookmarkButton";

type PostDetailProps = {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  authorBio?: string;
};

export default function PostDetail({ id, title, content, author, tags, authorBio }: PostDetailProps) {
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <article className="post-detail animate-fade-in-up">
      {/* Title */}
      <header className="post-detail-header" style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: 0, right: 0 }}>
          <BookmarkButton postId={id} />
        </div>
        <h1 className="post-detail-title delay-2 animate-fade-in-up" style={{ paddingRight: 48 }}>{title}</h1>

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

      {/* Tags — subtle, at the very bottom */}
      {tags.length > 0 && (
        <div className="tags-row tags-subtle delay-6 animate-fade-in-up" style={{ marginTop: 24 }}>
          {tags.map((tag) => (
            <span key={tag} className="tag tag-light">
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
