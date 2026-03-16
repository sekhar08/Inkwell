"use server";

import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function createPost(input: { title: string; content: string; tags?: string[]; publish?: boolean }) {
    const { title, content, tags, publish } = input;

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        throw new Error("Unauthorized: You must be logged in to create a post.");
    }

    try {
        // Step 1: Create the post without nested tags
        // (PrismaNeonHttp doesn't support transactions, which Prisma
        //  uses implicitly for nested writes)
        const post = await prisma.post.create({
            data: {
                title,
                content,
                status: publish ? "PUBLISHED" : "DRAFT",
                publishedAt: publish ? new Date() : undefined,
                authorId: session.user.id,
            },
        });

        // Step 2: Create tags individually if provided
        if (tags?.length) {
            await Promise.all(
                tags.map((name) =>
                    prisma.tag.create({
                        data: { name, postId: post.id },
                    })
                )
            );
        }

        // Step 3: Re-fetch the post with relations
        const fullPost = await prisma.post.findUnique({
            where: { id: post.id },
            include: {
                tags: true,
                author: {
                    select: { id: true, name: true, email: true, image: true },
                },
            },
        });

        // Serialize to plain object — Date instances can't cross the
        // server-action → client boundary in Next.js
        return JSON.parse(JSON.stringify(fullPost));
    } catch (error: any) {
        console.error("createPost error:", error?.message);
        throw new Error(
            error?.message || "Failed to create post. Please try again."
        );
    }
}

export async function toggleBookmark(postId: string) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        throw new Error("Unauthorized: You must be logged in to bookmark a post.");
    }

    const userId = session.user.id;

    try {
        const existingBookmark = await prisma.bookmark.findFirst({
            where: {
                userId,
                postId,
            },
        });

        if (existingBookmark) {
            await prisma.bookmark.delete({
                where: {
                    id: existingBookmark.id,
                },
            });
            return { bookmarked: false };
        } else {
            await prisma.bookmark.create({
                data: {
                    userId,
                    postId,
                },
            });
            return { bookmarked: true };
        }
    } catch (error: any) {
        console.error("toggleBookmark error:", error?.message);
        throw new Error("Failed to toggle bookmark.");
    }
}

export async function getBookmarkedPosts() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        throw new Error("Unauthorized: You must be logged in to view bookmarks.");
    }

    try {
        const bookmarks = await prisma.bookmark.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                post: {
                    include: {
                        author: {
                            select: { name: true, image: true },
                        },
                        tags: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const posts = bookmarks.map((b) => b.post);
        return JSON.parse(JSON.stringify(posts));
    } catch (error: any) {
        console.error("getBookmarkedPosts error:", error?.message);
        throw new Error("Failed to fetch bookmarked posts.");
    }
}

export async function getPostBookmarkStatus(postId: string) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return false;
    }

    try {
        const bookmark = await prisma.bookmark.findFirst({
            where: {
                userId: session.user.id,
                postId,
            },
        });

        return !!bookmark;
    } catch (error) {
        return false;
    }
}