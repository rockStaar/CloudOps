import { useState } from 'react'

function Incidents() {
  const [incidents, setIncidents] = useState([
    {
      id: 'INC-001',
      title: 'API latency increased',
      service: 'API',
      severity: 'Critical',
      status: 'Open',
      created: '14 minutes ago',
    },
    {
      id: 'INC-002',
      title: 'Database connection issues',
      service: 'Database',
      severity: 'Medium',
      status: 'Investigating',
      created: '42 minutes ago',
    },
    {
      id: 'INC-003',
      title: 'Authentication response delay',
      service: 'Authentication',
      severity: 'Low',
      status: 'Resolved',
      created: '2 hours ago',
    },
  ])

  const [filter, setFilter] = useState('All')

  const filteredIncidents =
    filter === 'All'
      ? incidents
      : incidents.filter((incident) => incident.status === filter)

  const resolveIncident = (id) => {
    setIncidents((current) =>
      current.map((incident) =>
        incident.id === id
          ? { ...incident, status: 'Resolved' }
          : incident
      )
    )
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h2>Incidents</h2>
          <p>Track and manage system incidents.</p>
        </div>

        <button className="primary-button">
          + Create Incident
        </button>
      </div>

      <div className="filters">
        {['All', 'Open', 'Investigating', 'Resolved'].map((status) => (
          <button
            key={status}
            className={filter === status ? 'filter active' : 'filter'}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="incident-table">
        <div className="table-header">
          <span>ID</span>
          <span>Incident</span>
          <span>Service</span>
          <span>Severity</span>
          <span>Status</span>
          <span>Created</span>
          <span>Action</span>
        </div>

        {filteredIncidents.map((incident) => (
          <div className="table-row" key={incident.id}>
            <span>{incident.id}</span>

            <strong>{incident.title}</strong>

            <span>{incident.service}</span>

            <span className={`severity ${incident.severity.toLowerCase()}`}>
              {incident.severity}
            </span>

            <span className={`status ${incident.status.toLowerCase()}`}>
              {incident.status}
            </span>

            <span>{incident.created}</span>

            {incident.status !== 'Resolved' ? (
              <button
                className="action-button"
                onClick={() => resolveIncident(incident.id)}
              >
                Resolve
              </button>
            ) : (
              <span className="resolved-text">✓ Done</span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Incidents