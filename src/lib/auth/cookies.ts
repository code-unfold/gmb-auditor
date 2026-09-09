import { NextRequest, NextResponse } from 'next/server';

export const SESSION_COOKIE_NAME = 'gbp_session';
export const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

export interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'lax' | 'strict' | 'none';
  path?: string;
  maxAge?: number;
}

export function getDefaultCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS
  };
}

/**
 * Builds the Set-Cookie header string for establishing a session
 */
export function serializeSessionCookie(token: string, customOptions?: Partial<CookieOptions>): string {
  const options = { ...getDefaultCookieOptions(), ...customOptions };
  const parts: string[] = [`${SESSION_COOKIE_NAME}=${token}`];

  if (options.path) parts.push(`Path=${options.path}`);
  if (options.maxAge !== undefined) parts.push(`Max-Age=${options.maxAge}`);
  if (options.httpOnly) parts.push('HttpOnly');
  if (options.sameSite) parts.push(`SameSite=${options.sameSite.charAt(0).toUpperCase() + options.sameSite.slice(1)}`);
  if (options.secure) parts.push('Secure');

  return parts.join('; ');
}

/**
 * Builds the Set-Cookie header string to expire/clear the session
 */
export function serializeLogoutCookie(): string {
  return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

/**
 * Attaches the session cookie to a Next.js NextResponse object
 */
export function setSessionCookie(response: NextResponse, token: string): void {
  const opts = getDefaultCookieOptions();
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: opts.httpOnly,
    secure: opts.secure,
    sameSite: opts.sameSite,
    path: opts.path,
    maxAge: opts.maxAge
  });
}

/**
 * Clears the session cookie on a Next.js NextResponse object
 */
export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
    expires: new Date(0)
  });
}

/**
 * Extracts the session token from a NextRequest or standard Request
 */
export function getSessionTokenFromRequest(request: NextRequest | Request): string | null {
  // If NextRequest with .cookies API
  if ('cookies' in request && typeof request.cookies?.get === 'function') {
    const cookie = request.cookies.get(SESSION_COOKIE_NAME);
    if (cookie?.value) {
      return cookie.value;
    }
  }

  // Fallback to manual Cookie header parsing
  const cookieHeader = request.headers.get('cookie') || '';
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(';');
  for (const raw of cookies) {
    const [name, ...valParts] = raw.trim().split('=');
    if (name === SESSION_COOKIE_NAME) {
      return decodeURIComponent(valParts.join('='));
    }
  }

  return null;
}
