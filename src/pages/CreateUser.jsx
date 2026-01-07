// src/pages/CreateUser.jsx
import { useState } from 'react'
import api from '../api/axios' // tu instancia de axios ya configurada

export default function CreateUser() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    try {
      const response = await api.post('/admin/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation
      })

      setMessage(`Usuario ${response.data.user.name} creado con éxito!`)
      setName('')
      setEmail('')
      setPassword('')
      setPasswordConfirmation('')
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || JSON.stringify(err.response.data))
      } else {
        setError('Ocurrió un error al crear el usuario')
      }
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-[#cb4a2a]">Crear Usuario</h1>
      <p className="mb-6 text-gray-600">Aquí podrás crear un nuevo usuario (admin).</p>

      {message && <p className="mb-4 text-green-600">{message}</p>}
      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Confirmar Contraseña</label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#2c976a] text-white font-semibold py-2 px-4 rounded hover:bg-[#1f704f] transition-colors"
        >
          Crear Usuario
        </button>
      </form>
    </div>
  )
}
