function IncidentList() {
  return (
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
  )
}

export default IncidentList