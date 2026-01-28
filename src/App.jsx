import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Equipment from './pages/Equipment'
import WorkOrders from './pages/WorkOrders'
import Monitoring from './pages/Monitoring'
import Analytics from './pages/Analytics'
import Permissions from './pages/Permissions'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <Router basename="/PowerMaintenanceSystem">
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="equipment" element={<Equipment />} />
          <Route path="work-orders" element={<WorkOrders />} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="permissions" element={<Permissions />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
