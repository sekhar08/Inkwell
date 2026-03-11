import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  const userId = params.userId;

  // Fetch all bookmarked posts for the user
  const bookmarkedPosts = await prisma.bookmark.findMany({
    where: { userId },
    include: {
      post: {
        include: {
            post: {
                select: {
                    id: true,
                    title: true,
                    content: true,
                }
            },
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
      }
    }
  });

  return NextResponse.json(bookmarkedPosts);
}