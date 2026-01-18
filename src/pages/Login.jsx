import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import loginImage from '../assets/logo.webp'
import { Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setLoading(true)

    try {
      const res = await api.post('/login', { email, password })
      localStorage.setItem('token', res.data.token)

   
      setTimeout(() => {
        navigate('/dashboard')
      }, 1200)

    } catch (error) {
      setErrorMsg('Usuario o contraseña incorrectos')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

  
      <div className="hidden md:flex flex-col items-center justify-center text-center px-20
        bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-950 text-white">

        <h1 className="text-6xl xl:text-7xl font-extrabold leading-tight mb-14 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
          Panel Administrativo
          <span className="block mt-3 text-emerald-300 drop-shadow-[0_6px_18px_rgba(16,185,129,0.9)]">
            Gestión Interna
          </span>
        </h1>

        <img
          src={loginImage}
          alt="Plano de lotes"
          className="w-full max-w-4xl object-contain"
        />
      </div>

 
      <div className="flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

         
          <div className="flex justify-center mb-8">
            <img
              src="/images/logo-chancay.webp"
              alt="Logo Inmobiliaria"
              className="h-32 w-auto object-contain"
            />
          </div>

          <form onSubmit={handleLogin} className="space-y-6">

           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="admin@empresa.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300
                  focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300
                    focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center
                    text-gray-500 hover:text-emerald-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

        
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-semibold py-3 rounded-lg transition duration-300 shadow-lg
                ${loading
                  ? 'bg-emerald-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
            >
              {loading ? 'Validando acceso...' : 'Iniciar sesión'}
            </button>

            {loading && (
              <div className="flex justify-center">
                <div className="w-6 h-6 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {errorMsg && (
              <p className="text-center text-sm text-red-600 font-medium">
                {errorMsg}
              </p>
            )}

          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            © 2026 Inmobiliaria • Confianza y respaldo legal
          </p>
        </div>
      </div>
    </div>
  )
}
