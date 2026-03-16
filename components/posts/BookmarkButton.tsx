"use client";

import React, { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { toggleBookmark, getPostBookmarkStatus } from "@/lib/actions/post.actions";
import { useSession } from "next-auth/react";

type BookmarkButtonProps = {
  postId: string;
};

export default function BookmarkButton({ postId }: BookmarkButtonProps) {
  const { data: session } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      if (session?.user) {
        try {
          const status = await getPostBookmarkStatus(postId);
          setIsBookmarked(status);
        } catch (error) {
          console.error("Error fetching bookmark status:", error);
        }
      }
      setLoading(false);
    }
    fetchStatus();
  }, [postId, session]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      alert("Please sign in to bookmark posts.");
      return;
    }

    try {
      const result = await toggleBookmark(postId);
      setIsBookmarked(result.bookmarked);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  // No early return for !session

  return (
    <button
      onClick={handleToggle}
      className={`bookmark-btn ${isBookmarked ? "active" : ""}`}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      title={isBookmarked ? "Remove bookmark" : "Bookmark this post"}
      disabled={loading}
    >
      <Bookmark size={20} />
    </button>
  );
}
