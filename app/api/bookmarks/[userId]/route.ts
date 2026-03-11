import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest, context: { params: Promise<{ userId: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { userId } = await context.params;

    // Fetch all bookmarked posts for the user
    const bookmarkedPosts = await prisma.bookmark.findMany({
        where: { userId },
        include: {
            post: {
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
            }
        }
    });
    return NextResponse.json(bookmarkedPosts);
}