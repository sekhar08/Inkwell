"use server";

import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";
import { signIn } from "next-auth/react";

export async function signup({ name, email, password }: { name: string; email: string; password: string }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const response = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return response;
}

export async function login({ email, password }: { email: string; password: string }) {
    const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
    });

    if (!result?.ok) {
        throw new Error(result?.error || "Invalid credentials");
    }

    return result;
}