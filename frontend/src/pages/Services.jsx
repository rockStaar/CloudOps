import { useEffect, useState } from 'react'
import { getServices, getServiceUptime } from '../api/api'

function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadServices = async () => {
      try {
        const serviceData = await getServices()

        const servicesWithUptime = await Promise.all(
          serviceData.map(async (service) => {
            try {
              const uptimeData = await getServiceUptime(service.id)

              return {
                ...service,
                uptime: uptimeData.uptime,
              }
            } catch (error) {
              console.error(
                `Failed to load uptime for ${service.name}:`,
                error
              )

              return {
                ...service,
                uptime: null,
              }
            }
          })
        )

        setServices(servicesWithUptime)
      } catch (error) {
        console.error('Failed to load services:', error)
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  const formatLastChecked = (date) => {
    if (!date) {
      return 'Never'
    }

    const seconds = Math.floor(
      (Date.now() - new Date(date).getTime()) / 1000
    )

    if (seconds < 60) {
      return `${seconds} sec ago`
    }

    const minutes = Math.floor(seconds / 60)

    if (minutes < 60) {
      return `${minutes} min ago`
    }

    const hours = Math.floor(minutes / 60)

    return `${hours} hr ago`
  }

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

      {loading ? (
        <p>Loading services...</p>
      ) : services.length === 0 ? (
        <p>No services found.</p>
      ) : (
        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.id}>
              <div className="service-card-header">
                <h3>{service.name}</h3>

                <span
                  className={`status-dot ${
                    service.status === 'OPERATIONAL'
                      ? 'operational'
                      : service.status === 'DEGRADED'
                        ? 'degraded'
                        : 'down'
                  }`}
                >
                  ● {service.status}
                </span>
              </div>

              <div className="service-metrics">
                <div>
                  <span>Response Time</span>
                  <strong>
                    {service.responseTime !== null &&
                    service.responseTime !== undefined
                      ? `${service.responseTime} ms`
                      : '—'}
                  </strong>
                </div>

                <div>
                  <span>Uptime</span>
                  <strong>
                    {service.uptime !== null &&
                    service.uptime !== undefined
                      ? `${service.uptime}%`
                      : '—'}
                  </strong>
                </div>

                <div>
                  <span>Last Checked</span>
                  <strong>
                    {formatLastChecked(service.lastChecked)}
                  </strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Services