const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Setup Babel registration for TypeScript files
require('@babel/register')({
  extensions: ['.ts', '.tsx', '.js'],
  presets: ['@babel/preset-typescript'], plugins: ['@babel/plugin-transform-modules-commonjs']
});

// Configure module alias for @/ and next/server
const Module = require('module');
const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  if (request === 'next/server') {
    return 'next/server';
  }
  if (request.startsWith('@/')) {
    const relativePath = request.slice(2);
    const resolvedPath = path.resolve(__dirname, '../src', relativePath);
    return originalResolveFilename.call(this, resolvedPath, parent, isMain, options);
  }
  return originalResolveFilename.call(this, request, parent, isMain, options);
};

// Mock Next.js NextResponse & NextRequest for testing route handlers
global.NextResponse = class MockNextResponse {
  constructor(body, init = {}) {
    this._body = body;
    this.status = init.status || 200;
    this.headers = new Map(Object.entries(init.headers || {}));
    this.cookies = {
      _cookies: new Map(),
      set(nameOrObj, val, opts) {
        if (typeof nameOrObj === 'object') {
          this._cookies.set(nameOrObj.name, { value: nameOrObj.value, options: nameOrObj });
        } else {
          this._cookies.set(nameOrObj, { value: val, options: opts });
        }
      },
      get(name) {
        return this._cookies.get(name);
      }
    };
  }
  static json(data, init = {}) {
    return new MockNextResponse(data, init);
  }
  json() {
    return Promise.resolve(this._body);
  }
};

global.NextRequest = class MockNextRequest {
  constructor(url, init = {}) {
    this.url = url;
    this.method = init.method || 'GET';
    this._body = init.body;
    this.headers = new Map(Object.entries(init.headers || {}));
    this.cookies = {
      _cookies: new Map(),
      get(name) {
        const val = this._cookies.get(name);
        return val !== undefined ? { name, value: val } : undefined;
      },
      set(name, value) {
        this._cookies.set(name, value);
      }
    };
    if (init.headers && init.headers.cookie) {
      this.headers.set('cookie', init.headers.cookie);
      const parts = init.headers.cookie.split(';');
      for (const p of parts) {
        const [k, v] = p.trim().split('=');
        if (k && v) {
          this.cookies.set(k, v);
        }
      }
    }
  }
  json() {
    return Promise.resolve(typeof this._body === 'string' ? JSON.parse(this._body) : (this._body || {}));
  }
};

const mockNextServer = {
  NextResponse: global.NextResponse,
  NextRequest: global.NextRequest
};

require.cache['next/server'] = {
  id: 'next/server',
  filename: 'next/server',
  loaded: true,
  exports: mockNextServer
};


async function runTests() {
  console.log('=====================================================');
  console.log('GBP AUDITOR - AUTHENTICATION SUITE VERIFICATION');
  console.log('=====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      failed++;
    }
  }

  // 1. Test Password Hashing & Verification
  console.log('--- 1. Testing Password Hashing & Constant-time Verification ---');
  const { hashPassword, verifyPassword, hashPasswordSync } = require('@/lib/auth/password');

  const plainPassword = 'DemoPassword123!';
  const hash1 = await hashPassword(plainPassword);
  assert(typeof hash1 === 'string' && hash1.includes(':'), 'hashPassword produces salt:hash format');

  const isMatchCorrect = await verifyPassword(plainPassword, hash1);
  assert(isMatchCorrect === true, 'verifyPassword returns true for correct password');

  const isMatchWrong = await verifyPassword('WrongPassword999', hash1);
  assert(isMatchWrong === false, 'verifyPassword returns false for wrong password');

  const isMatchTampered = await verifyPassword(plainPassword, hash1 + 'tamper');
  assert(isMatchTampered === false, 'verifyPassword handles tampered hash cleanly');

  // 2. Test Session Token Creation & Verification
  console.log('\n--- 2. Testing HMAC-SHA256 JWT Session Tokens ---');
  const { createSessionToken, verifySessionToken } = require('@/lib/auth/token');

  const mockUser = {
    id: 'usr_test_123',
    email: 'tester@agency.com',
    name: 'Test Auditor',
    role: 'user'
  };

  const token = createSessionToken(mockUser);
  assert(typeof token === 'string' && token.split('.').length === 3, 'createSessionToken returns valid 3-segment JWT');

  const verifyResult = verifySessionToken(token);
  assert(verifyResult.valid === true, 'verifySessionToken validates legitimate token');
  assert(verifyResult.payload && verifyResult.payload.userId === mockUser.id, 'verifySessionToken decodes user payload correctly');
  assert(verifyResult.payload && verifyResult.payload.email === mockUser.email, 'payload contains correct user email');

  // Test tampered token signature
  const [h, p, s] = token.split('.');
  const tamperedToken = `${h}.${p}.tamperedSignature1234567890`;
  const tamperedResult = verifySessionToken(tamperedToken);
  assert(tamperedResult.valid === false, 'verifySessionToken rejects tampered signature');

  // Test expired token
  const expiredToken = createSessionToken(mockUser, { expiresInSeconds: -10 });
  const expiredResult = verifySessionToken(expiredToken);
  assert(expiredResult.valid === false && expiredResult.error.includes('expired'), 'verifySessionToken rejects expired token');

  // 3. Test Cookie Helpers
  console.log('\n--- 3. Testing Cookie Serialization & Parsing ---');
  const {
    serializeSessionCookie,
    serializeLogoutCookie,
    SESSION_COOKIE_NAME,
    getSessionTokenFromRequest
  } = require('@/lib/auth/cookies');

  const cookieStr = serializeSessionCookie(token);
  assert(cookieStr.includes(SESSION_COOKIE_NAME + '=' + token), 'serializeSessionCookie contains cookie name & token');
  assert(cookieStr.includes('HttpOnly'), 'cookie has HttpOnly flag');
  assert(cookieStr.includes('Path=/'), 'cookie has Path=/');

  const logoutCookieStr = serializeLogoutCookie();
  assert(logoutCookieStr.includes('Max-Age=0'), 'logout cookie has Max-Age=0 to immediately expire');

  const mockReq = new global.NextRequest('http://localhost:3000/api/auth/me', {
    headers: { cookie: `${SESSION_COOKIE_NAME}=${token}` }
  });
  const extractedToken = getSessionTokenFromRequest(mockReq);
  assert(extractedToken === token, 'getSessionTokenFromRequest extracts token from cookies');


  // 4. Test Persistent User Storage
  console.log('\n--- 4. Testing User Storage & Seeding ---');
  const usersDb = require('@/lib/db/users');
  const usersPath = path.resolve(__dirname, '../data/users.json');
  const backupPath = path.resolve(__dirname, '../data/users.json.bak');

  // Backup original seeded data
  if (fs.existsSync(usersPath)) {
    fs.copyFileSync(usersPath, backupPath);
  }


  // Clear existing if any to test fresh seed
  if (fs.existsSync(usersPath)) {
    fs.unlinkSync(usersPath);
  }

  const initialUsers = await usersDb.getAllUsers();
  assert(initialUsers.length >= 1, 'getAllUsers triggers automatic seeding');
  assert(fs.existsSync(usersPath), 'data/users.json exists on disk');

  const demoUser = await usersDb.findUserByEmail('demo@gbpauditor.com');
  assert(demoUser !== null, 'findUserByEmail finds seeded demo account');
  assert(demoUser.name === 'Demo User', 'demo account name is "Demo User"');
  assert(demoUser.email === 'demo@gbpauditor.com', 'demo account email matches');

  const demoPassMatch = await verifyPassword('DemoPassword123!', demoUser.passwordHash);
  assert(demoPassMatch === true, 'demo account password "DemoPassword123!" verifies against stored hash');

  // Test creating a new user
  const newPassHash = await hashPassword('TestPassword123!');
  const createdUser = await usersDb.createUser({
    name: 'Jane Auditor',
    email: 'Jane@AgencyPro.com', // Case insensitivity test
    passwordHash: newPassHash,
    company: 'Agency Pro LLC'
  });
  assert(createdUser.id.startsWith('usr_'), 'createUser returns user with ID');
  assert(createdUser.email === 'jane@agencypro.com', 'createUser normalizes email to lowercase');
  assert(!createdUser.passwordHash, 'createUser omits passwordHash in sanitized return');

  // Test duplicate email prevention
  let dupThrew = false;
  try {
    await usersDb.createUser({
      name: 'Jane Duplicate',
      email: 'JANE@agencypro.com',
      passwordHash: 'dummy'
    });
  } catch (err) {
    dupThrew = true;
  }
  assert(dupThrew === true, 'createUser throws error on duplicate email');

  // 5. Test API Routes
  console.log('\n--- 5. Testing Next.js API Routes (Signup, Login, Me, Logout) ---');
  const signupRoute = require('@/app/api/auth/signup/route');
  const loginRoute = require('@/app/api/auth/login/route');
  const meRoute = require('@/app/api/auth/me/route');
  const logoutRoute = require('@/app/api/auth/logout/route');

  // Test Signup Route
  const signupReq = new global.NextRequest('http://localhost:3000/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({
      name: 'Bob Builder',
      email: 'bob@localbuilders.com',
      password: 'SecurePassword123!',
      company: 'Builder Marketing'
    })
  });
  const signupRes = await signupRoute.POST(signupReq);
  const signupData = await signupRes.json();
  assert(signupRes.status === 201, 'POST /api/auth/signup returns 201 status');
  assert(signupData.success === true, 'POST /api/auth/signup returns success: true');
  assert(signupData.user && signupData.user.email === 'bob@localbuilders.com', 'signup returns created user');
  assert(signupRes.cookies.get(SESSION_COOKIE_NAME) !== undefined, 'signup sets session cookie');

  // Test Login Route with Demo Account
  const loginReq = new global.NextRequest('http://localhost:3000/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: 'demo@gbpauditor.com',
      password: 'DemoPassword123!'
    })
  });
  const loginRes = await loginRoute.POST(loginReq);
  const loginData = await loginRes.json();
  assert(loginRes.status === 200, 'POST /api/auth/login returns 200 status');
  assert(loginData.success === true, 'POST /api/auth/login returns success: true');
  assert(loginData.user.email === 'demo@gbpauditor.com', 'login returns correct user');
  const loginCookie = loginRes.cookies.get(SESSION_COOKIE_NAME);
  assert(loginCookie !== undefined && loginCookie.value.length > 0, 'login sets gbp_session cookie');

  // Test Me Route with Session Cookie
  const meReq = new global.NextRequest('http://localhost:3000/api/auth/me', {
    method: 'GET',
    headers: { cookie: `${SESSION_COOKIE_NAME}=${loginCookie.value}` }
  });
  const meRes = await meRoute.GET(meReq);
  const meData = await meRes.json();
  assert(meRes.status === 200, 'GET /api/auth/me returns 200 status with valid cookie');
  assert(meData.success === true && meData.user.email === 'demo@gbpauditor.com', 'GET /api/auth/me returns authenticated user data');

  // Test Me Route without Cookie
  const meUnauthReq = new global.NextRequest('http://localhost:3000/api/auth/me', {
    method: 'GET'
  });
  const meUnauthRes = await meRoute.GET(meUnauthReq);
  assert(meUnauthRes.status === 401, 'GET /api/auth/me returns 401 without cookie');

  // Test Logout Route
  const logoutReq = new global.NextRequest('http://localhost:3000/api/auth/logout', {
    method: 'POST'
  });
  const logoutRes = await logoutRoute.POST(logoutReq);
  const logoutData = await logoutRes.json();
  assert(logoutRes.status === 200, 'POST /api/auth/logout returns 200 status');
  assert(logoutData.success === true, 'POST /api/auth/logout returns success: true');
  const clearedCookie = logoutRes.cookies.get(SESSION_COOKIE_NAME);
  assert(clearedCookie && clearedCookie.options.maxAge === 0, 'logout clears gbp_session cookie with maxAge 0');

  // Restore original seeded users.json
  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, usersPath);
    fs.unlinkSync(backupPath);
  }

  console.log('\n=====================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);

  console.log('=====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test execution error:', err);
  process.exit(1);
});
