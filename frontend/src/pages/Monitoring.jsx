import { useEffect, useState } from 'react'
import {
  getServices,
  getServiceUptime,
  getServiceChecks,
} from '../api/api'

function Monitoring() {
  const [services, setServices] = useState([])
  const [monitoringData, setMonitoringData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMonitoringData = async () => {
      try {
        const serviceData = await getServices()

        const data = await Promise.all(
          serviceData.map(async (service) => {
            const [uptime, checks] = await Promise.all([
              getServiceUptime(service.id),
              getServiceChecks(service.id),
            ])

            return {
              ...service,
              uptime,
              checks,
            }
          })
        )

        const monitoringMap = {}

        data.forEach((service) => {
          monitoringMap[service.id] = service
        })

        setServices(serviceData)
        setMonitoringData(monitoringMap)
      } catch (error) {
        console.error(
          'Failed to load monitoring data:',
          error
        )
      } finally {
        setLoading(false)
      }
    }

    loadMonitoringData()
  }, [])

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString()
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h2>Monitoring</h2>
          <p>
            View service performance and health-check history.
          </p>
        </div>

        <span className="live-indicator">
          ● Monitoring
        </span>
      </div>

      {loading ? (
        <p>Loading monitoring data...</p>
      ) : services.length === 0 ? (
        <p>No services found.</p>
      ) : (
        <>
          <div className="monitoring-grid">
            {services.map((service) => {
              const data = monitoringData[service.id]

              return (
                <div
                  className="monitor-card"
                  key={service.id}
                >
                  <div className="monitor-card-header">
                    <h3>{service.name}</h3>

                    <span
                      className={
                        service.status === 'OPERATIONAL'
                          ? 'healthy'
                          : 'warning'
                      }
                    >
                      {service.status}
                    </span>
                  </div>

                  <div className="metric">
                    <span>Response Time</span>
                    <strong>
                      {service.responseTime !== null &&
                      service.responseTime !== undefined
                        ? `${service.responseTime} ms`
                        : '—'}
                    </strong>
                  </div>

                  <div className="metric">
                    <span>Uptime</span>
                    <strong>
                      {data?.uptime?.uptime !== null &&
                      data?.uptime?.uptime !== undefined
                        ? `${data.uptime.uptime}%`
                        : '—'}
                    </strong>
                  </div>

                  <div className="metric">
                    <span>Total Checks</span>
                    <strong>
                      {data?.uptime?.totalChecks ?? 0}
                    </strong>
                  </div>
                </div>
              )
            })}
          </div>

          {services.map((service) => {
            const data = monitoringData[service.id]

            return (
              <div
                className="panel monitoring-placeholder"
                key={service.id}
              >
                <h2>{service.name} — Recent Checks</h2>

                {data?.checks?.length === 0 ? (
                  <p>No monitoring history available.</p>
                ) : (
                  <div>
                    {data?.checks?.map((check) => (
                      <div
                        className="metric"
                        key={check.id}
                      >
                        <span>
                          {formatTime(check.checkedAt)}
                        </span>

                        <strong>
                          {check.status}
                          {' · '}
                          {check.responseTime !== null
                            ? `${check.responseTime} ms`
                            : '—'}
                        </strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </>
      )}
    </section>
  )
}

export default Monitoring