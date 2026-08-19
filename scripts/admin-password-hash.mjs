#!/usr/bin/env node
// Generate the value for the ADMIN_PASSWORD_HASH environment variable (Vercel → Settings → Environment Variables).
// The notice admin login (server/auth.ts) verifies passwords with scrypt against "salt:hash".
//
//   node scripts/admin-password-hash.mjs '새로운비밀번호'
//
// Paste the printed value into ADMIN_PASSWORD_HASH for Production/Preview/Development and redeploy.
import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];
if (!password) {
  console.error("사용법: node scripts/admin-password-hash.mjs '새로운비밀번호'");
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");
console.log(`${salt}:${hash}`);
