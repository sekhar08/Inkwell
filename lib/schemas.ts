import { z } from "zod";

export const SignupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(1),
    role: z.enum(["AUTHOR", "READER"]),
});

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export const CreatePostSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(50),
    excerpt: z.string().optional(),
    status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
});

export const UpdatePostSchema = z.object({
    title: z.string().min(1).optional(),
    content: z.string().min(50).optional(),
    excerpt: z.string().optional(),
    status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

export const CreateTagSchema = z.object({
    name: z.string().min(1),
    postId: z.string().uuid(),
});

export const BookmarkSchema = z.object({
    postId: z.string().uuid(),
});