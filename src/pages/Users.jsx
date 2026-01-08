// // // src/pages/Users.jsx
// // import { useEffect, useState } from 'react'
// // import api from '../api/axios'

// // export default function Users() {
// //   const [messages, setMessages] = useState([])
// //   const [expandedId, setExpandedId] = useState(null) // controla qué tarjeta está abierta

// //   useEffect(() => {
// //     api.get('/admin/mensajes')
// //       .then(res => setMessages(res.data))
// //       .catch(err => console.error(err))
// //   }, [])

// //   const toggleExpand = (id) => {
// //     setExpandedId(expandedId === id ? null : id)
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6">
// //       <h1 className="text-2xl font-bold mb-4 text-[#cb4a2a]">Manejo de Mensajes</h1>
// //       <p className="mb-6 text-gray-600">Aquí podrás ver todos los mensajes de contacto.</p>

// //       <section>
// //         <h3 className="text-2xl font-semibold text-[#2c976a] mb-4">Mensajes</h3>
// //         <ul className="space-y-3">
// //           {messages.map(msg => (
// //             <li
// //               key={msg.id}
// //               onClick={() => toggleExpand(msg.id)}
// //               className="bg-white shadow rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
// //             >
// //               <div className="flex justify-between items-center">
// //                 <div>
// //                   <p className="font-medium text-gray-800">{msg.nombre}</p>
// //                   <p className="text-gray-500 text-sm">{msg.email}</p>
// //                 </div>
// //                 <span className="mt-2 md:mt-0 px-3 py-1 bg-[#cb4a2a] text-white rounded-full text-sm">
// //                   Nuevo
// //                 </span>
// //               </div>

// //               {/* Info completa desplegada */}
// //               {expandedId === msg.id && (
// //                 <div className="mt-4 border-t pt-4 space-y-1 text-gray-700 text-sm">
// //                   {msg.telefono && <p><strong>Teléfono:</strong> {msg.telefono}</p>}
// //                   {msg.mensaje && <p><strong>Mensaje:</strong> {msg.mensaje}</p>}
// //                   <p><strong>Creado:</strong> {new Date(msg.created_at).toLocaleString()}</p>
// //                   <p><strong>Actualizado:</strong> {new Date(msg.updated_at).toLocaleString()}</p>
// //                 </div>
// //               )}
// //             </li>
// //           ))}
// //         </ul>
// //       </section>
// //     </div>
// //   )
// // }

// // src/pages/Users.jsx
// import { useEffect, useMemo, useState } from "react";
// import api from "../api/axios";
// import * as XLSX from "xlsx";

// const ITEMS_PER_PAGE = 8;

// export default function Users() {
//   const [messages, setMessages] = useState([]);
//   const [expandedId, setExpandedId] = useState(null);
//   const [page, setPage] = useState(1);

//   // 🔎 filtros
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [emailFilter, setEmailFilter] = useState("");

//   useEffect(() => {
//     api
//       .get("/admin/mensajes")
//       .then((res) => setMessages(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   // 🔥 filtrar + ordenar
//   const filteredMessages = useMemo(() => {
//     return messages
//       .filter((msg) => {
//         const msgDate = new Date(msg.created_at);
//         const from = fromDate ? new Date(fromDate) : null;
//         const to = toDate ? new Date(toDate + "T23:59:59") : null;

//         if (from && msgDate < from) return false;
//         if (to && msgDate > to) return false;

//         if (
//           emailFilter &&
//           !msg.email.toLowerCase().includes(emailFilter.toLowerCase())
//         ) {
//           return false;
//         }

//         return true;
//       })
//       .sort(
//         (a, b) => new Date(b.created_at) - new Date(a.created_at)
//       );
//   }, [messages, fromDate, toDate, emailFilter]);

//   // 📄 paginación
//   const totalPages = Math.ceil(filteredMessages.length / ITEMS_PER_PAGE);

//   const paginatedMessages = useMemo(() => {
//     const start = (page - 1) * ITEMS_PER_PAGE;
//     return filteredMessages.slice(start, start + ITEMS_PER_PAGE);
//   }, [filteredMessages, page]);

//   const toggleExpand = (id) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   // 🧹 limpiar filtros
//   const clearFilters = () => {
//     setFromDate("");
//     setToDate("");
//     setEmailFilter("");
//     setPage(1);
//   };

//   // 📊 descargar Excel REAL
//   const downloadExcel = () => {
//     const data = filteredMessages.map((m) => ({
//       Nombre: m.nombre,
//       Email: m.email,
//       Teléfono: m.telefono || "",
//       Mensaje: m.mensaje || "",
//       Fecha: new Date(m.created_at).toLocaleString(),
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Mensajes");

//     XLSX.writeFile(workbook, "mensajes_contacto.xlsx");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-[#cb4a2a]">
//           Mensajes de Contacto
//         </h1>
//         <p className="text-gray-600 mt-1">
//           Del más reciente al más antiguo
//         </p>
//       </div>

//       {/* 🔎 Filtros separados */}
//       <div className="bg-white p-5 rounded-xl shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">
//             Desde
//           </label>
//           <input
//             type="date"
//             value={fromDate}
//             onChange={(e) => setFromDate(e.target.value)}
//             className="w-full border rounded px-3 py-2 text-sm"
//           />
//         </div>

//         <div>
//           <label className="block text-sm text-gray-600 mb-1">
//             Hasta
//           </label>
//           <input
//             type="date"
//             value={toDate}
//             onChange={(e) => setToDate(e.target.value)}
//             className="w-full border rounded px-3 py-2 text-sm"
//           />
//         </div>

//         <div>
//           <label className="block text-sm text-gray-600 mb-1">
//             Filtrar por correo
//           </label>
//           <input
//             type="text"
//             placeholder="correo@ejemplo.com"
//             value={emailFilter}
//             onChange={(e) => setEmailFilter(e.target.value)}
//             className="w-full border rounded px-3 py-2 text-sm"
//           />
//         </div>

//         <div className="flex flex-col gap-2 justify-end">
//           <button
//             onClick={downloadExcel}
//             className="bg-[#2c976a] text-white px-4 py-2 rounded text-sm hover:opacity-90"
//           >
//             Descargar Excel
//           </button>

//           <button
//             onClick={clearFilters}
//             className="border px-4 py-2 rounded text-sm text-gray-600 hover:bg-gray-100"
//           >
//             Quitar filtros
//           </button>
//         </div>
//       </div>

//       {/* Lista */}
//       <div className="space-y-4">
//         {paginatedMessages.map((msg) => (
//           <div
//             key={msg.id}
//             onClick={() => toggleExpand(msg.id)}
//             className="relative bg-white rounded-xl shadow hover:shadow-md transition cursor-pointer border"
//           >
//             {/* Fecha verde */}
//             <span className="absolute top-3 right-4 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
//               {new Date(msg.created_at).toLocaleDateString()}
//             </span>

//             <div className="p-4">
//               <p className="font-semibold text-gray-800">
//                 {msg.nombre}
//               </p>
//               <p className="text-sm text-gray-500">
//                 {msg.email}
//               </p>
//             </div>

//             {expandedId === msg.id && (
//               <div className="px-4 pb-4 border-t bg-gray-50 text-sm text-gray-700 space-y-2">
//                 {msg.telefono && (
//                   <p><strong>Teléfono:</strong> {msg.telefono}</p>
//                 )}
//                 {msg.mensaje && (
//                   <p><strong>Mensaje:</strong> {msg.mensaje}</p>
//                 )}
//                 <p className="text-xs text-gray-400">
//                   Creado: {new Date(msg.created_at).toLocaleString()}
//                 </p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* 📄 Paginación */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-2 mt-8">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage(page - 1)}
//             className="px-3 py-1 rounded border text-sm disabled:opacity-40"
//           >
//             ← Anterior
//           </button>

//           <span className="text-sm text-gray-600">
//             Página {page} de {totalPages}
//           </span>

//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage(page + 1)}
//             className="px-3 py-1 rounded border text-sm disabled:opacity-40"
//           >
//             Siguiente →
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import * as XLSX from "xlsx";

const ITEMS_PER_PAGE = 8;

export default function Users() {
  const [messages, setMessages] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [page, setPage] = useState(1);

  // 🔎 filtros
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [emailFilter, setEmailFilter] = useState("");

  useEffect(() => {
    api
      .get("/admin/mensajes")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 🔥 filtrar + ordenar
  const filteredMessages = useMemo(() => {
    return messages
      .filter((msg) => {
        const msgDate = new Date(msg.created_at);
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate + "T23:59:59") : null;

        if (from && msgDate < from) return false;
        if (to && msgDate > to) return false;

        if (
          emailFilter &&
          !msg.email.toLowerCase().includes(emailFilter.toLowerCase())
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [messages, fromDate, toDate, emailFilter]);

  // 📄 paginación
  const totalPages = Math.ceil(filteredMessages.length / ITEMS_PER_PAGE);

  const paginatedMessages = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredMessages.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMessages, page]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // 🧹 limpiar filtros
  const clearFilters = () => {
    setFromDate("");
    setToDate("");
    setEmailFilter("");
    setPage(1);
  };

  // 📊 descargar Excel
  const downloadExcel = () => {
    const data = filteredMessages.map((m) => ({
      Nombre: m.nombre,
      Email: m.email,
      Teléfono: m.telefono || "",
      Mensaje: m.mensaje || "",
      Fecha: new Date(m.created_at).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Mensajes");

    XLSX.writeFile(workbook, "mensajes_contacto.xlsx");
  };

  return (
    <div className="min-h-screen bg-white p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#cb4a2a]">
          Mensajes de Contacto
        </h1>
        <p className="text-gray-600 mt-1">
          Del más reciente al más antiguo
        </p>
      </div>

      {/* 🔎 Filtros */}
      <div className="bg-white p-5 rounded-xl border mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Desde
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-[#cb4a2a] focus:border-[#cb4a2a]"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Hasta
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-[#cb4a2a] focus:border-[#cb4a2a]"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Filtrar por correo
          </label>
          <input
            type="text"
            placeholder="correo@ejemplo.com"
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-[#cb4a2a] focus:border-[#cb4a2a]"
          />
        </div>

        <div className="flex flex-col gap-2 justify-end">
          <button
            onClick={downloadExcel}
            className="bg-[#2c976a] text-white px-4 py-2 rounded text-sm hover:opacity-90"
          >
            Descargar Excel
          </button>

          <button
            onClick={clearFilters}
            className="border border-gray-300 px-4 py-2 rounded text-sm text-gray-600 hover:bg-gray-100"
          >
            Quitar filtros
          </button>
        </div>
      </div>

      {/* Lista */}
      <div className="space-y-4">
        {paginatedMessages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => toggleExpand(msg.id)}
            className="relative bg-white rounded-xl border shadow-sm hover:shadow-md transition cursor-pointer"
          >
            {/* Fecha */}
            <span className="absolute top-3 right-4 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
              {new Date(msg.created_at).toLocaleDateString()}
            </span>

            <div className="p-4">
              <p className="font-semibold text-gray-800">
                {msg.nombre}
              </p>
              <p className="text-sm text-gray-500">
                {msg.email}
              </p>
            </div>

            {expandedId === msg.id && (
              <div className="px-4 pb-4 border-t bg-gray-50 text-sm text-gray-700 space-y-2">
                {msg.telefono && (
                  <p><strong>Teléfono:</strong> {msg.telefono}</p>
                )}
                {msg.mensaje && (
                  <p><strong>Mensaje:</strong> {msg.mensaje}</p>
                )}
                <p className="text-xs text-gray-400">
                  Creado: {new Date(msg.created_at).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 📄 Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 rounded border text-sm disabled:opacity-40"
          >
            ← Anterior
          </button>

          <span className="text-sm text-gray-600">
            Página {page} de {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 rounded border text-sm disabled:opacity-40"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}
