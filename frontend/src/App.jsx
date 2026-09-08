function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          ⚡ CloudOps
        </div>

        <nav>
          <a className="active">Dashboard</a>
          <a>Incidents</a>
          <a>Services</a>
          <a>Monitoring</a>
          <a>Settings</a>
        </nav>
      </aside>

      <main className="main">
        <header className="header">
          <div>
            <h1>Overview</h1>
            <p>Monitor your cloud infrastructure</p>
          </div>

          <div className="user">
            🔔 &nbsp; Admin
          </div>
        </header>

        <section className="welcome">
          <h2>Good morning, Admin 👋</h2>
          <p>Here's what's happening with your systems today.</p>
        </section>

        <section className="stats">
          <div className="card">
            <p>Services</p>
            <h2>12</h2>
            <span>All systems monitored</span>
          </div>

          <div className="card">
            <p>Active Incidents</p>
            <h2>2</h2>
            <span>Requires attention</span>
          </div>

          <div className="card">
            <p>System Uptime</p>
            <h2>99.98%</h2>
            <span>Last 30 days</span>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel">
            <h2>Service Health</h2>

            <div className="service">
              <span>● API</span>
              <strong>Operational</strong>
            </div>

            <div className="service">
              <span>● Database</span>
              <strong>Operational</strong>
            </div>

            <div className="service">
              <span>● Authentication</span>
              <strong className="warning">Degraded</strong>
            </div>

            <div className="service">
              <span>● Payment Service</span>
              <strong>Operational</strong>
            </div>
          </div>

          <div className="panel">
            <h2>Active Incidents</h2>

            <div className="incident">
              <span>🔴</span>
              <div>
                <strong>API latency increased</strong>
                <p>Started 14 minutes ago</p>
              </div>
            </div>

            <div className="incident">
              <span>🟡</span>
              <div>
                <strong>Database connection issues</strong>
                <p>Started 42 minutes ago</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App