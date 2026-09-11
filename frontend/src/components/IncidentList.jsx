function IncidentList({ incidents = [] }) {
  return (
    <div className="panel">
      <h2>Active Incidents</h2>

      {incidents.length === 0 ? (
        <p>No active incidents. All systems are operating normally.</p>
      ) : (
        incidents.map((incident) => (
          <div className="incident" key={incident.id}>
            <span>
              {incident.severity === 'HIGH' ? '🔴' : '🟡'}
            </span>

            <div>
              <strong>{incident.title}</strong>

              <p>
                {incident.service?.name || 'Unknown service'} ·{' '}
                {incident.status}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default IncidentList