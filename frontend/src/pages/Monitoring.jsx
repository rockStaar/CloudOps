function Monitoring() {
  const metrics = [
    {
      name: 'API',
      response: '124 ms',
      requests: '18.4K',
      errors: '0.12%',
      status: 'Healthy',
    },
    {
      name: 'Database',
      response: '86 ms',
      requests: '12.8K',
      errors: '0.04%',
      status: 'Healthy',
    },
    {
      name: 'Authentication',
      response: '420 ms',
      requests: '9.2K',
      errors: '1.84%',
      status: 'Degraded',
    },
  ]

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h2>Monitoring</h2>
          <p>View service performance and system metrics.</p>
        </div>

        <span className="live-indicator">
          ● Monitoring
        </span>
      </div>

      <div className="monitoring-grid">
        {metrics.map((metric) => (
          <div className="monitor-card" key={metric.name}>
            <div className="monitor-card-header">
              <h3>{metric.name}</h3>

              <span
                className={
                  metric.status === 'Healthy'
                    ? 'healthy'
                    : 'warning'
                }
              >
                {metric.status}
              </span>
            </div>

            <div className="metric">
              <span>Response Time</span>
              <strong>{metric.response}</strong>
            </div>

            <div className="metric">
              <span>Requests</span>
              <strong>{metric.requests}</strong>
            </div>

            <div className="metric">
              <span>Error Rate</span>
              <strong>{metric.errors}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="panel monitoring-placeholder">
        <h2>Response Time</h2>
        <p>
          Historical monitoring charts will be connected to real
          health-check data in the backend phase.
        </p>
      </div>
    </section>
  )
}

export default Monitoring