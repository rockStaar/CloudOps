import { useState } from 'react'

function Settings() {
  const [notifications, setNotifications] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h2>Settings</h2>
          <p>Manage CloudOps application preferences.</p>
        </div>
      </div>

      <div className="settings-panel">
        <div className="settings-section">
          <h3>General</h3>

          <div className="setting-row">
            <div>
              <strong>Automatic Refresh</strong>
              <p>Automatically refresh monitoring data.</p>
            </div>

            <button
              className={autoRefresh ? 'toggle on' : 'toggle'}
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              {autoRefresh ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="setting-row">
            <div>
              <strong>Incident Notifications</strong>
              <p>Receive notifications for active incidents.</p>
            </div>

            <button
              className={notifications ? 'toggle on' : 'toggle'}
              onClick={() => setNotifications(!notifications)}
            >
              {notifications ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h3>System</h3>

          <div className="setting-row">
            <div>
              <strong>Environment</strong>
              <p>Current CloudOps environment.</p>
            </div>

            <span className="environment">Development</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Settings