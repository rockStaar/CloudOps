import { Routes, Route, Navigate } from 'react-router'

import Sidebar from './components/sidebar'
import Header from './components/header'

import Dashboard from './pages/Dashboard'
import Incidents from './pages/Incidents'
import Services from './pages/Services'
import Monitoring from './pages/Monitoring'
import Settings from './pages/Settings'
import Login from './pages/Login'

function ProtectedLayout() {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

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

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/*" element={<ProtectedLayout />} />
    </Routes>
  )
}

export default App