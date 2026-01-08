// // src/pages/Login.jsx
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import api from '../api/axios'
// import loginImage from '../assets/Inicio.png' // Asegúrate de poner la imagen en src/assets

// function Login() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const navigate = useNavigate()

//   const handleLogin = async (e) => {
//     e.preventDefault()
//     try {
//       const res = await api.post('/login', { email, password })
//       localStorage.setItem('token', res.data.token)
//       navigate('/dashboard')
//     } catch (error) {
//       alert('Usuario o contraseña incorrectos')
//     }
//   }

//   return (
//     <div className="min-h-screen flex">

//       {/* Lado izquierdo: Imagen */}
//       <div className="hidden md:flex w-1/2">
//         <img 
//           src={loginImage} 
//           alt="Chancay" 
//           className="object-cover w-full h-full"
//         />
//       </div>

//       {/* Lado derecho: Formulario */}
//       <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-gray-50 p-8">
//         <div className="w-full max-w-md">

//           {/* Logo */}
//           <div className="flex justify-center mb-6">
//             <img 
//               src="/images/chancay.png"
//               alt="Chancay 1010 1" 
//               className="w-auto h-64 max-w-full" 
//             />
//           </div>

//           {/* Texto descriptivo */}
//           <p className="text-center text-gray-600 mb-6 font-medium">
//             Asociación de Vivienda
//           </p>

//           {/* Formulario */}
//           <form onSubmit={handleLogin}>

//             {/* Input Correo */}
//             <input 
//               type="email" 
//               placeholder="Correo" 
//               value={email} 
//               onChange={e => setEmail(e.target.value)}
//               className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-white text-black placeholder-gray-400 
//                         focus:outline-none focus:ring-2 focus:ring-[#2c976a] focus:border-[#2c976a] transition"
//               required
//             />

//             {/* Input Contraseña */}
//             <input 
//               type="password" 
//               placeholder="Contraseña" 
//               value={password} 
//               onChange={e => setPassword(e.target.value)}
//               className="w-full p-3 mb-6 border border-gray-300 rounded-md bg-white text-black placeholder-gray-400 
//                         focus:outline-none focus:ring-2 focus:ring-[#2c976a] focus:border-[#2c976a] transition"
//               required
//             />

//             {/* Botón */}
//             <button 
//               type="submit" 
//               className="w-full p-3 bg-[#2c976a] text-white font-semibold rounded-md hover:bg-green-700 
//                         shadow-md transition duration-200"
//             >
//               Empezar a vender
//             </button>

//           </form>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default Login



import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import loginImage from '../assets/logo.webp'

export default function Login() {
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
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* ================= LADO IZQUIERDO ================= */}
      <div
        className="hidden md:flex flex-col items-center justify-center text-center px-20
        bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-950 text-white"
      >

        {/* TÍTULO */}
       <h1 className="text-6xl xl:text-7xl font-extrabold leading-tight mb-14 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
        Panel Administrativo
        <span className="block mt-3 text-emerald-300 drop-shadow-[0_6px_18px_rgba(16,185,129,0.9)]">
          Gestión Interna
        </span>
      </h1>


        {/* IMAGEN PURA, GRANDE */}
       <img
          src={loginImage}
          alt="Plano de lotes"
          className="w-full max-w-4xl object-contain"
        />

      </div>

      {/* ================= LADO DERECHO ================= */}
      <div className="flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

          {/* LOGO */}
          <div className="flex justify-center mb-8">
            <img
              src="/images/logo-chancay.webp"
              alt="Logo Inmobiliaria"
              className="h-32 w-auto object-contain"
            />
          </div>

          {/* FORMULARIO */}
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
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300
                  focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700
                text-white font-semibold py-3 rounded-lg transition
                duration-300 shadow-lg"
            >
              Iniciar sesión
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-sm text-gray-400 mt-6">
            © 2026 Inmobiliaria • Confianza y respaldo legal
          </p>
        </div>
      </div>

    </div>
  )
}
