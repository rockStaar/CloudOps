function Services() {
  const services = [
    {
      name: 'API',
      status: 'Operational',
      response: '124 ms',
      uptime: '99.99%',
      checked: '30 sec ago',
    },
    {
      name: 'Database',
      status: 'Operational',
      response: '86 ms',
      uptime: '99.98%',
      checked: '45 sec ago',
    },
    {
      name: 'Authentication',
      status: 'Degraded',
      response: '420 ms',
      uptime: '99.72%',
      checked: '1 min ago',
    },
    {
      name: 'Payment Service',
      status: 'Operational',
      response: '156 ms',
      uptime: '99.95%',
      checked: '40 sec ago',
    },
  ]

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h2>Services</h2>
          <p>Monitor the health and availability of your services.</p>
        </div>

        <button className="primary-button">
          + Add Service
        </button>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div className="service-card" key={service.name}>
            <div className="service-card-header">
              <h3>{service.name}</h3>

              <span
                className={`status-dot ${
                  service.status === 'Operational'
                    ? 'operational'
                    : 'degraded'
                }`}
              >
                ● {service.status}
              </span>
            </div>

            <div className="service-metrics">
              <div>
                <span>Response Time</span>
                <strong>{service.response}</strong>
              </div>

              <div>
                <span>Uptime</span>
                <strong>{service.uptime}</strong>
              </div>

              <div>
                <span>Last Checked</span>
                <strong>{service.checked}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services