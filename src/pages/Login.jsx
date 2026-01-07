// src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import loginImage from '../assets/Inicio.png' // Asegúrate de poner la imagen en src/assets

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/login', { email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    } catch (error) {
      alert('Usuario o contraseña incorrectos')
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* Lado izquierdo: Imagen */}
      <div className="hidden md:flex w-1/2">
        <img 
          src={loginImage} 
          alt="Chancay" 
          className="object-cover w-full h-full"
        />
      </div>

      {/* Lado derecho: Formulario */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-gray-50 p-8">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src="/images/chancay.png"
              alt="Chancay 1010 1" 
              className="w-auto h-64 max-w-full" 
            />
          </div>

          {/* Texto descriptivo */}
          <p className="text-center text-gray-600 mb-6 font-medium">
            Asociación de Vivienda
          </p>

          {/* Formulario */}
          <form onSubmit={handleLogin}>

            {/* Input Correo */}
            <input 
              type="email" 
              placeholder="Correo" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-white text-black placeholder-gray-400 
                        focus:outline-none focus:ring-2 focus:ring-[#2c976a] focus:border-[#2c976a] transition"
              required
            />

            {/* Input Contraseña */}
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 mb-6 border border-gray-300 rounded-md bg-white text-black placeholder-gray-400 
                        focus:outline-none focus:ring-2 focus:ring-[#2c976a] focus:border-[#2c976a] transition"
              required
            />

            {/* Botón */}
            <button 
              type="submit" 
              className="w-full p-3 bg-[#2c976a] text-white font-semibold rounded-md hover:bg-green-700 
                        shadow-md transition duration-200"
            >
              Empezar a vender
            </button>

          </form>
        </div>
      </div>

    </div>
  )
}

export default Login
