// // src/pages/CreateUser.jsx
// import { useState } from 'react'
// import api from '../api/axios' // tu instancia de axios ya configurada

// export default function CreateUser() {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [passwordConfirmation, setPasswordConfirmation] = useState('')
//   const [message, setMessage] = useState('')
//   const [error, setError] = useState('')

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setMessage('')
//     setError('')

//     try {
//       const response = await api.post('/admin/register', {
//         name,
//         email,
//         password,
//         password_confirmation: passwordConfirmation
//       })

//       setMessage(`Usuario ${response.data.user.name} creado con éxito!`)
//       setName('')
//       setEmail('')
//       setPassword('')
//       setPasswordConfirmation('')
//     } catch (err) {
//       if (err.response && err.response.data) {
//         setError(err.response.data.message || JSON.stringify(err.response.data))
//       } else {
//         setError('Ocurrió un error al crear el usuario')
//       }
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-md">
//       <h1 className="text-2xl font-bold mb-4 text-[#cb4a2a]">Crear Usuario</h1>
//       <p className="mb-6 text-gray-600">Aquí podrás crear un nuevo usuario (admin).</p>

//       {message && <p className="mb-4 text-green-600">{message}</p>}
//       {error && <p className="mb-4 text-red-600">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium mb-1">Nombre</label>
//           <input
//             type="text"
//             value={name}
//             onChange={e => setName(e.target.value)}
//             required
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             required
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Contraseña</label>
//           <input
//             type="password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             required
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Confirmar Contraseña</label>
//           <input
//             type="password"
//             value={passwordConfirmation}
//             onChange={e => setPasswordConfirmation(e.target.value)}
//             required
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-[#2c976a] text-white font-semibold py-2 px-4 rounded hover:bg-[#1f704f] transition-colors"
//         >
//           Crear Usuario
//         </button>
//       </form>
//     </div>
//   )
// }


// src/pages/CreateUser.jsx
import { useState } from 'react'
import api from '../api/axios'

export default function CreateUser() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    try {
      const res = await api.post('/admin/register', form)
      setMessage(`Usuario ${res.data.user.name} creado correctamente`)
      setForm({ name: '', email: '', password: '', password_confirmation: '' })
    } catch {
      setError('No se pudo crear el usuario')
    }
  }

  return (
    <div className="px-10 py-8 w-full">

      {/* Header */}
      <div className="mb-8 border-b pb-4">
        <h1 className="text-2xl font-semibold text-[#cb4a2a]">
          Gestión de Usuarios
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Complete la información para registrar un nuevo administrador
        </p>
      </div>

      {/* Feedback */}
      {message && (
        <div className="mb-6 text-sm text-green-700 bg-green-50 border border-green-200 px-4 py-3 rounded">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-6 text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">

        {/* Row */}
        <div className="grid grid-cols-12 gap-6 items-center">
          <label className="col-span-3 text-sm font-medium text-gray-700">
            Nombre completo
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="col-span-9 h-11 border border-gray-300 rounded-md px-3 focus:ring-2 focus:ring-[#cb4a2a] outline-none"
            placeholder="Ej. Juan Pérez"
            required
          />
        </div>

        <div className="grid grid-cols-12 gap-6 items-center">
          <label className="col-span-3 text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="col-span-9 h-11 border border-gray-300 rounded-md px-3 focus:ring-2 focus:ring-[#cb4a2a] outline-none"
            placeholder="correo@empresa.com"
            required
          />
        </div>

        <div className="grid grid-cols-12 gap-6 items-center">
          <label className="col-span-3 text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="col-span-9 h-11 border border-gray-300 rounded-md px-3 focus:ring-2 focus:ring-[#cb4a2a] outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-12 gap-6 items-center">
          <label className="col-span-3 text-sm font-medium text-gray-700">
            Confirmar contraseña
          </label>
          <input
            name="password_confirmation"
            type="password"
            value={form.password_confirmation}
            onChange={handleChange}
            className="col-span-9 h-11 border border-gray-300 rounded-md px-3 focus:ring-2 focus:ring-[#cb4a2a] outline-none"
            required
          />
        </div>

        {/* Actions */}
        <div className="grid grid-cols-12 mt-10">
          <div className="col-span-3"></div>
          <div className="col-span-9 flex gap-4">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#2c976a] text-white font-medium rounded-md hover:bg-[#1f704f] transition"
            >
              Guardar usuario
            </button>

            <button
              type="button"
              className="px-6 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancelar
            </button>
          </div>
        </div>

      </form>
    </div>
  )
}
