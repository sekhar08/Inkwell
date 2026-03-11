import React from "react";
import PostCard from "./PostCard";

type Post = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  tags: string[];
};

type PostListProps = {
  posts: Post[];
};

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <h3>No posts yet</h3>
        <p>Be the first to share your ideas with the world.</p>
      </div>
    );
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
