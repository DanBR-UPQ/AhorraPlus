// Small password utilities with graceful fallback.
// Prefer installing 'bcryptjs' for production: `npm install bcryptjs`.

let bcrypt = null
try {
  // try to require bcryptjs if available
  // eslint-disable-next-line global-require
  bcrypt = require('bcryptjs')
} catch (e) {
  // not installed, will use fallback
  console.warn('bcryptjs not found, using fallback hash (less secure).')
}

async function hashWithSubtle(password) {
  if (typeof globalThis.crypto !== 'undefined' && crypto.subtle && crypto.subtle.digest) {
    const enc = new TextEncoder()
    const data = enc.encode(password)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }
  // last-resort JS hash (not cryptographically strong)
  let h = 5381
  for (let i = 0; i < password.length; i++) {
    h = ((h << 5) + h) + password.charCodeAt(i) // h * 33 + c
    h = h & 0xffffffff
  }
  return 'fallback-' + (h >>> 0).toString(16)
}

export async function hashPassword(password) {
  if (!password) throw new Error('Password required')
  if (bcrypt) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  }
  return await hashWithSubtle(password)
}

export async function comparePassword(password, hash) {
  if (!password) return false
  if (!hash) return false
  if (bcrypt) {
    return bcrypt.compareSync(password, hash)
  }
  // fallback: compute hash of password and compare prefix/equality
  const computed = await hashWithSubtle(password)
  return computed === hash
}

export default { hashPassword, comparePassword }
