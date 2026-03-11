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
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
