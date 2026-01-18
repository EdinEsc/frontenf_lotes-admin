import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Dashboard from './Dashboard'
import Users from './Users'
import CreateUser from './CreateUser'

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function DashboardLayout() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center
        bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-950">

        <div className="flex flex-col items-center gap-6">

     
          <img
            src="/images/logo-chancay.webp"
            alt="Cargando"
            className="h-28 w-auto drop-shadow-xl"
          />

      
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>

      
          <p className="text-white/90 text-sm tracking-widest uppercase">
            Inicializando sistema
          </p>

        </div>
      </div>
    )
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 ml-16 p-6">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/create" element={<CreateUser />} />
          </Routes>
        </main>
      </div>
    </>
  )
}
