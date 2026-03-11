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