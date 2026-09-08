import { NavLink } from 'react-router'

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        ⚡ CloudOps
      </div>

      <nav>
        <NavLink
          to="/"
          end
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/incidents"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Incidents
        </NavLink>

        <NavLink
          to="/services"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Services
        </NavLink>

        <NavLink
          to="/monitoring"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Monitoring
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar