import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, createUser } from '@/lib/db/users';
import { hashPassword } from '@/lib/auth/password';
import { createSessionToken } from '@/lib/auth/token';
import { setSessionCookie } from '@/lib/auth/cookies';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { name, email, password, company } = body;

    const errors: Record<string, string> = {};

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.name = 'Full name must be at least 2 characters long.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          errors
        },
        { status: 400 }
      );
    }

    // Check for duplicate account
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'An account with this email address already exists.'
        },
        { status: 409 }
      );
    }

    // Hash password with scrypt
    const passwordHash = await hashPassword(password);

    // Save user in persistent storage
    const user = await createUser({
      name: name.trim(),
      email: email.trim(),
      passwordHash,
      company: company && typeof company === 'string' ? company.trim() : undefined,
      role: 'user'
    });

    // Create session token
    const token = createSessionToken(user);

    // Prepare response with user and set session cookie
    const response = NextResponse.json(
      {
        success: true,
        user,
        message: 'Account created successfully.'
      },
      { status: 201 }
    );

    setSessionCookie(response, token);
    return response;
  } catch (err: any) {
    console.error('Signup error:', err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Internal server error while creating account.'
      },
      { status: 500 }
    );
  }
}
