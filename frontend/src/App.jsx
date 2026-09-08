import { Routes, Route } from 'react-router'
import Sidebar from './components/sidebar'
import Header from './components/header'
import Dashboard from './pages/Dashboard'
import Incidents from './pages/Incidents'
import Services from './pages/Services'
import Monitoring from './pages/Monitoring'
import Settings from './pages/Settings'

function App() {
  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <Header />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/services" element={<Services />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  )
}

export default App