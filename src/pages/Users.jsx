// src/pages/Users.jsx
import { useEffect, useState } from 'react'
import api from '../api/axios'

export default function Users() {
  const [messages, setMessages] = useState([])
  const [expandedId, setExpandedId] = useState(null) // controla qué tarjeta está abierta

  useEffect(() => {
    api.get('/admin/mensajes')
      .then(res => setMessages(res.data))
      .catch(err => console.error(err))
  }, [])

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#cb4a2a]">Manejo de Mensajes</h1>
      <p className="mb-6 text-gray-600">Aquí podrás ver todos los mensajes de contacto.</p>

      <section>
        <h3 className="text-2xl font-semibold text-[#2c976a] mb-4">Mensajes</h3>
        <ul className="space-y-3">
          {messages.map(msg => (
            <li
              key={msg.id}
              onClick={() => toggleExpand(msg.id)}
              className="bg-white shadow rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{msg.nombre}</p>
                  <p className="text-gray-500 text-sm">{msg.email}</p>
                </div>
                <span className="mt-2 md:mt-0 px-3 py-1 bg-[#cb4a2a] text-white rounded-full text-sm">
                  Nuevo
                </span>
              </div>

              {/* Info completa desplegada */}
              {expandedId === msg.id && (
                <div className="mt-4 border-t pt-4 space-y-1 text-gray-700 text-sm">
                  {msg.telefono && <p><strong>Teléfono:</strong> {msg.telefono}</p>}
                  {msg.mensaje && <p><strong>Mensaje:</strong> {msg.mensaje}</p>}
                  <p><strong>Creado:</strong> {new Date(msg.created_at).toLocaleString()}</p>
                  <p><strong>Actualizado:</strong> {new Date(msg.updated_at).toLocaleString()}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
