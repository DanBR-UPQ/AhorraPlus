Email sending (server)
----------------------

This project includes a minimal example server to send recovery emails using SendGrid.

1) Server location: `server/`

2) Steps to run the server locally:

 - Open a terminal in `server/`:
   ```powershell
   cd server
   npm install
   ```

 - Set environment variables (Windows PowerShell example):
   ```powershell
   $env:SENDGRID_API_KEY = 'YOUR_SENDGRID_API_KEY'
   $env:FROM_EMAIL = 'no-reply@yourdomain.com'
   node sendEmailServer.js
   ```

 - The server listens on port 3000 by default. The app will try `http://localhost:3000/send-recovery` and `http://10.0.2.2:3000/send-recovery`.
 - The server listens on port 3000 by default. The app will try several endpoints defined in `utils/config.js`.

Platform-specific tips
- iOS Simulator: `localhost` works. Just run the server locally and test.
- Android Emulator (AVD): use `10.0.2.2` (this is already in `utils/config.js`).
- Genymotion: use `10.0.3.2`.
- Physical devices (iOS/Android): find your machine LAN IP (e.g. `192.168.1.12`) and add the URL `http://<YOUR_IP>:3000/send-recovery` to `utils/config.js`. Also ensure your firewall allows connections to port 3000.

HTTP vs HTTPS and platform security
- iOS (App Transport Security) may reject plain HTTP in release builds. In the simulator HTTP is usually allowed, but on real iOS devices you should use HTTPS or configure Info.plist (in Expo managed workflow this requires a custom build). For development, using ngrok (see below) is easiest.
- Android cleartext: modern Android blocks cleartext (HTTP) in some cases. The emulator usually allows it; for physical devices you may need to enable cleartext in network config or use HTTPS. Using ngrok or deploying the server to a public HTTPS endpoint is recommended for device testing.

Quick alternative: use ngrok to expose the local server via HTTPS and avoid ATS/cleartext problems:

 - Start the server locally (`node sendEmailServer.js`).
 - Start ngrok and forward to 3000:
   ```powershell
   ngrok http 3000
   ```
 - Copy the generated HTTPS URL and put it in `utils/config.js` (for example: `https://abcd1234.ngrok.io/send-recovery`).

This is the easiest way to test physical devices without changing app/network configs.

3) Security note: keep your `SENDGRID_API_KEY` secret. For production use a real backend with proper auth and rate-limiting.
