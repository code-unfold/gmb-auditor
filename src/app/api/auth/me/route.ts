import { NextRequest, NextResponse } from 'next/server';
import { getSessionTokenFromRequest } from '@/lib/auth/cookies';
import { verifySessionToken } from '@/lib/auth/token';
import { findUserById, sanitizeUser } from '@/lib/db/users';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const token = getSessionTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          user: null,
          error: 'Not authenticated'
        },
        { status: 401 }
      );
    }

    const { valid, payload, error } = verifySessionToken(token);
    if (!valid || !payload) {
      return NextResponse.json(
        {
          success: false,
          user: null,
          error: error || 'Invalid or expired session'
        },
        { status: 401 }
      );
    }

    const user = await findUserById(payload.userId);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          user: null,
          error: 'User account not found'
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: sanitizeUser(user)
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('Me route error:', err);
    return NextResponse.json(
      {
        success: false,
        user: null,
        error: err.message || 'Internal server error checking session'
      },
      { status: 500 }
    );
  }
}
