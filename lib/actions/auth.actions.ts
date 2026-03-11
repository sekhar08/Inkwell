"use server";

import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";

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
