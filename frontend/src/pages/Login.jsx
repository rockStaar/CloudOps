import { useState } from 'react'
import { useNavigate } from 'react-router'
import { login } from '../api/api'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      const data = await login(email, password)

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">

      <div className="login-background-grid" />

      <div className="login-layout">

        {/* LEFT SIDE */}
        <section className="login-intro">

          <div className="brand">
            <div className="brand-icon">⚡</div>
            <span>CloudOps</span>
          </div>

          <div className="intro-content">
            <div className="eyebrow">
              CLOUD OPERATIONS PLATFORM
            </div>

            <h1>
              Your infrastructure.
              <br />
              <span>Under control.</span>
            </h1>

            <p>
              Monitor services, manage incidents, and keep your
              infrastructure reliable from one centralized workspace.
            </p>

            <div className="system-status">
              <span className="status-pulse" />
              <div>
                <strong>All systems operational</strong>
                <small>CloudOps control plane is online</small>
              </div>
            </div>
          </div>

          <div className="login-stats">

            <div>
              <strong>99.98%</strong>
              <span>Uptime</span>
            </div>

            <div>
              <strong>12</strong>
              <span>Services</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Monitoring</span>
            </div>

          </div>

        </section>

        {/* RIGHT SIDE */}
        <section className="login-card">

          <div className="login-card-header">

            <div className="login-mobile-brand">
              <div className="brand-icon">⚡</div>
              <span>CloudOps</span>
            </div>

            <div className="login-label">
              SECURE ACCESS
            </div>

            <h2>Welcome back</h2>

            <p>
              Sign in to access your operations dashboard.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="email">
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="admin@cloudops.local"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <div className="password-label">
                <label htmlFor="password">
                  Password
                </label>

                <span>Protected</span>
              </div>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            {error && (
              <div className="login-error">
                <span>!</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? (
                'Authenticating...'
              ) : (
                <>
                  Sign in to CloudOps
                  <span>→</span>
                </>
              )}
            </button>

          </form>

          <div className="login-footer">

            <span>
              Demo environment
            </span>

            <span className="demo-account">
              admin@cloudops.local
            </span>

          </div>

        </section>

      </div>

      <div className="login-bottom">
        <span>CloudOps</span>
        <span>Secure infrastructure management</span>
        <span>v1.0</span>
      </div>

    </div>
  )
}

export default Login