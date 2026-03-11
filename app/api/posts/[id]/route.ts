import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id: postId } = await context.params;

  // Fetch the post with author name and tags from the database
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: {
        select: {
          name: true
        }
      },
      tags: {
        select: {
          name: true
        }
      }
    }
  });

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}