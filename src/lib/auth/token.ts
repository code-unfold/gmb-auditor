import crypto from 'crypto';
import { SessionPayload, SafeUser } from '@/types/auth';

const DEFAULT_SECRET = process.env.AUTH_SECRET || process.env.JWT_SECRET || 'gbp-auditor-secure-session-secret-key-32-chars-min';
const DEFAULT_SESSION_DURATION_SECONDS = 7 * 24 * 60 * 60; // 7 days

/**
 * Base64URL encoder without padding
 */
export function base64UrlEncode(input: string | Buffer): string {
  const buf = typeof input === 'string' ? Buffer.from(input, 'utf8') : input;
  return buf.toString('base64url');
}

/**
 * Base64URL decoder
 */
export function base64UrlDecode(input: string): string {
  return Buffer.from(input, 'base64url').toString('utf8');
}

export interface CreateTokenOptions {
  secret?: string;
  expiresInSeconds?: number;
}

/**
 * Creates an HMAC-SHA256 signed JWT session token
 */
export function createSessionToken(
  user: Pick<SafeUser, 'id' | 'email' | 'name' | 'role'>,
  options?: CreateTokenOptions
): string {
  const secret = options?.secret || DEFAULT_SECRET;
  const expiresInSeconds = options?.expiresInSeconds || DEFAULT_SESSION_DURATION_SECONDS;

  const nowSeconds = Math.floor(Date.now() / 1000);
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const payload: SessionPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    iat: nowSeconds,
    exp: nowSeconds + expiresInSeconds
  };

  const headerB64 = base64UrlEncode(JSON.stringify(header));
  const payloadB64 = base64UrlEncode(JSON.stringify(payload));
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${headerB64}.${payloadB64}`)
    .digest('base64url');

  return `${headerB64}.${payloadB64}.${signature}`;
}

export interface VerifyTokenResult {
  valid: boolean;
  payload?: SessionPayload;
  error?: string;
}

/**
 * Verifies an HMAC-SHA256 signed JWT session token with timing-safe comparison
 */
export function verifySessionToken(
  token: string,
  secret: string = DEFAULT_SECRET
): VerifyTokenResult {
  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'Empty or invalid token format' };
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return { valid: false, error: 'Malformed JWT structure' };
  }

  const [headerB64, payloadB64, signature] = parts;

  try {
    // 1. Verify header
    const headerStr = base64UrlDecode(headerB64);
    const header = JSON.parse(headerStr);
    if (header.alg !== 'HS256' || header.typ !== 'JWT') {
      return { valid: false, error: 'Unsupported algorithm or token type' };
    }

    // 2. Verify signature with constant-time comparison
    const expectedSig = crypto
      .createHmac('sha256', secret)
      .update(`${headerB64}.${payloadB64}`)
      .digest('base64url');

    const sigBuf = Buffer.from(signature, 'utf8');
    const expectedSigBuf = Buffer.from(expectedSig, 'utf8');

    if (sigBuf.length !== expectedSigBuf.length) {
      return { valid: false, error: 'Invalid token signature length' };
    }

    if (!crypto.timingSafeEqual(sigBuf, expectedSigBuf)) {
      return { valid: false, error: 'Signature verification failed' };
    }

    // 3. Verify payload & expiration
    const payloadStr = base64UrlDecode(payloadB64);
    const payload: SessionPayload = JSON.parse(payloadStr);

    const nowSeconds = Math.floor(Date.now() / 1000);
    if (typeof payload.exp === 'number' && nowSeconds > payload.exp) {
      return { valid: false, error: 'Token has expired' };
    }

    return { valid: true, payload };
  } catch (err) {
    return { valid: false, error: (err as Error).message || 'Failed to decode token' };
  }
}
