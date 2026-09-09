import { NextRequest, NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/auth/cookies';

export const dynamic = 'force-dynamic';

export async function POST(_request: NextRequest) {
  const response = NextResponse.json(
    {
      success: true,
      message: 'Logged out successfully.'
    },
    { status: 200 }
  );

  clearSessionCookie(response);
  return response;
}

export async function GET(_request: NextRequest) {
  const response = NextResponse.json(
    {
      success: true,
      message: 'Logged out successfully.'
    },
    { status: 200 }
  );

  clearSessionCookie(response);
  return response;
}
