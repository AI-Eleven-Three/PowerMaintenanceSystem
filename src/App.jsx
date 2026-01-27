import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Equipment from './pages/Equipment'
import WorkOrders from './pages/WorkOrders'
import Monitoring from './pages/Monitoring'
import Analytics from './pages/Analytics'
import Permissions from './pages/Permissions'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/work-orders" element={<WorkOrders />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/permissions" element={<Permissions />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
