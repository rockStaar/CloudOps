import { useEffect, useState } from 'react'
import StatCard from '../components/statcard'
import ServiceHealth from '../components/ServiceHealth'
import IncidentList from '../components/IncidentList'
import { getIncidents, getServices } from '../api/api'

function Dashboard() {
  const [incidents, setIncidents] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [incidentData, serviceData] = await Promise.all([
          getIncidents(),
          getServices(),
        ])

        setIncidents(incidentData)
        setServices(serviceData)
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const activeIncidents = incidents.filter(
    (incident) => incident.status !== 'RESOLVED'
  )

  return (
    <>
      <section className="welcome">
        <h2>Good morning, Admin 👋</h2>
        <p>Here's what's happening with your systems today.</p>
      </section>

      <section className="stats">
        <StatCard
          title="Services"
          value={loading ? '—' : services.length}
          description="All systems monitored"
        />

        <StatCard
          title="Active Incidents"
          value={loading ? '—' : activeIncidents.length}
          description="Requires attention"
        />

        <StatCard
          title="System Uptime"
          value="99.98%"
          description="Last 30 days"
        />
      </section>

      <section className="content-grid">
        <ServiceHealth />
        <IncidentList incidents={activeIncidents} />
      </section>
    </>
  )
}

export default Dashboard