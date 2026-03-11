"use server";

import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function createPost(input: { title: string; content: string; tags?: string[] }) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        throw new Error("Unauthorized: You must be logged in to create a post.");
    }

    const post = await prisma.post.create({
        data: {
            title: input.title,
            content: input.content,
            status: "DRAFT",
            authorId: session.user.id,
            tags: input.tags?.length
                ? {
                    create: input.tags.map((name) => ({ name })),
                }
                : undefined,
        },
        include: {
            tags: true,
            author: {
                select: { id: true, name: true, email: true, image: true },
            },
        },
    });

    return post;
}