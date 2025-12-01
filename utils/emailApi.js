import { BACKEND_RECOVERY_ENDPOINTS } from './config'
const tryEndpoints = BACKEND_RECOVERY_ENDPOINTS

export async function sendRecoveryEmailBackend(correo, code) {
  const body = { correo, code }
  let lastErr = null
  console.log('sendRecoveryEmailBackend: trying endpoints', tryEndpoints, 'body:', body)
  for (const url of tryEndpoints) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      if (res.ok) return { ok: true }
      const json = await res.json().catch(() => null)
      lastErr = json || { status: res.status, url }
      console.warn('sendRecoveryEmailBackend: endpoint returned non-ok', url, lastErr)
    } catch (e) {
      lastErr = e
      console.warn('sendRecoveryEmailBackend: fetch error for', url, e)
    }
  }
  // normalize thrown error to Error instance with useful message
  let msg = ''
  if (lastErr && typeof lastErr === 'object') {
    try { msg = JSON.stringify(lastErr) } catch { msg = String(lastErr) }
  } else {
    msg = String(lastErr)
  }
  throw new Error(msg)
}

export default { sendRecoveryEmailBackend }
