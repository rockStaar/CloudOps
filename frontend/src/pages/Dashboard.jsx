import StatCard from '../components/statcard'
import ServiceHealth from '../components/ServiceHealth'
import IncidentList from '../components/IncidentList'

function Dashboard() {
  return (
    <>
      <section className="welcome">
        <h2>Good morning, Admin 👋</h2>
        <p>Here's what's happening with your systems today.</p>
      </section>

      <section className="stats">
        <StatCard
          title="Services"
          value="12"
          description="All systems monitored"
        />

        <StatCard
          title="Active Incidents"
          value="2"
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
        <IncidentList />
      </section>
    </>
  )
}

export default Dashboard