import React from 'react'
import { useSignInEmailPassword, useSignUpEmailPassword, useAuthenticationStatus } from '@nhost/react'

export default function Auth() {
  const { isAuthenticated } = useAuthenticationStatus()
  const { signInEmailPassword, isLoading: signingIn, error: signInError } = useSignInEmailPassword()
  const { signUpEmailPassword, isLoading: signingUp, error: signUpError } = useSignUpEmailPassword()

  const [email, setEmail] = React.useState('test@example.com')
  const [password, setPassword] = React.useState('password123')

  if (isAuthenticated) return null

  return (
    <div style={{ maxWidth: 420, margin: '10vh auto', padding: 24, border: '1px solid #e5e7eb', borderRadius: 12 }}>
      <h1>Nhost Chatbot</h1>
      <p>Sign up or sign in with email & password.</p>

      <label>Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 12 }} />
      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 12 }} />

      <div style={{ display: 'flex', gap: 12 }}>
        <button disabled={signingIn} onClick={() => signInEmailPassword({ email, password })}>Sign In</button>
        <button disabled={signingUp} onClick={() => signUpEmailPassword({ email, password })}>Sign Up</button>
      </div>
      {(signInError || signUpError) && <p style={{ color: 'crimson' }}>{signInError?.message || signUpError?.message}</p>}
    </div>
  )
}
