// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token') // reemplaza con tu método de login

  if (!token) {
    // Si no hay token, redirige al login
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
