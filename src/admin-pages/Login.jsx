// src/admin-pages/Login.jsx
import { useState } from 'react'
import { auth } from '/src/firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth'
import './Login.css'

function Login({ setCurrentPage }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Firebase authentication signature tracker request
      await signInWithEmailAndPassword(auth, email, password)
      
      // Redirect straight to your Admin Dashboard view state on success
      setCurrentPage('admin-dashboard') 
      window.scrollTo({ top: 0, behavior: 'instant' })
    } catch (err) {
      console.error("Authentication gate fault error:", err)
      // Custom clean error messages for the UI
      if (
        err.code === 'auth/invalid-credential' || 
        err.code === 'auth/user-not-found' || 
        err.code === 'auth/wrong-password'
      ) {
        setError('Invalid administrative credentials. Please check email or security password.')
      } else {
        setError('Authentication server access rejected. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page-wrapper">
      <div className="login-glass-card">
        <div className="login-header-block">
          <div className="admin-lock-icon">🔒</div>
          <span className="login-subtitle">SECURE GATEWAY</span>
          <h2 className="login-main-title">MS Electronics Console</h2>
          <p className="login-narrative-lead">Authorized administrative personnel access portal only.</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="login-error-alert">{error}</div>}

          <div className="form-input-group">
            <label htmlFor="admin-email">Administrator Email</label>
            <input
              id="admin-email"
              type="email"
              placeholder="name@mselectronicscenter.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-input-group">
            <label htmlFor="admin-password">Security Access Key</label>
            <input
              id="admin-password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="login-submit-btn" disabled={isLoading}>
            {isLoading ? "Verifying Authorization Token..." : "Authenticate Access Token →"}
          </button>
        </form>

        <button onClick={() => setCurrentPage('about')} className="login-back-home-btn">
          ← Cancel and Return to About Page
        </button>
      </div>
    </div>
  )
}

export default Login