function ServiceHealth() {
  return (
    <div className="panel">
      <h2>Service Health</h2>

      <div className="service">
        <span>● API</span>
        <strong>Operational</strong>
      </div>

      <div className="service">
        <span>● Database</span>
        <strong>Operational</strong>
      </div>

      <div className="service">
        <span>● Authentication</span>
        <strong className="warning">Degraded</strong>
      </div>

      <div className="service">
        <span>● Payment Service</span>
        <strong>Operational</strong>
      </div>
    </div>
  )
}

export default ServiceHealth