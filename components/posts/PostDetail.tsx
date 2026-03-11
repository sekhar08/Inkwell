import React from "react";

type PostDetailProps = {
  title: string;
  content: string;
  author: string;
  tags: string[];
  authorBio?: string;
};

export default function PostDetail({ title, content, author, tags, authorBio }: PostDetailProps) {
  return (
    <div className="bg-white rounded shadow p-6">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <div className="mb-4 text-gray-700" dangerouslySetInnerHTML={{ __html: content }} />
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{tag}</span>
        ))}
      </div>
      <div className="mt-6 border-t pt-4">
        <div className="font-semibold">By {author}</div>
        {authorBio && <div className="text-gray-500 text-sm mt-1">{authorBio}</div>}
      </div>
    </div>
  );
}
