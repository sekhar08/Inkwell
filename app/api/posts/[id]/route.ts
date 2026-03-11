
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const postId = params.id;

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