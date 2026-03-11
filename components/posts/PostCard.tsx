import React from "react";

type PostCardProps = {
  title: string;
  excerpt: string;
  author: string;
  tags: string[];
};

export default function PostCard({ title, excerpt, author, tags }: PostCardProps) {
  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700 mb-2">{excerpt}</p>
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <span>By {author}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{tag}</span>
        ))}
      </div>
    </div>
  );
}
