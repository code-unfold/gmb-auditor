import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { User, SafeUser } from '@/types/auth';
import { hashPasswordSync } from '@/lib/auth/password';

// Dynamic storage path resolution with fallback
const getStoragePath = () => {
  if (process.env.USERS_DB_PATH) return process.env.USERS_DB_PATH;
  const projectDir = path.resolve(__dirname, '../../..');
  const dataDir = path.join(projectDir, 'data');
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  } catch {}
  return path.join(dataDir, 'users.json');
};
const STORAGE_PATH = getStoragePath();

// Demo User Credentials as specified in requirements
export const DEMO_USER_CONFIG = {
  id: 'usr_demo_001',
  name: 'Demo User',
  email: 'demo@gbpauditor.com',
  password: 'DemoPassword123!',
  company: 'GBP Growth Partners',
  role: 'user' as const,
  savedAudits: [
    'audit_demo_austin_plumbing_2026',
    'audit_demo_downtown_dental_2026'
  ]
};

// Write queue lock to ensure atomic read-modify-write operations
let writeQueue: Promise<void> = Promise.resolve();

/**
 * Sanitizes a User model by stripping sensitive fields like passwordHash
 */
export function sanitizeUser(user: User): SafeUser {
  const { passwordHash: _, ...safeUser } = user;
  return safeUser;
}

/**
 * Ensures data directory exists and data/users.json is seeded if missing
 */
export function ensureUsersStorage(): User[] {
  const dir = path.dirname(STORAGE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(STORAGE_PATH)) {
    const demoPasswordHash = hashPasswordSync(DEMO_USER_CONFIG.password);
    const initialUsers: User[] = [
      {
        id: DEMO_USER_CONFIG.id,
        name: DEMO_USER_CONFIG.name,
        email: DEMO_USER_CONFIG.email.toLowerCase(),
        passwordHash: demoPasswordHash,
        company: DEMO_USER_CONFIG.company,
        role: DEMO_USER_CONFIG.role,
        createdAt: new Date().toISOString(),
        savedAudits: [...DEMO_USER_CONFIG.savedAudits]
      }
    ];

    fs.writeFileSync(STORAGE_PATH, JSON.stringify(initialUsers, null, 2), 'utf8');
    return initialUsers;
  }

  try {
    const content = fs.readFileSync(STORAGE_PATH, 'utf8');
    if (!content.trim()) {
      throw new Error('Empty file');
    }
    const parsed = JSON.parse(content);
    if (!Array.isArray(parsed)) {
      throw new Error('Invalid format');
    }
    return parsed as User[];
  } catch (err) {
    // If corrupted or empty, reseed demo user
    const demoPasswordHash = hashPasswordSync(DEMO_USER_CONFIG.password);
    const recoveredUsers: User[] = [
      {
        id: DEMO_USER_CONFIG.id,
        name: DEMO_USER_CONFIG.name,
        email: DEMO_USER_CONFIG.email.toLowerCase(),
        passwordHash: demoPasswordHash,
        company: DEMO_USER_CONFIG.company,
        role: DEMO_USER_CONFIG.role,
        createdAt: new Date().toISOString(),
        savedAudits: [...DEMO_USER_CONFIG.savedAudits]
      }
    ];
    fs.writeFileSync(STORAGE_PATH, JSON.stringify(recoveredUsers, null, 2), 'utf8');
    return recoveredUsers;
  }
}

/**
 * Reads all users from file
 */
export async function getAllUsers(): Promise<User[]> {
  ensureUsersStorage();
  try {
    const content = await fs.promises.readFile(STORAGE_PATH, 'utf8');
    return JSON.parse(content) as User[];
  } catch {
    return ensureUsersStorage();
  }
}

/**
 * Writes users to disk atomically using temporary file rename
 */
async function persistUsers(users: User[]): Promise<void> {
  const dir = path.dirname(STORAGE_PATH);
  if (!fs.existsSync(dir)) {
    await fs.promises.mkdir(dir, { recursive: true });
  }

  const tempPath = `${STORAGE_PATH}.tmp.${crypto.randomBytes(6).toString('hex')}`;
  const jsonContent = JSON.stringify(users, null, 2);

  await fs.promises.writeFile(tempPath, jsonContent, 'utf8');
  await fs.promises.rename(tempPath, STORAGE_PATH);
}

/**
 * Executes a write operation serially to avoid race conditions
 */
function enqueueWrite<T>(operation: () => Promise<T>): Promise<T> {
  const resultPromise = writeQueue.then(operation);
  writeQueue = resultPromise.then(() => {}).catch(() => {});
  return resultPromise;
}

/**
 * Finds a user by email (case-insensitive)
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  if (!email) return null;
  const normalizedEmail = email.trim().toLowerCase();
  const users = await getAllUsers();
  return users.find(u => u.email.toLowerCase() === normalizedEmail) || null;
}

/**
 * Finds a user by unique ID
 */
export async function findUserById(id: string): Promise<User | null> {
  if (!id) return null;
  const users = await getAllUsers();
  return users.find(u => u.id === id) || null;
}

/**
 * Creates and persists a new user
 */
export async function createUser(data: {
  name: string;
  email: string;
  passwordHash: string;
  company?: string;
  role?: 'user' | 'admin';
}): Promise<SafeUser> {
  return enqueueWrite(async () => {
    const users = await getAllUsers();
    const normalizedEmail = data.email.trim().toLowerCase();

    // Prevent duplicate emails
    const existing = users.find(u => u.email.toLowerCase() === normalizedEmail);
    if (existing) {
      throw new Error('User with this email already exists');
    }

    const newUser: User = {
      id: `usr_${crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(12).toString('hex')}`,
      name: data.name.trim(),
      email: normalizedEmail,
      passwordHash: data.passwordHash,
      company: data.company ? data.company.trim() : '',
      role: data.role || 'user',
      createdAt: new Date().toISOString(),
      savedAudits: []
    };

    users.push(newUser);
    await persistUsers(users);

    return sanitizeUser(newUser);
  });
}

/**
 * Updates a user by ID
 */
export async function updateUser(
  id: string,
  updates: Partial<Pick<User, 'name' | 'company' | 'passwordHash' | 'savedAudits'>>
): Promise<SafeUser | null> {
  return enqueueWrite(async () => {
    const users = await getAllUsers();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
      return null;
    }

    const existing = users[index];
    const updated: User = {
      ...existing,
      ...updates,
      id: existing.id,
      email: existing.email, // email is immutable here
      createdAt: existing.createdAt
    };

    users[index] = updated;
    await persistUsers(users);

    return sanitizeUser(updated);
  });
}

/**
 * Adds an audit ID to the user's saved audits list
 */
export async function addSavedAuditToUser(userId: string, auditId: string): Promise<SafeUser | null> {
  return enqueueWrite(async () => {
    const users = await getAllUsers();
    const user = users.find(u => u.id === userId);
    if (!user) return null;

    if (!user.savedAudits.includes(auditId)) {
      user.savedAudits.push(auditId);
      await persistUsers(users);
    }

    return sanitizeUser(user);
  });
}
