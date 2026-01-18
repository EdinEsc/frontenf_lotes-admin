// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashboardLayout from './pages/DashboardLayout'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/*" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
