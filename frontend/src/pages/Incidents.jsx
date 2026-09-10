import { useEffect, useState } from 'react'
import { getIncidents, updateIncident } from '../api/api'

function Incidents() {
  const [incidents, setIncidents] = useState([])
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const token = localStorage.getItem('token')

  useEffect(() => {
    const loadIncidents = async () => {
      try {
        setLoading(true)

        const data = await getIncidents()

        setIncidents(data)
      } catch (error) {
        console.error('Failed to load incidents:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadIncidents()
  }, [])

  const filteredIncidents =
    filter === 'All'
      ? incidents
      : incidents.filter(
          (incident) =>
            incident.status.toLowerCase() === filter.toLowerCase()
        )

  const resolveIncident = async (id) => {
    if (!token) {
      setError('Please log in to resolve an incident.')
      return
    }

    try {
      const updatedIncident = await updateIncident(
        id,
        {
          status: 'RESOLVED',
          resolvedAt: new Date().toISOString(),
        },
        token
      )

      setIncidents((current) =>
        current.map((incident) =>
          incident.id === id ? updatedIncident : incident
        )
      )
    } catch (error) {
      console.error('Failed to resolve incident:', error)
      setError(error.message)
    }
  }

  const formatCreatedDate = (date) => {
    return new Date(date).toLocaleString()
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

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {loading ? (
        <p>Loading incidents...</p>
      ) : (
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
              <span>INC-{String(incident.id).padStart(3, '0')}</span>

              <strong>{incident.title}</strong>

              <span>{incident.service?.name || 'Unknown'}</span>

              <span
                className={`severity ${incident.severity.toLowerCase()}`}
              >
                {incident.severity}
              </span>

              <span
                className={`status ${incident.status.toLowerCase()}`}
              >
                {incident.status}
              </span>

              <span>{formatCreatedDate(incident.createdAt)}</span>

              {incident.status !== 'RESOLVED' ? (
                <button
                  className="action-button"
                  onClick={() => resolveIncident(incident.id)}
                >
                  Resolve
                </button>
              ) : (
                <span className="resolved-text">
                  ✓ Done
                </span>
              )}
            </div>
          ))}

          {filteredIncidents.length === 0 && (
            <p>No incidents found.</p>
          )}
        </div>
      )}
    </section>
  )
}

export default Incidents