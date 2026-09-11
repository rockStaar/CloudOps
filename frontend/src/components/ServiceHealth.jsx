import { useEffect, useState } from 'react'
import { getServices } from '../api/api'

function ServiceHealth() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getServices()
        setServices(data)
      } catch (error) {
        console.error('Failed to load services:', error)
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  return (
    <div className="panel">
      <h2>Service Health</h2>

      {loading ? (
        <p>Loading services...</p>
      ) : services.length === 0 ? (
        <p>No services found.</p>
      ) : (
        services.map((service) => (
          <div className="service" key={service.id}>
            <span>
              <span className="service-dot">●</span>{' '}
              {service.name}
            </span>

            <strong
              className={
                service.status === 'OPERATIONAL'
                  ? ''
                  : 'warning'
              }
            >
              {service.status}
            </strong>
          </div>
        ))
      )}
    </div>
  )
}

export default ServiceHealth