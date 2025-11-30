// Edit this file to add your backend endpoints if needed.
// If you run the server locally and test on a physical device, add your machine's LAN IP,
// e.g. 'http://192.168.1.12:3000/send-recovery'

// Default endpoints the app will try (in order). Edit this file to add your machine
// LAN IP if you test from a physical device (e.g. 'http://192.168.1.12:3000/send-recovery').
// Notes:
// - iOS Simulator can use localhost.
// - Android Emulator (default) should use 10.0.2.2.
// - Genymotion uses 10.0.3.2.
// - For physical devices, add your machine LAN IP here (e.g. 'http://192.168.1.12:3000/send-recovery').
export const BACKEND_RECOVERY_ENDPOINTS = [
  'http://localhost:3000/send-recovery',
  'http://127.0.0.1:3000/send-recovery',
  'http://10.0.2.2:3000/send-recovery',
  'http://10.0.3.2:3000/send-recovery'
]

export default { BACKEND_RECOVERY_ENDPOINTS }
