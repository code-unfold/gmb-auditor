import crypto from 'crypto';

const SALT_BYTE_LENGTH = 16; // 32 hex chars
const KEY_BYTE_LENGTH = 64;  // 128 hex chars

// scrypt options for standard secure password hashing
const SCRYPT_OPTIONS: crypto.ScryptOptions = {
  N: 16384, // CPU/memory cost
  r: 8,     // Block size
  p: 1,     // Parallelization
  maxmem: 32 * 1024 * 1024 // 32 MB max memory
};

const HEX_REGEX = /^[0-9a-fA-F]+$/;

/**
 * Hashes a plaintext password using crypto.scrypt with a unique random salt.
 * Output format: <salt_hex>:<hash_hex>
 */
export async function hashPassword(password: string): Promise<string> {
  if (!password || typeof password !== 'string') {
    throw new Error('Password must be a non-empty string');
  }

  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(SALT_BYTE_LENGTH);
    crypto.scrypt(password, salt, KEY_BYTE_LENGTH, SCRYPT_OPTIONS, (err, derivedKey) => {
      if (err) {
        return reject(err);
      }
      const saltHex = salt.toString('hex');
      const hashHex = derivedKey.toString('hex');
      resolve(`${saltHex}:${hashHex}`);
    });
  });
}

/**
 * Synchronous hash version for deterministic seeding if needed
 */
export function hashPasswordSync(password: string, fixedSaltHex?: string): string {
  if (!password || typeof password !== 'string') {
    throw new Error('Password must be a non-empty string');
  }
  const salt = fixedSaltHex ? Buffer.from(fixedSaltHex, 'hex') : crypto.randomBytes(SALT_BYTE_LENGTH);
  const derivedKey = crypto.scryptSync(password, salt, KEY_BYTE_LENGTH, SCRYPT_OPTIONS);
  return `${salt.toString('hex')}:${derivedKey.toString('hex')}`;
}

/**
 * Verifies a plaintext password against a stored <salt_hex>:<hash_hex> string using constant-time comparison.
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  if (!password || !storedHash || typeof password !== 'string' || typeof storedHash !== 'string') {
    return false;
  }

  const parts = storedHash.split(':');
  if (parts.length !== 2) {
    return false;
  }

  const [saltHex, expectedHashHex] = parts;
  if (!saltHex || !expectedHashHex) {
    return false;
  }

  // Strict hex format and length validation
  if (
    saltHex.length !== SALT_BYTE_LENGTH * 2 ||
    expectedHashHex.length !== KEY_BYTE_LENGTH * 2 ||
    !HEX_REGEX.test(saltHex) ||
    !HEX_REGEX.test(expectedHashHex)
  ) {
    return false;
  }

  try {
    const salt = Buffer.from(saltHex, 'hex');
    const expectedHash = Buffer.from(expectedHashHex, 'hex');

    if (expectedHash.length !== KEY_BYTE_LENGTH) {
      return false;
    }

    return new Promise((resolve) => {
      crypto.scrypt(password, salt, KEY_BYTE_LENGTH, SCRYPT_OPTIONS, (err, derivedKey) => {
        if (err) {
          return resolve(false);
        }

        try {
          // Timing-safe constant-time comparison prevents timing side-channel attacks
          const match = crypto.timingSafeEqual(derivedKey, expectedHash);
          resolve(match);
        } catch {
          resolve(false);
        }
      });
    });
  } catch {
    return false;
  }
}
