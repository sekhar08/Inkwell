import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  // Fetch published posts with author name and tags from the database
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
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
  return NextResponse.json(posts);
}
