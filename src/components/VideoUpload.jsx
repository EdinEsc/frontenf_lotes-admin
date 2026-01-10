// // src/components/VideoUpload.jsx
// import { useState } from 'react'
// import api from '../api/axios'

// export default function VideoUpload() {
//   const [file, setFile] = useState(null)
//   const [title, setTitle] = useState('')
//   const [message, setMessage] = useState('')
//   const [uploading, setUploading] = useState(false)

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0])
//   }

//   const handleUpload = async () => {
//     if (!file) {
//       setMessage('Selecciona un video primero')
//       return
//     }

//     const formData = new FormData()
//     formData.append('video', file)
//     formData.append('title', title)

//     try {
//       setUploading(true)
//       setMessage('')

//       const res = await api.post('/admin/videos', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       })

//       setMessage(`Video subido: ${res.data.video.url}`)
//       setFile(null)
//       setTitle('')
//     } catch (err) {
//       console.error(err)
//       setMessage('Error al subir el video')
//     } finally {
//       setUploading(false)
//     }
//   }

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Título del video (opcional)"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="border rounded px-3 py-1 mb-2 w-full"
//       />
//       <input
//         type="file"
//         accept="video/*"
//         onChange={handleFileChange}
//         className="mb-2 w-full"
//       />
//       <button
//         onClick={handleUpload}
//         disabled={uploading}
//         className="bg-[#2c976a] text-white px-4 py-2 rounded"
//       >
//         {uploading ? 'Subiendo...' : 'Subir Video'}
//       </button>

//       {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
//     </div>
//   )
// }

import { useState } from 'react'
import api from '../api/axios'
import { toast } from 'react-toastify'

export default function VideoUpload() {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) {
      toast.warning('Selecciona un video primero')
      return
    }

    const formData = new FormData()
    formData.append('video', file)
    formData.append('title', title)

    try {
      setUploading(true)

      const res = await api.post('/admin/videos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      toast.success('Video subido correctamente')

      setFile(null)
      setTitle('')
    } catch (err) {
      console.error(err)
      toast.error('Error al subir el video')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Título del video (opcional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded px-3 py-2 mb-2 w-full"
      />

      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="mb-3 w-full"
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="
          bg-[#2c976a] hover:bg-[#24845c]
          text-white px-4 py-2 rounded
          transition disabled:opacity-50
        "
      >
        {uploading ? 'Subiendo...' : 'Subir Video'}
      </button>
    </div>
  )
}

