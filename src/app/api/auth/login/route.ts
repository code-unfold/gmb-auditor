import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, sanitizeUser } from '@/lib/db/users';
import { verifyPassword } from '@/lib/auth/password';
import { createSessionToken } from '@/lib/auth/token';
import { setSessionCookie } from '@/lib/auth/cookies';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, password } = body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'Email and password are required.'
        },
        { status: 400 }
      );
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email or password.'
        },
        { status: 401 }
      );
    }

    const isMatch = await verifyPassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email or password.'
        },
        { status: 401 }
      );
    }

    const safeUser = sanitizeUser(user);
    const token = createSessionToken(safeUser);

    const response = NextResponse.json(
      {
        success: true,
        user: safeUser,
        message: 'Login successful.'
      },
      { status: 200 }
    );

    setSessionCookie(response, token);
    return response;
  } catch (err: any) {
    console.error('Login error:', err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Internal server error during login.'
      },
      { status: 500 }
    );
  }
}
