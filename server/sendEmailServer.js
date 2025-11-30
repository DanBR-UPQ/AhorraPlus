const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const sgMail = require('@sendgrid/mail')

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
if (!SENDGRID_API_KEY) {
  console.warn('Warning: SENDGRID_API_KEY not set. The server will return error when trying to send email.')
}
sgMail.setApiKey(SENDGRID_API_KEY || '')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/send-recovery', async (req, res) => {
  try {
    const { correo, code } = req.body
    if (!correo || !code) return res.status(400).json({ error: 'correo and code required' })

    if (!SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY not set')
      return res.status(500).json({ error: 'SENDGRID_API_KEY not configured on server' })
    }

    const msg = {
      to: correo,
      from: process.env.FROM_EMAIL || 'no-reply@example.com',
      subject: 'Recuperación de contraseña - AhorraPlus',
      text: `Tu código de recuperación es: ${code}. No compartas este código con nadie.`,
      html: `<p>Tu código de recuperación es: <b>${code}</b></p><p>No compartas este código con nadie.</p>`
    }

    console.log(`Sending recovery email to ${correo}`)
    await sgMail.send(msg)
    return res.json({ ok: true })
  } catch (err) {
    console.error('Error sending mail', err)
    // Send back error details for debugging (do not leak in production)
    return res.status(500).json({ error: String(err.message || err) })
  }
})

app.get('/health', (req, res) => {
  res.json({ ok: true, sendgrid: !!SENDGRID_API_KEY })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Email server listening on port ${port}`))
